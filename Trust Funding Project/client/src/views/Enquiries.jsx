import React, { useEffect, useState } from 'react';
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

const Enquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchEnquiries = async () => {
            try {
                const response = await axios.get('https://trust-site-frontend.onrender.com/contact');
                setEnquiries(response.data);
            } catch (error) {
                console.error('Error fetching enquiries:', error);
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
                                            <td>
                                                {enquiry.message.length > 30
                                                    ? `${enquiry.message.slice(0, 30)}...`
                                                    : enquiry.message}
                                            </td>
                                            <td>
                                                <Button color="info" size="sm" onClick={() => toggleModal(enquiry)}>
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
                    <p><span style={{color:'rgba(128, 72, 165, 0.8)', }}>Email:</span><b> {selectedEnquiry?.email}</b></p>
                    <p><span style={{color:'rgba(128, 72, 165, 0.8)'}}>Message:</span></p>
                    <b>  <p>{selectedEnquiry?.message}</p></b>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default Enquiries;
