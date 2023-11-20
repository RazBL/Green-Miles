import React, { useContext, useEffect } from 'react';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { AdminContext } from '../contexts/AdminContext';


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


export default function Hotels() {
  const { hotels } = useContext(AdminContext);
  useEffect(() => {

  }, [Hotels])

  return (

    <Container>
      <div style={containerStyle}>
        <AdminSidebar />
      </div>
      <Row>


        <Col md={15} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <h1 className="text-center">Hotels Page</h1>
          <Col md={2} className="text-center">
          </Col>



          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Address</th>
                <th>Eco Rating</th>
                <th>Price per Night</th>
                <th>Country</th>
                <th>availableRooms</th>
                <th>City</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((hotel) => (
                <tr>
                  <td>
                    <img src={hotel.image} alt={`Hotel Image`} style={{ maxWidth: '65px', maxHeight: '65px' }} />
                  </td>

                  <td>{hotel.name}</td>
                  <td>{hotel.address}</td>
                  <td>{hotel.eco_rating}</td>
                  <td>{hotel.price_per_night}</td>
                  <td>{hotel.country}</td>
                  <td>{hotel.rooms.availability.availableRooms}</td>
                  <td>{hotel.city}</td>
                  <td>{ }</td>
                  <td><Button variant="danger">Remove</Button></td>
                </tr>
              ))}
            </tbody>

          </Table>
        </Col>
      </Row>
    </Container>
  );
}

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