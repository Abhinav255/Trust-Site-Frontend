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
    FormGroup,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";
import { Link } from 'react-router-dom';
import NotificationAlert from "react-notification-alert";
import Loader from 'components/Loader';

const TrusteeTable = () => {
    const [trustees, setTrustees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedTrustees, setSelectedTrustees] = useState(new Set());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const notificationAlertRef = useRef(null); // Ref for NotificationAlert

    useEffect(() => {
        const fetchTrustees = async () => {
            try {
                const response = await axios.get('https://trust-site-frontend.onrender.com/trustees');
                const fetchedTrustees = response.data.data || [];
                setTrustees(fetchedTrustees);
            } catch (error) {
                console.error('Error fetching trustee data:', error);
                setTrustees([]);
            } finally {
                setLoading(false);
            }
        };
        fetchTrustees();
    }, []);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const notify = (message, type) => {
        const options = {
            place: "tc",
            message: <div>{message}</div>,
            type: type,
            icon: "tim-icons icon-bell-55",
            autoDismiss: 7,
        };
        notificationAlertRef.current.notificationAlert(options);
    };

    const handleDelete = async () => {
        const idsToDelete = trustees
            .filter(trustee => selectedTrustees.has(trustee._id))
            .map(trustee => trustee._id);

        try {
            for (let id of idsToDelete) {
                await axios.delete(`https://trust-site-frontend.onrender.com/trustees/${id}`);
            }
            const remainingTrustees = trustees.filter(trustee => !idsToDelete.includes(trustee._id));
            setTrustees(remainingTrustees);
            setSelectedTrustees(new Set());
            toggleModal();
            notify("Selected trustees have been successfully deleted.", "success");
        } catch (error) {
            console.error('Error deleting trustees:', error);
            notify("Failed to delete selected trustees. Please try again.", "danger");
        }
    };

    const toggleSelectTrustee = (id) => {
        const newSelection = new Set(selectedTrustees);
        if (newSelection.has(id)) {
            newSelection.delete(id);
        } else {
            newSelection.add(id);
        }
        setSelectedTrustees(newSelection);
    };

    const handleSort = (criteria) => {
        const newSortOrder = sortBy === criteria && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortBy(criteria);
        setSortOrder(newSortOrder);
    };

    const filteredTrustees = trustees.filter((trustee) => {
        return (
            trustee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            trustee.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
            trustee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            trustee.phone.includes(searchQuery)
        );
    });

    const sortedTrustees = filteredTrustees.sort((a, b) => {
        if (sortBy === 'name') {
            return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortBy === 'city') {
            return sortOrder === 'asc' ? a.city.localeCompare(b.city) : b.city.localeCompare(a.city);
        }
        return 0;
    });

    const indexOfLastTrustee = currentPage * itemsPerPage;
    const indexOfFirstTrustee = indexOfLastTrustee - itemsPerPage;
    const currentTrustees = sortedTrustees.slice(indexOfFirstTrustee, indexOfLastTrustee);

    const totalPages = Math.ceil(filteredTrustees.length / itemsPerPage);
    const role = localStorage.getItem('role');

    if (loading) {
        return <Loader/>;
    }

    return (
        <div className="content">
            <NotificationAlert ref={notificationAlertRef} />
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <Row className="align-items-center">
                                <Col md="6">
                                    <CardTitle tag="h4">Trustee Information</CardTitle>
                                </Col>
                                <Col md="6" className="text-right">
                                    {role === 'SuperUser' && selectedTrustees.size > 0 && (
                                        <FormGroup inline>
                                            <Button color="danger" style={{ padding: "10px" }} onClick={toggleModal}>
                                                <i className="fa fa-trash" style={{ color: "white" }}></i>
                                            </Button>
                                        </FormGroup>
                                    )}
                                    <FormGroup inline>
                                        <Input
                                            type="text"
                                            placeholder="Search by Name, City, Email, or Phone"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            style={{ maxWidth: "300px", display: "inline-block" }}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Table className="tablesorter" responsive>
                                <thead className="text-primary">
                                    <tr>
                                        {role === 'SuperUser' && <th>Select</th>}
                                        <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                                            Name {sortBy === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                                        </th>
                                        <th onClick={() => handleSort('city')} style={{ cursor: 'pointer' }}>
                                            City {sortBy === 'city' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                                        </th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Address</th>
                                        {role === 'SuperUser' && <th>Actions</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentTrustees.map((trustee) => (
                                        <tr key={trustee._id}>
                                            {role === 'SuperUser' && (
                                                <td>
                                                    <Input
                                                        type="checkbox"
                                                        style={{ transform: "translate(30px,-10px)" }}
                                                        onChange={() => toggleSelectTrustee(trustee._id)}
                                                    />
                                                </td>
                                            )}
                                            <td>{trustee.name}</td>
                                            <td>{trustee.city}</td>
                                            <td>{trustee.email}</td>
                                            <td>{trustee.phone}</td>
                                            <td>{trustee.address}</td>
                                            {role === 'SuperUser' && (
                                                <td>
                                                    <Link to={`/admin/trustee/edit/${trustee._id}`} className='text-white'>
                                                        <Button color="primary">
                                                            Edit
                                                        </Button>
                                                    </Link>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div className="pagination">
                                {[...Array(totalPages)].map((_, index) => (
                                    <Button
                                        key={index}
                                        color="secondary"
                                        onClick={() => setCurrentPage(index + 1)}
                                        active={currentPage === index + 1}
                                    >
                                        {index + 1}
                                    </Button>
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            {/* Confirmation Modal */}
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Confirm Deletion</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete the selected trustees?
                </ModalBody>
                <ModalFooter className='p-3'>
                    <Button color="danger" onClick={handleDelete}>Confirm</Button>
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default TrusteeTable;
