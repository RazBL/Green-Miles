import React, { useContext, useEffect, useState } from 'react';
import { Table, Button, Col } from 'react-bootstrap';
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




export default function BookingHotels() {

  const { hotelBooking, users, hotels, UpdateHotelBookingStatus } = useContext(AdminContext);

  const ApproveBooking = async (id) => {
    console.log(id);
    await UpdateHotelBookingStatus(id, 'Approved');
  }

  const DeclineBooking = async (id) => {
    await UpdateHotelBookingStatus(id, 'Declined');
  }
  useEffect(() => {
  }, [hotelBooking])

  const GetUserEmail = (id) => {
    let foundUser = users.find(user => user._id === id);
    return foundUser ? foundUser.email : '';
  }


  const GetHotelName = (id) => {
    let foundHotel = hotels.find(hotel => hotel._id === id);
    return foundHotel ? foundHotel.name : '';
  }

  return (
    <>
      <div style={containerStyle}>
        <AdminSidebar />
      </div>
      <div>
        <br></br>
        <h2>Booking Hotels</h2>
        <br></br>
        <br></br>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User Email</th>
              <th>Hotel</th>
              <th>Booking Time</th>
              <th>Nights Stay</th>
              <th>price</th>
              <th>rooms</th>
              <th>booking Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {hotelBooking.map((bookingItem) => (
              <tr key={bookingItem._id}>
                <td>{bookingItem._id}</td>
                <td>{GetUserEmail(bookingItem.user_id) ? GetUserEmail(bookingItem.user_id) : "Deleted User"}</td>
                <td>{GetHotelName(bookingItem.hotel_id)}</td>
                <td>{bookingItem.bookingTime.date} - {bookingItem.bookingTime.time}</td>
                <td>{bookingItem.nights_stay}</td>
                <td>{bookingItem.price}</td>
                <td>{bookingItem.rooms}</td>
                <td>{bookingItem.bookingStatus}</td>
                <td style={buttonscontainer}>
                  {
                    bookingItem.bookingStatus === "Approved" || bookingItem.bookingStatus === "Declined" ? (
                      <span style={{alignSelf: 'center'}}>{bookingItem.bookingStatus}</span>) :
                      (
                        <>
                          <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                          <Button variant="primary" onClick={() => ApproveBooking(bookingItem._id)}>
                            confirm
                          </Button>
                          <Button variant="danger" onClick={() => DeclineBooking(bookingItem._id)} >decline</Button> 
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
};

const logoStyle = {
  width: '5.2rem',
  marginBottom: '100px',
  position: 'absolute',
  top: 0,
  left: 5,
};

const buttonscontainer = {
  flexDirection: 'row',
  gap: '10px',
  justifyContent: 'center',
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
