import React from 'react';
import { Container, Row, Col, Table, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const categories = [
  { label: 'Users', to: '/admin/users', icon: '👤' },
  { label: 'Hotels', to: '/admin/hotels', icon: '🏨' },
  { label: 'Flights', to: '/admin/flights', icon: '✈️' },
  { label: 'Support', to: '/admin/support', icon: '🛠️' },
];

export default function Admin() {
  return (
    <Container fluid className="admin-container">
      <Col md={2} className="sidebar">
      <img src="Logo.png" alt="Logo" width={'50%'} />
      <Nav className="flex-column">
       </Nav>
      </Col>


      <Row>
        <Col md={2} className="sidebar">
          <Nav className="flex-column">
            <h5></h5>
            {categories.map((category, index) => (
              <div key={index}>
                <Nav.Item>
                  <Nav.Link as={Link} to={category.to}>
                    {category.icon && <span style={{ marginRight: '5px' }}>{category.icon}</span>}
                    {category.label}
                  </Nav.Link>
                </Nav.Item>
                {index < categories.length - 1 && <hr />}
              </div>
            ))}
          </Nav>
        </Col>
        <Col md={10} className="content-container">
          <h1>Admin Dashboard</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Username</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Add users as needed */}
              <tr>
                <td>Baselx1</td>
                <td>Basel Masoud</td>
                <td>basel@gmail.com</td>
                <td>
                  <Button variant="primary">Edit</Button>{' '}
                  <Button variant="danger">Remove</Button>
                </td>
              </tr>
              {/* Continue as needed */}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
