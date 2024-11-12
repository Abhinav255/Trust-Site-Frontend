import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Topbar from '../components/Topbar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to login route
      const response = await axios.post('http://localhost:5000/donors/login', {
        email,
        password,
      });

      // Save token and donor ID to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('donorId', response.data.donor.id);

      // Show success toast notification
      toast.success('Login successful! Redirecting...');

      // Redirect to dashboard or home page after a short delay
      setTimeout(() => {
        window.location.href = '/'; // Example
      }, 2000); // Adjust delay as needed

    } catch (error) {
      // Handle error
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Login failed');
        toast.error(error.response.data.message || 'Login failed');
      } else {
        setErrorMessage('Something went wrong, please try again later');
        toast.error('Something went wrong, please try again later');
      }
    }
  };

  return (<>
          <Topbar/>
          <Navbar/>
    <div className="signin-page">
      <div className="signin-container">
        <h2 className="signin-title">SIGN IN</h2>
        <form onSubmit={handleLogin} className="form-signin">
          <h3 className="title-style-1 text-center">
            Welcome Back <span className="title-under"></span>
          </h3>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="row">
            <div className="form-group col-md-12">
              <input
                type="email"
                className="form-control sign-in"
                id="email"
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-12">
              <input
                type="password"
                className="form-control sign-in"
                name="password"
                placeholder="Password*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-12">
              <button type="submit" className="btn btn-primary pull-right" name="signInNow">
                SIGN IN
              </button>
            </div>
          </div>
        </form>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default SignIn;
