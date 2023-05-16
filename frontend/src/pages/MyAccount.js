import React, { useEffect } from 'react';
import { useTransactionsContext } from "../hooks/useTransactionsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import TransactionDetails from '../components/TransactionDetails';
import TransactionForm from '../components/TransactionForm';

const MyAccount = () => {
  const { transactions, dispatch } = useTransactionsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch('/api/transactions', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_TRANSACTIONS', payload: json });
      }
    };

    if (user) {
      fetchTransactions();
    }
  }, [dispatch, user]);

  return (
    <Container className="my-5">
      <Row>
        <Col md={8}>
          <Card className="welcomeCard">
            <Card.Header className="text-center" as="h4">Welcome, {user.name}!</Card.Header>
            <Card.Body>
              <Card.Text>
                This is your account page! Here, you can easily deposit or withdraw money, allowing you to manage your funds according to your needs. Keep track of all your transactions conveniently in one place, so you always have a clear overview of your financial activity. Start exploring your account and take control of your financial journey today!
              </Card.Text>
              <Card.Text>Here are your transactions:</Card.Text>
              <div className="transactions">
                {transactions && transactions.map((transaction) => (
                  <TransactionDetails key={transaction._id} transaction={transaction} />
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <TransactionForm />
        </Col>
      </Row>
    </Container>
  );
};

export default MyAccount;
