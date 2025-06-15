import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './home';
import JobDetail from './GetJobDetail';
import ApplicationDetail from './UpdateApplication';
import ProtectedRoute from './protectedroute';
import NavBar from './NavBar';
import HandleLogout from './LogOut';
import Getuser from './profile';
import SearchBar from './SearchBar';
import MyApplication from './MyApplications';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './register';
import GetStarted from './getStarted';
import Footer from './footer';
import PageNotFound from './PgeNotFound';
import Updateprofile from './updateprofile'
import AboutUs from './Aboutus';

const App = () => {
  const location = useLocation();


  const hideNavBarRoutes = ['/', '/login', '/register', '/getStarted'];
  const shouldHideNavBar = hideNavBarRoutes.includes(location.pathname);
  

  return (
    <div className="app-container">
      {/* Render NavBar only if it's not a path that hides it */}
      {!shouldHideNavBar && <NavBar />}

      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />  
        
        {/* Protected Routes */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/jobs/:jobid" 
          element={
            <ProtectedRoute>
              <JobDetail />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/application/:id" 
          element={
            <ProtectedRoute>
              <ApplicationDetail />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Getuser />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/SearchBar" 
          element={
            <ProtectedRoute>
              <SearchBar />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/Myapplications" 
          element={
            <ProtectedRoute>
              <MyApplication />
            </ProtectedRoute>
          } 
        />
       < Route 
          path="/updateprofile" 
          element={
            <ProtectedRoute>
              <Updateprofile />
            </ProtectedRoute>
          } 
        />
         < Route 
          path="/aboutus" 
          element={
            <ProtectedRoute>
              <AboutUs />
            </ProtectedRoute>
          } 
        />

        <Route path="/LogOut" element={<HandleLogout />} />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<PageNotFound />} />
        
      </Routes>
      <Footer/>

    
    </div>
  );
};

// Wrap the App component with Router in a top-level component
const MainApp = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;
