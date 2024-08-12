import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Transaction, { calculatePoints } from './Transaction';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import { fetchTransactions } from './fetchTransactions'; // Import the function to mock

// Mock the modules
jest.mock('./fetchTransactions', () => ({
  fetchTransactions: jest.fn(),
}));

jest.mock('./TransactionForm', () => ({
  __esModule: true,
  default: ({ onAddTransaction }) => (
    <button onClick={() => onAddTransaction(150)}>Add Transaction</button>
  ),
}));

jest.mock('./TransactionList', () => ({
  __esModule: true,
  default: ({ transactions }) => (
    <ul>
      {transactions.map((txn, index) => (
        <li key={index}>{`Amount: ${txn.amount}, Points: ${txn.points}`}</li>
      ))}
    </ul>
  ),
}));

describe('Transaction Component', () => {
  beforeEach(() => {
    fetchTransactions.mockImplementation(() =>
      Promise.resolve([{ amount: 120 }])
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders loading state initially', () => {
    render(<Transaction />);
    expect(screen.getByText(/Loading transactions.../i)).toBeInTheDocument();
  });

  test('fetches and displays transactions', async () => {
    render(<Transaction />);

    await waitFor(() => {
      expect(screen.queryByText(/Loading transactions.../i)).not.toBeInTheDocument();
    });
    expect(screen.getByText('Amount: 120, Points: 90')).toBeInTheDocument();
  });

  test('handles adding a new transaction', async () => {
    render(<Transaction />);

    await waitFor(() => {
      expect(screen.queryByText(/Loading transactions.../i)).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Add Transaction'));

    expect(screen.getByText('Amount: 150, Points: 150')).toBeInTheDocument();
    expect(screen.getByText('Total Points: 240')).toBeInTheDocument(); // Total includes fetched and added transactions
  });

  test('calculates points correctly', () => {
    expect(calculatePoints(120)).toBe(90); 
    expect(calculatePoints(150)).toBe(150); 
    expect(calculatePoints(50)).toBe(0);   
    expect(calculatePoints(60)).toBe(10);  
  });

  test('handles API fetch error', async () => {
    fetchTransactions.mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to fetch'))
    );

    render(<Transaction />);

    
    await waitFor(() => {
      expect(screen.queryByText(/Loading transactions.../i)).not.toBeInTheDocument();
    });

  
    expect(screen.getByText('Total Points: 0')).toBeInTheDocument();
  });
});
