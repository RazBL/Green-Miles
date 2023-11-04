import React from 'react';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


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


export default function Flights() {
    return (
        
        <Container>
       <div style={containerStyle}>
        <AdminSidebar />
      </div>
        <Row>
          <Col md={2} className="text-center">
          <Button variant="primary" style={{ background: '#38DDA2', marginBottom: '100px', marginTop: '60px' }}>+ Add Flight</Button>
          </Col>
          <Col md={10}>
            <h1 className="text-center">Flights Page</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Airline</th>
                                <th>Flight Number</th>
                                <th>Origin</th>
                                <th>Destination</th>
                                <th>Departure</th>
                                <th>Arrival</th>
                                <th>CO2</th>
                                <th>Price</th>
                                <th>Seats</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
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

  