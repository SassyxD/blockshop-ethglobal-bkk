// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Importing the Celo StableToken interface
interface ERC20 {
    function transfer(address, uint256) external returns (bool);
    function approve(address, uint256) external returns (bool);
    function transferFrom(address, address, uint256) external returns (bool);
    function totalSupply() external view returns (uint256);
    function balanceOf(address) external view returns (uint256);
    function allowance(address, address) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
    
contract CeloPayments {
    using SafeERC20 for IERC20;

    uint internal productsLength = 0;
    address public owner;
    address public stableToken;

    // Events for tracking
    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    event Transfer(address indexed sender, address indexed recipient, uint256 amount);
    event LoanGranted(address indexed provider, address indexed borrower, uint256 amount);
    event LoanRepaid(address indexed provider, address indexed borrower, uint256 amount);
    event ProductSold(address indexed buyer, address indexed seller, uint256 price);

     constructor(address _stableToken) {
        owner = msg.sender;
        stableToken = _stableToken;
    }

    // in this case is 0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9
    function updateTokenAddress(address newToken) external onlyOwner {
        stableToken = newToken;
}

    struct Product {
        address payable owner;
        string name;
        string description;
        uint price;
        uint sold;
    }

    struct MicroLoan {
        uint256 amount;
        uint256 dueDate;
        bool repaid;
    }

    mapping(uint => Product) internal products;
    mapping(address => uint256) public balances; 
    mapping(address => MicroLoan) public loans;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    function writeProduct(string memory _name, string memory _description, uint _price) public {
        products[productsLength] = Product(
            payable(msg.sender),
            _name,
            _description,
            _price,
            0
        );
        productsLength++;
    }

    function readProduct(uint _index)public view returns (
            address payable,
            string memory,
            string memory,
            uint,
            uint
        )
    {
        return (
            products[_index].owner,
            products[_index].name,
            products[_index].description,
            products[_index].price,
            products[_index].sold
        );
    }

    function buyProduct(uint _index) public {
    Product storage product = products[_index];
    uint price = product.price;
    require(IERC20(stableToken).allowance(msg.sender, address(this)) >= price, "Insufficient allowance");
    require(IERC20(stableToken).balanceOf(msg.sender) >= price, "Insufficient balance");

    IERC20(stableToken).safeTransferFrom(
        msg.sender,
        product.owner,
        price
    );

    product.sold++;

    emit ProductSold(msg.sender, product.owner, price);
}

 

    error DepositFailed();

    function deposit(address user, uint256 amount) external onlyOwner {
        balances[user] += amount;
        try IERC20(stableToken).transferFrom(msg.sender, address(this), amount) {
            emit Deposit(user, amount);
        } catch {
            revert DepositFailed();
        }
    }

    function withdraw(uint256 amount) external {
    uint256 userBalance = balances[msg.sender];
    
    require(userBalance >= amount, "Insufficient balance");

    balances[msg.sender] -= amount;

    // Use safeTransfer instead of transfer
    (bool success, ) = payable(msg.sender).call{value: amount}("");
    require(success, "Withdrawal failed");
    }   

    function transfer(address recipient, uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;
        balances[recipient] += amount;

        emit Transfer(msg.sender, recipient, amount);
    }

    function grantLoan(address borrower, uint256 amount, uint256 duration) external onlyOwner {
        require(loans[borrower].amount == 0, "Borrower already has an active loan");
        address provider = msg.sender;
        loans[borrower] = MicroLoan({
            amount: amount,
            dueDate: block.timestamp + duration,
            repaid: false
        });

        try IERC20(stableToken).transfer(borrower, amount) {
            emit LoanGranted(provider, borrower, amount);
        } catch {
            revert("Loan Granting Failed");
        }
    }

    function repayLoan() external {
        MicroLoan storage loan = loans[msg.sender];
        require(loan.amount > 0, "No active loan");
        require(block.timestamp <= loan.dueDate, "Loan overdue");
        address provider = msg.sender;
        address borrower = address(this);
        uint256 amount = loan.amount;
        loan.repaid = true;
        loan.amount = 0;

        try IERC20(stableToken).transfer(address(this), amount) {
            emit LoanRepaid(borrower, provider, amount);
        } catch {
            revert("Loan Repayment Failed");
        }
    }
    function getProductsLength() public view returns (uint) {
        return (productsLength);
    }

}