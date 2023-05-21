import TransactionDetails from './TransactionDetails';
import { useTransactionsContext } from '../hooks/useTransactionsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { Table } from 'react-bootstrap';

const TransactionsTable = () => {
  const { transactions } = useTransactionsContext();
  const { user } = useAuthContext();

  return (
    <div className="transaction-details">
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Transaction Type</th>
          <th>Amount</th>
          <th>Memo</th>
          <th>Created</th>
          {user && <th>Delete</th>}
        </tr>
      </thead>
      <tbody>
        {transactions && transactions.map(transaction => (
          <TransactionDetails key={transaction._id} transaction={transaction} />
        ))}
      </tbody>
    </Table>
    </div>
  );
};

export default TransactionsTable;
