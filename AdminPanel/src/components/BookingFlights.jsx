import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { AdminContext } from '../contexts/AdminContext';


function AdminSidebar() {
  const { logOut, currentAdmin } = useContext(AdminContext);

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
            <DropdownButton className="adminButtonStyle" id="dropdown-basic-button" title={currentAdmin ? currentAdmin.firstName + " " + currentAdmin.lastName : ''}>
                <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
              </DropdownButton>
            </Link>
          </div>
        </div>
      </Col>
    </div>
  );
}




export default function BookingFlights() {

  const { flightBooking, users, UpdateFlightBookingStatus } = useContext(AdminContext);

  const GetUserEmail = (id) => {
    let foundUser = users.find(user => user._id.toString() === id.toString());
    console.log('foundUser:', foundUser);
    return foundUser ? foundUser.email : '';
  }

  const ApproveBooking = async (id) => {
    console.log(id);
    await UpdateFlightBookingStatus(id, 'Approved');
  }

  const DeclineBooking = async (id) => {
    await UpdateFlightBookingStatus(id, 'Declined');
  }

  useEffect(() => {
  }, [flightBooking])

  return (
    <>
      <div style={containerStyle}>
        <AdminSidebar />
      </div>
      <div>
        <br></br>
        <h2>Booking Flights</h2>
        <br></br>
        <br></br>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User Email</th>
              <th>bookingTime date </th>
              <th>price</th>
              <th>passangers</th>
              <th>bookingStatus</th>
              <th>Action</th>
            </tr>
          </thead>


          <tbody>
            {flightBooking.map((flightItem) => (
              <tr key={flightItem._id}>
                <td>{flightItem._id}</td>
                <td>{GetUserEmail(flightItem.user_id) ? GetUserEmail(flightItem.user_id) : "Deleted User"}</td>
                <td>{flightItem.bookingTime.date} - {flightItem.bookingTime.time}</td>
                <td>{flightItem.price}</td>
                <td>{flightItem.passangers}</td>
                <td>{flightItem.bookingStatus}</td>
                <td style={buttonscontainer}>
                  {
                    flightItem.bookingStatus === "Approved" || flightItem.bookingStatus === "Declined" ? (
                      <span style={{ alignSelf: 'center' }}>{flightItem.bookingStatus}</span>) :
                      (
                        <>
                          <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button variant="primary" onClick={() => ApproveBooking(flightItem._id)}>
                              confirm
                            </Button>
                            <Button variant="danger" onClick={() => DeclineBooking(flightItem._id)} >decline</Button>
                          </span></>
                      )
                  }
                </td>
              </tr>
            ))}

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
const buttonscontainer = {
  display: 'flex',
  gap: '10px',
  justifyContent: 'center',
  padding: '10px',
  borderRadius: '5px',
}
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

