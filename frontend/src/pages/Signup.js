import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Form, Button, Alert, Card, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const signupResponse = await signup(name, email, password);

    if (signupResponse.success) {
      toast.success("Signup successful!", { autoClose: 2000 });
    } else {
      toast.error("Signup failed!", { autoClose: 2000 });
    }
  };

  return (
    <Container>
      <div className="signup-container">
        <Card className="signup-card">
        <Card.Header>Sign Up</Card.Header>
          <Card.Body>
            

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address:</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={isLoading}>
                Sign up
              </Button>
            </Form>

            {error && <Alert variant="danger">{error}</Alert>}
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Signup;
