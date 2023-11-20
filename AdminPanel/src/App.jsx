import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Admin from './components/Admin';
import UsersList from './components/UsersList';
import Hotels from './components/Hotels';
import Flights from './components/Flights';
import BookingHotels from './components/Bookinghotels'
import BookingFlights from './components/BookingFlights';
import AdminContextProvidewr from './contexts/AdminContext';
import PrivateRoute from './routes/PrivateRoute';

function App() {

  return (
    <AdminContextProvidewr>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
          <Route path="/admin/hotels" element={<PrivateRoute><Hotels /></PrivateRoute>} />
          <Route path="/admin/flights" element={<PrivateRoute><Flights /></PrivateRoute>} />
          <Route path="/admin/users" element={<PrivateRoute><UsersList /></PrivateRoute>} />
          <Route path="/admin/bookingHotels" element={<PrivateRoute><BookingHotels /></PrivateRoute>} />
          <Route path="/admin/bookingflights" element={<PrivateRoute><BookingFlights /></PrivateRoute>} />
        </Routes>
      </Router>
    </AdminContextProvidewr>
  );
}

export default App;