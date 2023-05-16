import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Form, Button, Alert, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginResponse = await login(email, password);

    if (loginResponse.success) {
      toast.success("Login successful!", { autoClose: 2000 });
      navigate("/MyAccount");
    } else {
      toast.error("Login failed!", { autoClose: 2000 });
    }
  };

  return (
    <Container>
      <div className="login-container">
        <Card className="login-card">
          <Card.Header className="text-center" as="h4">
            Log In
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
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

              <div className="text-center">
                <Button variant="primary" type="submit" disabled={isLoading}>
                  Log in
                </Button>
              </div>
            </Form>

            {error && <Alert variant="danger">{error}</Alert>}
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Login;
