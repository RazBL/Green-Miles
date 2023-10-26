import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // בדיקה ישירה של יוזר וסיסמה
    if (email === 'admin@gmail.com' && password === 'adminadmin') {
      // כאן תבצע פעולות נוספות לאחר התחברות מוצלחת
      console.log('התחברות מוצלחת!');
    } else {
      // התחברות נכשלה
      console.log('התחברות נכשלה. אנא בדוק את המשתמש והסיסמה.');
    }
    navigate('/admin');
  };

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
                    onClick={handleLogin}
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
