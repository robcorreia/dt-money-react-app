import {createContext, useEffect, useState, ReactNode} from 'react';
import { api } from './services/api';


interface ITransaction {
  id: number,
  title: string,
  amount: number,
  category: string,
  type: string,
  createdAt: string,
}

//forma 1 de fazer

// interface ITransactionInput {
//   title: string,
//   amount: number,
//   category: string,
//   type: string,
// }

//forma 2 de fazer

// type TransactionInput = Pick<ITransaction, 'title' | 'amount' | 'type' | 'category'>;

type TransactionInput = Omit<ITransaction, 'id' | 'createdAt'>;


interface ITransactionsProviderProps {
  children: ReactNode;
}

interface ITransactionsContextData {
  transactions: ITransaction[];
  createTransaction: (transaction: TransactionInput) => void;
}

export const TransactionsContext = createContext<ITransactionsContextData>(
  {} as ITransactionsContextData
);

export function TransactionsProvider({children}: ITransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  
  useEffect(() => {
    api.get('transactions')
    .then(response => setTransactions(response.data.transactions));
  }, []);

  function createTransaction(transaction: TransactionInput) {
    api.post('/transactions', transaction);
  }

  return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  )
}