import React, { useContext, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../contexts/AdminContext';
import Admin from './Admin';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { Login } = useContext(AdminContext);
  const navigate = useNavigate();

  const LoginHandler = async () => {

    if (IsInputValid()) {
      let lowerCaseEmail = email.toLowerCase();
      let admin = await Login(lowerCaseEmail, password);

      if (admin) {
          navigate("/admin");
      }
      else {
        alert("admin does not exists")
      }
    }
  };

  const IsInputValid = () => {
    let isValid = true;
    if (!password) {
      alert('Please fill the password in.');
      isValid = false;
    }
    if (!email) {
      alert('Please fill the email in');
      isValid = false;
    }

    return isValid;
  }


  return (
    <div className="flex-container">
      <Container className="mt-5 pl-10">
        <Row className="justify-content-center align-items-center">
          <Col md={{ span: 4 }}>
            <div style={loginBorderStyle}>
              <Form>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="mb-3">
                  <Button
                    variant="primary"
                    type="button"
                    onClick={LoginHandler}
                    style={{ backgroundColor: '#38DDA2', width: '100%', marginTop: 10 }}
                  >
                    Login
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const loginBorderStyle = {
  border: '2px solid #38DDA2',
  padding: '20px',
  borderRadius: '8px',
};
