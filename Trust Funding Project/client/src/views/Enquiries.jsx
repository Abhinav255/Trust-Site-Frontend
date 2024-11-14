import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Spinner
} from "reactstrap";
import NotificationAlert from "react-notification-alert";

const Enquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const notificationAlertRef = useRef(null);

    useEffect(() => {
        const fetchEnquiries = async () => {
            try {
                const response = await axios.get('https://trust-site-frontend.onrender.com/');
                setEnquiries(response.data);
            } catch (error) {
                console.error('Error fetching enquiries:', error);
                notify("Failed to load enquiries.", "danger");
            } finally {
                setLoading(false);
            }
        };
        fetchEnquiries();
    }, []);

    const toggleModal = (enquiry = null) => {
        setSelectedEnquiry(enquiry);
        setIsModalOpen(!isModalOpen);
    };

    const notify = (message, type) => {
        const options = {
            place: "tc",
            message: <div>{message}</div>,
            type: type,
            icon: "tim-icons icon-bell-55",
            autoDismiss: 5,
        };
        notificationAlertRef.current.notificationAlert(options);
    };

    if (loading) {
        return (
            <div className="content">
                <Row className="justify-content-center">
                    <Spinner color="primary" />
                    <p>Loading Enquiries...</p>
                </Row>
            </div>
        );
    }

    return (
        <div className="content">
            <NotificationAlert ref={notificationAlertRef} />
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">Enquiries</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Table responsive>
                                <thead className="text-primary">
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Message</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {enquiries.map((enquiry) => (
                                        <tr key={enquiry._id}>
                                            <td>{enquiry.name}</td>
                                            <td>{enquiry.email}</td>
                                            <td>{enquiry.message.slice(0, 30)}...</td>
                                            <td>
                                                <Button color="info" onClick={() => toggleModal(enquiry)}>
                                                    View
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            {/* Enquiry Modal */}
            <Modal isOpen={isModalOpen} toggle={() => toggleModal(null)}>
                <ModalHeader toggle={() => toggleModal(null)}>
                    Enquiry from {selectedEnquiry?.name}
                </ModalHeader>
                <ModalBody>
                    <p><strong>Email:</strong> {selectedEnquiry?.email}</p>
                    <p><strong>Message:</strong></p>
                    <p>{selectedEnquiry?.message}</p>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default Enquiries;
