
export const fetchTransactions = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([{ amount: 120 }]);
      }, 1000);
    });
  };
  