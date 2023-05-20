import { useState } from "react";
import { useTransactionsContext } from "../hooks/useTransactionsContext";
import { useAuthContext } from '../hooks/useAuthContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';

const TransactionForm = () => {
  const { dispatch } = useTransactionsContext();
  const { user, dispatch: authDispatch } = useAuthContext();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('deposit');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const transaction = { title, amount, type };

    const response = await fetch('https://taylorella-mern-stack-app.herokuapp.com/api/transactions', {
      method: 'POST',
      body: JSON.stringify(transaction),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle('');
      setAmount('');
      setType('');
      setError(null);
      setEmptyFields([]);

      // Update the balance in the local storage and auth context
      const updatedUser = { ...user, balance: json.balance };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      authDispatch({ type: 'UPDATE_USER', payload: updatedUser });

      dispatch({ type: 'CREATE_TRANSACTION', payload: json });
    }
  };

  return (
    <Card className="transaction-form-card">
      <Card.Header className="text-center" as="h5">Make a New Transaction</Card.Header>
      <Card.Body>

        <Form.Group controlId="formType">
            <Form.Label>Transaction Type:</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setType(e.target.value)}
              value={type}
              className={emptyFields.includes('type') ? 'error' : ''}
            >
              <option value="deposit">Deposit</option>
              <option value="withdraw">Withdraw</option>
            </Form.Control>
          </Form.Group>
        <br />
          <Form.Group controlId="formAmount">
            <Form.Label>Amount:</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              className={emptyFields.includes('amount') ? 'error' : ''}
            />
          </Form.Group>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className={emptyFields.includes('title') ? 'error' : ''}
            />
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit">
              Submit Transaction
            </Button>
          </div>
        </Form>

        {error && <Alert variant="danger">{error}</Alert>}
      </Card.Body>
    </Card>
  );
};

export default TransactionForm;
