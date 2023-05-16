import Card from 'react-bootstrap/Card';

const Home = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '75vh', 
      paddingTop: '50px' 
      }}>
      <Card className="text-center" bg="light" border="dark" style={{ width: '40rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <Card.Header as="h3">Welcome to the BankApp!</Card.Header>
        <Card.Img variant="bottom" src="/images/bank3.png" />
        <Card.Body>
          <Card.Text>
            Bank-App is an online-only bank that offers accounts to everyone. We offer a user-friendly interface to easily create accounts, deposits, and withdrawals. You can move around using the navigation bar.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Home;