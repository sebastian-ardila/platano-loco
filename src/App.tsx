import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Reservations from './pages/Reservations';
import Schedule from './pages/Schedule';
import History from './pages/History';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/reservas" element={<Reservations />} />
        <Route path="/horarios" element={<Schedule />} />
        <Route path="/historia" element={<History />} />
        <Route path="/contacto" element={<Contact />} />
      </Route>
    </Routes>
  );
}
