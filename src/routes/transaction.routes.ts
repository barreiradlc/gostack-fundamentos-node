import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    return response.json({
      transactions,
      balance,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  const { title, value, type } = request.body;

  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    if (balance.total <= value && type === 'outcome') {
      return response.status(400).json({ error: "Can't register outcome" });
    }

    const transaction = transactionsRepository.create({ title, value, type });

    transactions.push(transaction);

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
