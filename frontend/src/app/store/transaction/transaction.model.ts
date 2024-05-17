export interface Transaction {
  _id: string;
  amount: number;
  date: string;
  category: string;
  description: string;
  type: string;
  tags: Array<string>;
}

export interface Transactions {
  transactions: Transaction[];
}