import React, { useState, useRef } from "react";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Row, Col } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function AddContribution() {
    let  donorId  = useParams(); // Get donorId from the route params
    donorId = donorId.id;
    const navigate = useNavigate();
    const notificationAlertRef = useRef(null); // Create ref for NotificationAlert

    const [formData, setFormData] = useState({
        amount: "",
        date: null,
        collectedBy: "",
    });

    const [loading, setLoading] = useState(false);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle date changes for the contribution date
    const handleDateChange = (date) => {
        setFormData((prevState) => ({
            ...prevState,
            date,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { amount, date, collectedBy } = formData;

        // Check if all required fields are filled
        if (!amount || !date || !collectedBy) {
            notificationAlertRef.current.notificationAlert({
                place: "tr",
                message: "Please fill in all fields.",
                type: "danger",
                icon: "tim-icons icon-bell-55",
                autoDismiss: 7,
            });
            setLoading(false);
            return;
        }

        try {
            // Send the contribution data to the backend
            const response = await axios.post(`https://trust-site-frontend.onrender.com/contributions/add-contribution/${donorId}`, {
                amount,
                date,
                collectedBy,
                donorId,
            });

            // Success notification
            notificationAlertRef.current.notificationAlert({
                place: "tr",
                message: "Contribution added successfully.",
                type: "success",
                icon: "tim-icons icon-bell-55",
                autoDismiss: 7,
            });

            // Reset form after success
            setFormData({
                amount: "",
                date: null,
                collectedBy: "",
            });

            // Redirect to donor view after a slight delay
            setTimeout(() => {
                navigate(`/admin/donor/donor-view/${donorId}`); // Redirect to donor's contribution page
            }, 2000); // 2 seconds delay
        } catch (error) {
            console.error("Error adding contribution:", error);
            notificationAlertRef.current.notificationAlert({
                place: "tr",
                message: "Failed to add contribution.",
                type: "danger",
                icon: "tim-icons icon-bell-55",
                autoDismiss: 7,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="content">
            {/* NotificationAlert container */}
            <div className="react-notification-alert-container">
                <NotificationAlert ref={notificationAlertRef} />
            </div>
            <Row>
                <Col md="8">
                    <Card>
                        <CardHeader>
                            <h5 className="title">Add Contribution</h5>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md="6">
                                        <FormGroup>
                                            <label>Contribution Amount</label>
                                            <Input
                                                type="number"
                                                name="amount"
                                                value={formData.amount}
                                                onChange={handleChange}
                                                placeholder="Amount"
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <label>Collector</label>
                                            <Input
                                                type="text"
                                                name="collectedBy"
                                                value={formData.collectedBy}
                                                onChange={handleChange}
                                                placeholder="Collected By"
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6">
                                        <FormGroup>
                                            <label>Contribution Date</label><br />
                                            <DatePicker
                                                selected={formData.date}
                                                onChange={handleDateChange}
                                                dateFormat="yyyy-MM-dd"
                                                className="form-control"
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button className="btn-fill" color="primary" type="submit" disabled={loading}>
                                    {loading ? "Submitting..." : "Submit Contribution"}
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
