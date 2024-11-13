import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Col
} from "reactstrap";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Topbar from '../components/Topbar';
import Navbar from '../components/Navbar';

import { FaCalendarAlt, FaUser, FaDollarSign } from 'react-icons/fa';

const MyDonations = () => {
    const donorId = localStorage.getItem('donorId');
    const [donor, setDonor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [contributions, setContributions] = useState([]);

    useEffect(() => {
        const fetchDonor = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/donors/${donorId}`);
                if (response.data && response.data.data) {
                    setDonor(response.data.data);
                } else {
                    console.error('No donor data found:', response.data);
                }
            } catch (error) {
                toast.error('Error fetching donor data');
                console.error('Error fetching donor data:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchContributions = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/contributions/${donorId}`);
                setContributions(response.data || []);
            } catch (error) {
                toast.error('Error fetching contributions');
                console.error('Error fetching contributions:', error);
            }
        };

        if (donorId) {
            fetchDonor();
            fetchContributions();
        } else {
            toast.error('No donorId found in localStorage');
            setLoading(false);
        }
    }, [donorId]);

    const totalAmount = contributions.reduce((total, contribution) => total + contribution.amount, 0);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Topbar />
            <Navbar />
            <div className="content-wrapper d-flex justify-content-center align-items-center">
                {donor && (
                    <Col md="10" lg="9"  className="col-xs-12 col-sm-12" style={{height:"250px"}}>
                        <Card className="shadow donation-card advanced-design">
                            <CardHeader className="d-flex justify-content-between align-items-center header-gradient">
                                <CardTitle tag="h3" className="m-0 text-white text-center">
                                    {donor.name}'s Donations
                                </CardTitle>
                                
                            </CardHeader>
                            <CardBody>
                                <Table responsive bordered hover className="donation-table advanced-table">
                                    <thead>
                                        <tr>
                                            <th><FaCalendarAlt /> Date</th>
                                            <th><FaUser /> Collected By</th>
                                            <th><FaDollarSign /> Amount</th>
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
                                                <td colSpan="3" className="text-center">No donations found.</td>
                                            </tr>
                                        )}
                                        {contributions.length > 0 && (
                                            <tr className="font-weight-bold total-row">
                                                <td colSpan="2" className="text-right">Total Amount</td>
                                                <td>{totalAmount}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                )}
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default MyDonations;
