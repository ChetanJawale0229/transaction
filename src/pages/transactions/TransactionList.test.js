import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for extended matchers
import TransactionList from './TransactionList';

describe('render transaction list', () => {
  
    beforeEach(() => {
        global.fetch = jest.fn();
      });
    test('renders an empty list when no transactions are provided', () => {
        render(<TransactionList transactions={[]} />);
        expect(screen.queryByRole('list')).toBeEmptyDOMElement();
    });
    
});
