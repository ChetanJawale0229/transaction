import { render, screen, fireEvent } from '@testing-library/react';
import TransactionForm from './TransactionForm';

test('renders the form and handles input', () => {
    const mockOnAddTransaction = jest.fn();
    render(<TransactionForm onAddTransaction={mockOnAddTransaction} />);
    
    fireEvent.change(screen.getByPlaceholderText(/Enter transaction amount/i), { target: { value: '100' } });
    fireEvent.click(screen.getByText(/Add Transaction/i));
    
    expect(mockOnAddTransaction).toHaveBeenCalledWith(100);
});

test('shows an alert on invalid input', () => {
    const mockOnAddTransaction = jest.fn();
    window.alert = jest.fn(); // Mock alert
    render(<TransactionForm onAddTransaction={mockOnAddTransaction} />);
    
    fireEvent.change(screen.getByPlaceholderText(/Enter transaction amount/i), { target: { value: '-50' } });
    fireEvent.click(screen.getByText(/Add Transaction/i));
    
    expect(window.alert).toHaveBeenCalledWith('Please enter a valid amount.');
});
