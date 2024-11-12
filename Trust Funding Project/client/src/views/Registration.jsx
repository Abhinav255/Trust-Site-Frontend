import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Row, Col } from "reactstrap";
import { registerUser, resetRegistrationState } from "../redux/slices/registrationSlice";
import { registerSuperUser } from "../redux/slices/superUserSlice";
import NotificationAlert from "react-notification-alert";
import { useNavigate } from "react-router-dom";

function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notificationAlertRef = useRef(null);

  const { loading, success, error } = useSelector((state) => state.registration);
  const { loading: superUserLoading, success: superUserSuccess, error: superUserError } = useSelector((state) => state.superusers);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    role: "",
    password: "",
    contributionAmount: "",
    collector: "",
    username: "",
  });

  const [isRoleDisabled, setIsRoleDisabled] = useState(false);
  const [roleSelected, setRoleSelected] = useState(false);
  const [availableRoles, setAvailableRoles] = useState(["trustee", "donor"]);

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    console.log("Fetched role from localStorage:", savedRole);
  
    if (savedRole === "Trustee") {
      setAvailableRoles(["donor"]); 
      setFormData((prevState) => ({
        ...prevState,
        role: "donor",
      }));
      setIsRoleDisabled(true);
      setRoleSelected(true);
      console.log("Roles available:", ["donor"]); // Debug log
    } else {
      setAvailableRoles(["trustee", "donor"]); 
    }
  }, []);
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "role") {
      setRoleSelected(true);
      if (value !== "donor") {
        setFormData((prevState) => ({
          ...prevState,
          contributionAmount: "",
          collector: "",
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, email, address, city, role, password, username } = formData;

    if (!name || !phone || !email || !address || !city || !role || !password) {
      notify("Please fill in all required fields.", "danger");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      notify("Phone number must be 10 digits.", "danger");
      return;
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      notify("Please enter a valid email address.", "danger");
      return;
    }

    if (password.length < 8) {
      notify("Password must be at least 8 characters long.", "danger");
      return;
    }

    if (role === "SuperUser" && !username) {
      notify("Username is required for SuperUser registration.", "danger");
      return;
    }

    if (role === "SuperUser") {
      dispatch(registerSuperUser(formData));
    } else {
      dispatch(registerUser(formData));
    }
  };

  useEffect(() => {
    if ((success || superUserSuccess) && !loading) {
      const roleMessage = formData.role === "donor"
        ? "Donor registration successful!"
        : formData.role === "SuperUser"
        ? "SuperUser registration successful!"
        : "Trustee registration successful!";

      notify(roleMessage, "success");

      setTimeout(() => {
        setFormData({
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
          role: "",
          password: "",
          contributionAmount: "",
          collector: "",
          username: "",
        });
        setRoleSelected(false);
        dispatch(resetRegistrationState());

        if (formData.role === "trustee") {
          navigate("/admin/trustees");
        } else if (formData.role === "donor") {
          navigate("/admin/donors");
        } else if (formData.role === "SuperUser") {
          navigate("/admin/dashboard");
        }
      }, 2000);
    }

    if (error || superUserError) {
      notify(`Registration failed: ${error || superUserError || "An error occurred."}`, "danger");
      dispatch(resetRegistrationState());
    }
  }, [success, superUserSuccess, error, superUserError, loading, formData.role, dispatch, navigate]);

  const notify = (message, type) => {
    const options = {
      place: "tr",
      message: <div>{message}</div>,
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  return (
    <div className="content">
      <div className="react-notification-alert-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Row>
        <Col md="8">
          <Card>
            <CardHeader>
              <h5 className="title">Register New User</h5>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label>Name</label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label>Phone</label>
                      <Input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label>Email</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label>Password</label>
                      <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label>Address</label>
                      <Input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label>City</label>
                      <Input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label>Role</label>
                      <Input
                        type="select"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        disabled={isRoleDisabled}
                        required
                      >
                        <option value="" disabled={!roleSelected}>Select a role</option>
                        {availableRoles.map((role) => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Button className="btn-fill" color="primary" type="submit" disabled={loading || superUserLoading}>
                  {loading || superUserLoading ? "Registering..." : "Register"}
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default Registration;
