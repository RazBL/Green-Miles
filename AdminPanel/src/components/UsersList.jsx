import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5173/admin/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  function AdminSidebar() {
    return (
      <div>
      <Col md={3} style={TypeStyle}>
      <div style={{logoStyle}}>
        <div>
        <img src="/Logo.png" alt="Logo" style={itemStyle} />
        </div>
      </div>
      
      
      <div style={{ borderColor: 'white', borderWidth: 10, display: 'flex', alignItems: 'center', paddingLeft: '20px', margin: '10px 0', left: 25 ,fontSize: '40px', }}>
      <Link to="/admin/users" style={{ textDecoration: 'none', color: '#38DDA2' }}>Users</Link>
    </div>
    
    <div style={{ borderColor: 'white', borderWidth: 10, display: 'flex', alignItems: 'center', paddingLeft: '20px', margin: '10px 0', left: 25 ,fontSize: '40px', }}>
      <Link to="/admin/flights" style={{ textDecoration: 'none', color: '#38DDA2' }}>Flights</Link>
    </div>
    
    <div style={{ borderColor: 'white', borderWidth: 10, display: 'flex', alignItems: 'center', paddingLeft: '20px', margin: '10px 0', left: 25 ,fontSize: '40px', }}>
      <Link to="/admin/hotels" style={{ textDecoration: 'none', color: '#38DDA2' }}>Hotels</Link>
    </div>
    
    <div style={{ borderColor: 'white', borderWidth: 10, display: 'flex', alignItems: 'center', paddingLeft: '20px', margin: '10px 0', left: 25 ,fontSize: '40px', }}>
      <Link to="/admin/Support" style={{ textDecoration: 'none', color: '#38DDA2' }}>Support</Link>
    </div>
   </Col>
       
<Col md={3} style={rightButtonStyle}>
  <div>
    <div style={{ position: 'absolute', top: 0, right: 0 }}>
      <DropdownButton className="adminButtonStyle" id="dropdown-basic-button" title="Basel Basel">
        <Dropdown.Item href="">Logout</Dropdown.Item>
      </DropdownButton>
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
        <h2>Users List</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>first name</th>
              <th>last Name</th>
              <th>Email</th>
              <th>image</th>
              <th>country</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>
                  <Button variant="primary">Edit</Button>{' '}
                  <Button variant="danger">Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tbody>
            <tr>
              <td>Basel</td>
              <td>masoud </td>
              <td>basel@gmail.com</td>
              <td>image.png</td>
              <td>israel</td>
              <td>
                <Button variant="primary">Edit</Button>{' '}
                <Button variant="danger">Remove</Button>
              </td>
            </tr>
            {/* Continue as needed */}
          </tbody>
        </Table>
      </div>
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

const TypeStyle ={
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

export default UsersList;
