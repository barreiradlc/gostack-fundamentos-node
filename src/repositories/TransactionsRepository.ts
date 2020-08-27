import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;

    // eslint-disable-next-line no-restricted-syntax
    for (const transaction of this.transactions) {
      if (transaction.type === 'income') {
        income += transaction.value;
      }
      if (transaction.type === 'outcome') {
        outcome += transaction.value;
      }
    }

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    return transaction;
  }
}

export default TransactionsRepository;
