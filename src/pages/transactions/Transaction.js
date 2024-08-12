import React, {
  useState,
  useEffect,
  useMemo,
} from "react";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import { fetchTransactions } from './fetchTransactions'


export const calculatePoints = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += (amount - 100) * 2; 
    amount = 100;
  }
  if (amount > 50) {
    points += (amount - 50) * 1; // Points for amount between $50 and $100
  }
  return points;
};

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactionsData();
  }, []);

  const fetchTransactionsData = async () => {
    try {
      const data = await fetchTransactions();
      const processedTransactions = data.map((txn) => ({
        amount: txn?.amount,
        points: calculatePoints(txn?.amount),
      }));
      setTransactions(processedTransactions);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = (amount) => {
    const points = calculatePoints(amount);
    setTransactions([...transactions, { amount, points }]);
  };

  const totalPoints = useMemo(
    () => transactions.reduce((total, txn) => total + txn.points, 0),
    [transactions]
  );

  return (
    <div>
      <h1>Reward Points Calculator</h1>
      <TransactionForm onAddTransaction={handleAddTransaction} />
      {loading ? (
        <p>Loading transactions...</p>
      ) : (
        <TransactionList transactions={transactions} />
      )}
      <h2>Total Points: {totalPoints}</h2>
    </div>
  );
};

export default Transaction;
