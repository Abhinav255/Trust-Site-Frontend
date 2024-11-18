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
import "../assets/css/Login.css"; // Reuse the same CSS file
import { Link, useNavigate } from "react-router-dom";
import NotificationAlert from "react-notification-alert";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const notificationAlertRef = useRef(null);
  const navigate = useNavigate();

  const notify = (type, msg) => {
    const options = {
      place: "tc",
      message: <div>{msg}</div>,
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      notify("danger", "Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "https://trust-site-frontend.onrender.com/forgot-password",
        { email, newPassword }
      );
      notify("success", "Password updated successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Error resetting password.";
      setError(errorMsg);
      notify("danger", errorMsg);
    }
  };

  return (
    <div className="login-page">
      <div className="react-notification-alert-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Row className="justify-content-center align-items-center h-100 mb-4">
        <Col xs="10" sm="8" md="6" lg="4">
          <div className="logo-container text-center">
            <img src={logo_img} alt="We Donate Logo" className="logo-img" />
            <h1 className="logo-text">We Donate</h1>
          </div>
          <Card className="card-login">
            <CardBody>
              <h3 className="text-center">Forgot Password</h3>
              {error && <p className="text-danger text-center">{error}</p>}
              <Form onSubmit={handleForgotPassword}>
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
                  <label>New Password</label>
                  <Input
                    className="input-field"
                    placeholder="Enter your new password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Confirm Password</label>
                  <Input
                    className="input-field"
                    placeholder="Confirm your new password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <div className="text-center mb-3">
                  <Link to="/" className="login-link">
                    Login
                  </Link>
                </div>
                </FormGroup>
                <Button color="primary" className="btn-block btn-login " type="submit">
                  Reset Password
                </Button>
                
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
