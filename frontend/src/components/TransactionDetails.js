import { useTransactionsContext } from '../hooks/useTransactionsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { Button } from 'react-bootstrap';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const TransactionDetails = ({ transaction }) => {
  const { dispatch } = useTransactionsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('https://taylorella-mern-stack-app.herokuapp.com/api/transactions/' + transaction._id, {
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
    <tr>
      <td>{transaction.type}</td>
      <td>{transaction.amount}</td>
      <td>{transaction.title}</td>
      <td>{formatDistanceToNow(new Date(transaction.createdAt), { addSuffix: true })}</td>
      {user && (
        <td className="delete-button-container">
          <Button size="sm" variant="outline-danger" onClick={handleClick}>
            Delete
          </Button>
        </td>
      )}
    </tr>
  );
};

export default TransactionDetails;
