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
    FormGroup,
    Input,
} from "reactstrap";
import { Link, useNavigate } from 'react-router-dom';
import Loader from 'components/Loader';

const DonorTable = () => {
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedDonors, setSelectedDonors] = useState(new Set());
    const [searchQuery, setSearchQuery] = useState(""); // Search query state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDonors = async () => {
            try {
                const response = await axios.get('https://trust-site-frontend.onrender.com/donors');
                setDonors(response.data.data || []);
            } catch (error) {
                console.error('Error fetching donor data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDonors();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredDonors = donors.filter((donor) => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        return (
            donor.name.toLowerCase().includes(lowerCaseQuery) ||
            donor.city.toLowerCase().includes(lowerCaseQuery) ||
            donor.email.toLowerCase().includes(lowerCaseQuery)
        );
    });

    const handleSort = (criteria) => {
        const newSortOrder = sortBy === criteria && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortBy(criteria);
        setSortOrder(newSortOrder);
    };

    const sortedDonors = [...filteredDonors].sort((a, b) => {
        if (sortBy === 'name') {
            return sortOrder === 'asc'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        } else if (sortBy === 'city') {
            return sortOrder === 'asc'
                ? a.city.localeCompare(b.city)
                : b.city.localeCompare(a.city);
        } else if (sortBy === 'date') {
            return sortOrder === 'asc'
                ? new Date(a.updatedAt) - new Date(b.updatedAt)
                : new Date(b.updatedAt) - new Date(a.updatedAt);
        }
        return 0;
    });

    const indexOfLastDonor = currentPage * itemsPerPage;
    const indexOfFirstDonor = indexOfLastDonor - itemsPerPage;
    const currentDonors = sortedDonors.slice(indexOfFirstDonor, indexOfLastDonor);

    const totalPages = Math.ceil(filteredDonors.length / itemsPerPage);

    if (loading) {
        return <Loader/>;
    }

    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <Row className="align-items-center">
                                <Col md="6">
                                    <CardTitle tag="h4">Donor Information</CardTitle>
                                </Col>
                                <Col md="6" className="text-right">
                                    <FormGroup inline>
                                        <Input
                                            type="text"
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            placeholder="Search by Name, City, or Email"
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
                                        <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                                            Name {sortBy === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                                        </th>
                                        <th onClick={() => handleSort('city')} style={{ cursor: 'pointer' }}>
                                            City {sortBy === 'city' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                                        </th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Address</th>
                                        <th onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
                                            Date {sortBy === 'date' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                                        </th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentDonors.map((donor) => (
                                        <tr key={donor._id} onDoubleClick={() => navigate(`/admin/donor/donor-view/${donor._id}`)}>
                                            <td>{donor.name}</td>
                                            <td>{donor.city}</td>
                                            <td>{donor.email}</td>
                                            <td>{donor.phone}</td>
                                            <td>{donor.address}</td>
                                            <td>{new Date(donor.updatedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" })}</td>
                                            <td>
                                                <Link to={`/admin/donor/edit/${donor._id}`}>
                                                    <Button color="primary">Edit</Button>
                                                </Link>
                                            </td>
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
        </div>
    );
};

export default DonorTable;
