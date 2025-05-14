import React, { useState, useContext } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { StoreContext } from '../../context/StoreContext';  // Import your context

const Login = () => {
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);  // Get URL from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [spinner, setSpinner] = useState(false);

  const sendOtp = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("Enter email or password!");
    } else if (!email.includes("@")) {
      toast.error("Enter a valid email!");
    } else {
      setSpinner(true);
      const data = { email, password };

      try {
        const response = await axios.post(`${url}/api/user/login`, data);

        if (response.data.success) {
          toast.success("OTP sent successfully.");
          setTimeout(() => {
            navigate("/otp", { state: { email, password } });
          }, 3000);
        } else {
          toast.error(response.data.message);  // Still a fallback
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } finally {
        setSpinner(false);  // Stop the spinner regardless of success or failure
      }
    }
  };

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={sendOtp}>
        <div className="login-popup-title">
          <h2>Login</h2>
        </div>
        <div className="login-popup-input">
          <input 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder='Your email' 
            required 
          />
          <input 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='Your password' 
            required 
          />
        </div>
        <button type="submit">
          Login
          {spinner && <span><Spinner animation="border" size="sm" /></span>}
        </button>
        <p className='login-redirect'>
          Create a new account? <span onClick={() => navigate('/register')}>Sign Up</span>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
