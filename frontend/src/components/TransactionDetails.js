import { useTransactionsContext } from '../hooks/useTransactionsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { Table, Button } from 'react-bootstrap';


// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const TransactionDetails = ({ transaction }) => {
  const { dispatch } = useTransactionsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/transactions/' + transaction._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: json });
    }
  };

  return (
    <div className='transaction-details'>
      
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Transaction Type</th>
            <th>Amount</th>
            <th>Title</th>
            <th>Created</th>
            {user && <th>Delete</th>}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{transaction.type}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.title}</td>
            <td>{formatDistanceToNow(new Date(transaction.createdAt), { addSuffix: true })}</td>
            {user && (
              <td>
                <Button size="sm" variant="outline-danger" onClick={handleClick}>
                  Delete
                </Button>
              </td>
            )}
          </tr>
        </tbody>
      </Table>
      </div>
  );
};

export default TransactionDetails;
