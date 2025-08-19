import './App.css';
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom";
import Login from './pages/Login';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './utilities/ScrollToTop';
import Dashboard from './layouts/Dashboard';
import Index from './pages/Index';
import NationalNews from './pages/NationalNews';
import Users from './pages/Users';
import Admins from './pages/Admins';
import Contact from './pages/Contact';
import About from './pages/About';
import Lebanon from './pages/Lebanon';
import Security from './pages/Security';
import Announce from './pages/Announce';
function App() {
  return [
    <ToastContainer    />,
    <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path='/' element={<Navigate to={"/dashboard/alerts"} />} />
      <Route path='/login' element={<Login />} />
      <Route path='dashboard' element={<Dashboard />}>
        <Route path='' element={<Navigate to={'/dashboard/alerts'} />} />
        <Route path='alerts' element={<Index />} />
        <Route path='national-news' element={<NationalNews />} />
        <Route path='users' element={<Users />} />
        <Route path='admins' element={<Admins />} />
        <Route path='special-announcements' element={<Announce />} />
        <Route path='contact-us' element={<Contact />} />
        <Route path='about-us' element={<About />} />
        <Route path='about-lebanon' element={<Lebanon />} />
        <Route path='security-situation' element={<Security />} />
      </Route>
    </Routes>
    </BrowserRouter>
  ];
}

export default App;
