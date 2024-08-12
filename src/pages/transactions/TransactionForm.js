import React, { useState } from 'react';

const TransactionForm = ({ onAddTransaction }) => {
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            alert('Please enter a valid amount.');
            return;
        }
        onAddTransaction(numericAmount);
        setAmount('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter transaction amount"
                min="0"
                step="0.01"
            />
            <button type="submit">Add Transaction</button>
        </form>
    );
};


export default TransactionForm;
