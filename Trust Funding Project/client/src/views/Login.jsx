import React, { useState, useRef } from "react"; 
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import logo_img from "../assets/img/we-care-logo.png";
import "../assets/css/Login.css"; 
import { useNavigate, Link } from "react-router-dom"; // Import Link
import NotificationAlert from "react-notification-alert";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const notificationAlertRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://trust-site-frontend.onrender.com/login", { email, password });
      if (response.data && response.data.token) {
        // Set the token and role in local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("email", email);
        
        // Show notification
        notify();
        
        // Reload the page after a delay to ensure the notification is seen
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Adjust the delay as needed
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const notify = () => {
    var options = {
      place: "tc", // Top center
      message: (
        <div>
          <div>
            Welcome back! You have successfully logged in.
          </div>
        </div>
      ),
      type: "success",
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  return (
    <div className="login-page">
      <div className="react-notification-alert-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Row className="justify-content-center align-items-center h-100">
        <Col xs="10" sm="8" md="6" lg="4">
          <div className="logo-container text-center">
            <img src={logo_img} alt="We Donate Logo" className="logo-img" />
            <h1 className="logo-text">We Donate</h1>
          </div>
          <Card className="card-login">
            <CardBody>
              <h3 className="text-center">Login</h3>
              {error && <p className="text-danger">{error}</p>}
              <Form onSubmit={handleLogin}>
                <FormGroup>
                  <label>Email</label>
                  <Input
                    className="input-field"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Password</label>
                  <Input
                    className="input-field"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </FormGroup>
                <div className="text-center mb-3">
                  <Link to="/forgot-password" className="forgot-password-link">
                    Forgot Password?
                  </Link>
                </div>
                <Button color="primary" className="btn-block btn-login" type="submit">
                  Log In
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
