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
} from "reactstrap";
import { useParams, Link } from 'react-router-dom';

const DonorView = () => {
    const { id: donorId } = useParams();
    const [donor, setDonor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [contributions, setContributions] = useState([]);

    useEffect(() => {
        const fetchDonor = async () => {
            try {
                const response = await axios.get(`https://trust-site-frontend.onrender.com/donors/${donorId}`);
                if (response.data && response.data.data) {
                    setDonor(response.data.data);
                } else {
                    console.error('No donor data found:', response.data);
                }
            } catch (error) {
                console.error('Error fetching donor data:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchContributions = async () => {
            try {
                const response = await axios.get(`https://trust-site-frontend.onrender.com/contributions/${donorId}`);
                setContributions(response.data || []);
            } catch (error) {
                console.error('Error fetching contributions:', error);
            }
        };

        fetchDonor();
        fetchContributions();
    }, [donorId]);

    const totalAmount = contributions.reduce((total, contribution) => total + contribution.amount, 0);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="content">
            {donor && (
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">{donor.name}'s Contributions</CardTitle>
                                <Link to={`/admin/donor/add-contribution/${donor._id}`}>
                                    <Button color="success" className="float-right">
                                        Add Contribution
                                    </Button>
                                </Link>
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>Date</th>
                                            <th>Collected By</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contributions.length > 0 ? contributions.map((contribution) => (
                                            <tr key={contribution._id}>
                                                <td>{new Date(contribution.date).toLocaleDateString("en-GB")}</td>
                                                <td>{contribution.collectedBy}</td>
                                                <td>{contribution.amount}</td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="3" className="text-center">No contributions found.</td>
                                            </tr>
                                        )}
                                        {/* Total row */}
                                        {contributions.length > 0 && (
                                            <tr>
                                                <td colSpan="2" className="text-right font-weight-bold">Total Amount</td>
                                                <td className="font-weight-bold">{totalAmount}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default DonorView;
