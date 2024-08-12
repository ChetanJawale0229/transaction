import React from 'react';

const TransactionList = ({ transactions }) => {
    return (
        <ul>
            {transactions.map((txn, index) => (
                <li key={index}>
                    ${txn.amount.toFixed(2)} - Points: {txn.points}
                </li>
            ))}
        </ul>
    );
};


export default TransactionList;
