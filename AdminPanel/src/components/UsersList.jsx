import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Col, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { AdminContext } from '../contexts/AdminContext';
import defaultImage from '../assets/Account.png';

const UsersList = () => {
  const { users, EditUserProfile } = useContext(AdminContext);
  const [showEditModal, SetShowEditModal] = useState(false);
  const [selectedUser, SetSelectedUser] = useState(null);
  const [password, SetPassword] = useState("");


  const HandleEditClose = () => {
    SetShowEditModal(false);
    SetSelectedUser(null);
  };

  const EditProfile = () => {
    if(InputHandler()){
      EditUserProfile(selectedUser);
      HandleEditClose();
    }
  };


  const ClickedOnUser = (user) => {
    SetSelectedUser(user)
    SetShowEditModal(true)
  }

  const HandlePasswordChange = (password) => {
    if (password != null) {
      SetPassword(password);
      SetSelectedUser({ ...selectedUser, password: password });
    }
  }

  const InputHandler = () => {
    let valid = true;

    if(password == ''){
      alert("Please don't leave the password input empty.");
      valid = false
    }

    return valid;
  }

  useEffect(() => {
    console.log(users);
  }, [users])

  function AdminSidebar() {
    const { logOut } = useContext(AdminContext);

    return (
      <div>
        <Col md={3} style={TypeStyle}>
          <div style={{ logoStyle }}>
            <div>
              <img src="/Logo.png" alt="Logo" style={itemStyle} />
            </div>
          </div>


          <div style={{ borderColor: 'white', borderWidth: 10, display: 'flex', alignItems: 'center', paddingLeft: '20px', margin: '10px 0', left: 25, fontSize: '40px', }}>
            <Link to="/admin/users" style={{ textDecoration: 'none', color: '#38DDA2' }}>Users</Link>
          </div>

          <div style={{ borderColor: 'white', borderWidth: 10, display: 'flex', alignItems: 'center', paddingLeft: '20px', margin: '10px 0', left: 25, fontSize: '40px', }}>
            <Link to="/admin/flights" style={{ textDecoration: 'none', color: '#38DDA2' }}>Flights</Link>
          </div>

          <div style={{ borderColor: 'white', borderWidth: 10, display: 'flex', alignItems: 'center', paddingLeft: '20px', margin: '10px 0', left: 25, fontSize: '40px', }}>
            <Link to="/admin/hotels" style={{ textDecoration: 'none', color: '#38DDA2' }}>Hotels</Link>
          </div>

          <div style={{ borderColor: 'white', borderWidth: 10, display: 'flex', alignItems: 'center', paddingLeft: '20px', margin: '10px 0', left: 25, fontSize: '40px', }}>
            <Link to="/admin/Support" style={{ textDecoration: 'none', color: '#38DDA2' }}>Support</Link>
          </div>
          <div style={{ borderColor: 'white', borderWidth: 10, display: 'flex', alignItems: 'center', paddingLeft: '20px', margin: '10px 0', left: 25, fontSize: '40px', }}>
            <Link to="/admin/bookinghotels" style={{ textDecoration: 'none', color: '#38DDA2' }}>Booking Hotels</Link>
          </div>

          <div style={{ borderColor: 'white', borderWidth: 10, display: 'flex', alignItems: 'center', paddingLeft: '20px', margin: '10px 0', left: 25, fontSize: '40px', }}>
            <Link to="/admin/bookingflights" style={{ textDecoration: 'none', color: '#38DDA2' }}>Booking Flights</Link>
          </div>
        </Col>

        <Col md={3} style={rightButtonStyle}>
          <div>
            <div style={{ position: 'absolute', top: 0, right: 0 }}>
              <Link to="/">
                <DropdownButton className="adminButtonStyle" id="dropdown-basic-button" title="Basel Basel">
                  <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
                </DropdownButton>
              </Link>
            </div>
          </div>
        </Col>
      </div>
    );
  }

  return (
    <>
      <div style={containerStyle}>
        <AdminSidebar />
      </div>
      <div>
        <br></br>
        <h2>Users List</h2>
        <br></br>
        <br></br>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>image</th>
              <th>first name</th>
              <th>last Name</th>
              <th>Email</th>
              <th>country</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <img src={user.image || defaultImage} alt={``} style={{ maxWidth: '50px', maxHeight: '50px' }} /></td>                <td>{user.firstName}
                </td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.country}</td>
                <td>
                  <Button variant="primary" onClick={() => ClickedOnUser(user)}>Edit</Button>{' '}
                  <Button variant="danger">Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal show={showEditModal} onHide={HandleEditClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header >
        <Modal.Body >

          <Form >
            <Form.Group style={formField} controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={selectedUser?.firstName || ''}
                onChange={(e) => SetSelectedUser({ ...selectedUser, firstName: e.target.value })}
              />
            </Form.Group>

            <Form.Group style={formField} controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={selectedUser?.lastName || ''}
                onChange={(e) => SetSelectedUser({ ...selectedUser, lastName: e.target.value })}
              />
            </Form.Group>

            <Form.Group style={formField} controlId="formEmail">
              <Form.Label>email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                value={selectedUser?.email || ''}
                onChange={(e) => SetSelectedUser({ ...selectedUser, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group style={formField} controlId="formCountry">
              <Form.Label>country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                value={selectedUser?.country || ''}
                onChange={(e) => SetSelectedUser({ ...selectedUser, country: e.target.value })}
              />
            </Form.Group>

            <Form.Group style={formField} controlId="formPassword">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new password"
                value={password || ''}
                onChange={(e) => HandlePasswordChange(e.target.value)}
              />
            </Form.Group>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={HandleEditClose}>
            Close
          </Button>
          <Button variant="primary" onClick={EditProfile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const containerStyle = {
  display: 'flex',
  // הסגנון הנוסף שברצונך להשתמש בו
};

const logoStyle = {
  width: '5.2rem',
  marginBottom: '100px',
  position: 'absolute',
  top: 0,
  left: 5,
};

const itemStyle = {
  borderColor: 'white',
  borderWidth: 10,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '20px',
  margin: '10px 0 ',
  left: 25,
};

const sideBarStyle = {
  backgroundColor: '#101518',
  minHeight: '100vh', // מייחס לרקע גובה מינימלי
  display: 'flex',
  flexDirection: 'column', // אנחנו רוצים שהאלמנטים בתוך הסרגל יהיו בעמודה
  top: 0,
  left: 5,
};

const TypeStyle = {
  width: '350px',  // כאן תגדיר את הרוחב הרצוי
  position: 'absolute',
  backgroundColor: '#101518',
  minHeight: '100vh', // מייחס לרקע גובה מינימלי
  display: 'flex',
  flexDirection: 'column', // אנחנו רוצים שהאלמנטים בתוך הסרגל יהיו בעמודה
  top: 0,
  left: 5,
};
const rightButtonStyle = {
  position: 'absolute',
  right: '8px', // מניח את הכפתור בצד ימין
  top: 40, // הוא יישאר באותו גובה כמו הלוגו
  margin: '10px 0 ',
};

const formField = {
  marginBottom: 10
};

export default UsersList;
