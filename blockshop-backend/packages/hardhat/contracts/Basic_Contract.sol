// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

// Importing the Celo StableToken interface
interface ICeloStableToken {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract CeloPayments {
    address public owner; // myy address?
    address public stableToken = 0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9;
    
    // Events for tracking
    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    event Transfer(address indexed sender, address indexed recipient, uint256 amount);
    event LoanGranted(address indexed bank, address indexed borrower, uint256 amount);
    event LoanRepaid(address indexed bank, address indexed borrower, uint256 amount);

    struct MicroLoan {
        uint256 amount;
        uint256 dueDate;
        bool repaid;
    }

    mapping(address => MicroLoan) public loans;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor(address _stableToken) {
        owner = msg.sender;
        stableToken = _stableToken;
    }

    /**
     * @dev Pay salary to an employee.
     * @param employee Address of the employee.
     * @param amount Amount in cUSD to be transferred.
     */
    function Deposit(address user, uint256 amount) external onlyOwner {
        require(ICeloStableToken(stableToken).transfer(user, amount), "Transfer failed");
        emit Deposited(user, amount);
    }

    function Withdrawal(address user, uint256 amount) external onlyOwner {
        require(user.balanceOf > amount, "You don't have enough money.");
        emit Withdrawal(user, amount);
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

        loans[borrower] = MicroLoan({
            amount: amount,
            dueDate: block.timestamp + duration,
            repaid: false
        });

        require(ICeloStableToken(stableToken).transfer(borrower, amount), "borrow failed");
        emit LoanGranted(borrower, amount);
    }

    function repayLoan() external {
        MicroLoan storage loan = loans[msg.sender];
        require(loan.amount > 0, "No active loan");
        require(block.timestamp <= loan.dueDate, "Loan overdue");

        uint256 amount = loan.amount;
        loan.repaid = true;
        loan.amount = 0;

        require(ICeloStableToken(stableToken).transfer(address(this), amount), "Repayment failed");
        emit LoanRepaid(msg.sender, amount);
    }
}