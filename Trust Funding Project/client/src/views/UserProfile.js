import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import NotificationAlert from "react-notification-alert"; // Import NotificationAlert

function UserProfile() {
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    address: "",
    city: "",
    country: "",
    id: "",
    password: "", // Added password field to userData state
  });

  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role")?.toLowerCase();

  const notificationAlertRef = useRef(null); // Create ref for NotificationAlert

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/${role}s`);
        console.log("API Response:", response.data);

        if (response.data.success && Array.isArray(response.data.data)) {
          const user = response.data.data.find((user) => user.email === email);
          if (user) {
            setUserData({
              name: user.name,
              username: user.username,
              email: user.email,
              address: user.address,
              city: user.city,
              country: user.country,
              id: user._id,
              password: user.password, // Added user password to state
            });
          } else {
            console.log("No user found with the matching email.");
          }
        } else {
          console.error("Unexpected response data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        notify("Error fetching user data", "danger"); // Error notification
      }
    };

    if (email && role) {
      fetchUserData();
    }
  }, [email, role]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("User data submitted:", userData);
      // Use userData.id to send the request
      await axios.put(`http://localhost:5000/${role}s/${userData.id}`, userData);
      console.log(`http://localhost:5000/${role}s/${userData.id}`);
      notify("Profile updated successfully!", "success"); // Success notification
    } catch (error) {
      console.error("Error updating user data:", error);
      notify("Error updating profile", "danger"); // Error notification
    }
  };

  return (
    <div className="content">
      <NotificationAlert ref={notificationAlertRef} /> {/* NotificationAlert component */}

      <Row>
        <Col md="8">
          <Card>
            <CardHeader>
              <h5 className="title">Edit Profile</h5>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col className="px-3" md="6">
                    <FormGroup>
                      <label>Name</label>
                      <Input
                        value={userData.name}
                        placeholder="Name"
                        type="text"
                        onChange={(e) =>
                          setUserData({ ...userData, name: e.target.value })
                        }
                      />
                    </FormGroup>
                  </Col>
                  {role === "superuser" && (
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Username</label>
                        <Input
                          value={userData.username}
                          placeholder="Username"
                          type="text"
                          onChange={(e) =>
                            setUserData({ ...userData, username: e.target.value })
                          }
                        />
                      </FormGroup>
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label htmlFor="exampleInputEmail1">Email address</label>
                      <Input
                        value={userData.email}
                        placeholder="Email"
                        type="email"
                        onChange={(e) =>
                          setUserData({ ...userData, email: e.target.value })
                        }
                      />
                    </FormGroup>
                  </Col>
                  {/* {role === "superuser" && (
                    <Col md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Password</label>
                        <Input
                          value={userData.password}
                          placeholder="Password"
                          type="password"
                          onChange={(e) =>
                            setUserData({ ...userData, password: e.target.value })
                          }
                        />
                      </FormGroup>
                    </Col>
                  )} */}
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label>Address</label>
                      <Input
                        value={userData.address}
                        placeholder="Home Address"
                        type="text"
                        onChange={(e) =>
                          setUserData({ ...userData, address: e.target.value })
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>City</label>
                      <Input
                        value={userData.city}
                        placeholder="City"
                        type="text"
                        onChange={(e) =>
                          setUserData({ ...userData, city: e.target.value })
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Button className="btn-fill" color="primary" type="submit">
                  Save
                </Button>
              </Form>
            </CardBody>
            <CardFooter />
          </Card>
        </Col>
        <Col md="4">
          <Card className="card-user">
            <CardBody>
              <CardText />
              <div className="author">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img
                    alt="..."
                    className="avatar"
                    src={require("assets/img/images.jpg")}
                  />
                  <h5 className="title">{userData.name}</h5>
                  <h5 className="title">
  {role.replace(/\b\w/g, char => char.toUpperCase())}
</h5>

                </a>
              </div>
            </CardBody>
            <CardFooter>
              <div className="button-container">
                <Button className="btn-icon btn-round" color="facebook">
                  <i className="fab fa-facebook" />
                </Button>
                <Button className="btn-icon btn-round" color="twitter">
                  <i className="fab fa-twitter" />
                </Button>
                <Button className="btn-icon btn-round" color="google">
                  <i className="fab fa-google-plus" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default UserProfile;