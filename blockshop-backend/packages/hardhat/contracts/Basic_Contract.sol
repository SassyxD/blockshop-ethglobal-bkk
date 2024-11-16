// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

// Importing the Celo StableToken interface
interface IERC20Token {
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
    uint internal productsLength = 0;
    address public owner;
    address public stableToken = 0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9;
    
    // Events for tracking
    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    event Transfer(address indexed sender, address indexed recipient, uint256 amount);
    event LoanGranted(address indexed provider, address indexed borrower, uint256 amount);
    event LoanRepaid(address indexed provider, address indexed borrower, uint256 amount);

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

    function writeProduct(string memory _name, string memory _description, uint _price) public{
        uint _sold = 0;
        products[productsLength] = Product(
            payable(msg.sender),
            _name,
            _description,
            _price,
            _sold
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

    function buyProduct(uint _index) public payable {
        require(
            IERC20Token(stableToken).transferFrom(
                msg.sender,
                products[_index].owner,
                products[_index].price
            ),
            "Transfer failed."
        );
        products[_index].sold++;
    }

    function deposit(address user, uint256 amount) external onlyOwner {
        require(IERC20Token(stableToken).transfer(user, amount), "Transfer failed");
        emit Deposit(user, amount);
    }

    function withdraw(uint256 amount) external {
        uint256 userBalance = balances[msg.sender];
        
        require(userBalance >= amount, "Insufficient balance");

        // Update the user's balance before transferring the Ether
        balances[msg.sender] -= amount;

        // Transfer Ether to the user
        payable(msg.sender).transfer(amount);
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

        require(IERC20Token(stableToken).transfer(borrower, amount), "borrow failed");
        emit LoanGranted(provider ,borrower, amount);
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

        require(IERC20Token(stableToken).transfer(address(this), amount), "Repayment failed");
        emit LoanRepaid(borrower, provider, amount);
    }

    function getProductsLength() public view returns (uint) {
        return (productsLength);
    }

}