import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    Button
} from "reactstrap";
import { useParams, useNavigate } from 'react-router-dom';
import "react-notification-alert/dist/animate.css";
import NotificationAlert from "react-notification-alert"; // Import NotificationAlert

const EditTrustee = () => {
    const { id } = useParams(); 
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        address: '',
        city: '',
        role: 'trustee', 
        contributionAmount: '',
        collector: ''
    });
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({}); // State for validation errors
    const navigate = useNavigate(); // Use useNavigate for navigation
    const notificationAlertRef = useRef(null); // Create ref for NotificationAlert

    useEffect(() => {
        const fetchTrustee = async () => {
            try {
                const response = await axios.get(`https://trust-site-frontend.onrender.com/trustees/${id}`);
                setFormData(response.data.trustee);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching trustee data:', error);
                notify("Error fetching trustee data", "danger"); // Error notification
            } finally {
                setLoading(false);
            }
        };

        fetchTrustee();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Notify function for displaying success and error messages
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

    // Validate form fields
    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.phone) newErrors.phone = "Phone number is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.city) newErrors.city = "City is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Set errors if validation fails
            return;
        }

        try {
            console.log("Sending update request...");
            await axios.put(`https://trust-site-frontend.onrender.com/trustees/${id}`, formData);
            notify("Trustee updated successfully!", "success"); 
            setTimeout(() => {
                navigate('/admin/trustees');
            }, 2000); 
        } catch (error) {
            console.error('Error updating trustee data:', error);
            notify("Error updating trustee data", "danger"); 
        }
    };

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="content">
            <NotificationAlert ref={notificationAlertRef} />

            <Row>
                <Col md="11">
                    <Card>
                        <CardHeader>
                            <h5 className="title">Edit Trustee</h5>
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
                                            {errors.name && <div className="text-danger">{errors.name}</div>}
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
                                            {errors.phone && <div className="text-danger">{errors.phone}</div>}
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
                                            {errors.email && <div className="text-danger">{errors.email}</div>}
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
                                            {errors.address && <div className="text-danger">{errors.address}</div>}
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
                                            {errors.city && <div className="text-danger">{errors.city}</div>}
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
                                                required 
                                                disabled
                                            >
                                                <option value="trustee">Trustee</option>
                                                <option value="donor">Donor</option>
                                                <option value="SuperUser">SuperUser</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button className="btn-fill" color="primary" type="submit">
                                    Update Trustee
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default EditTrustee;
