import React, { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import { Line, Bar } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  ButtonGroup,
  Button,
} from "reactstrap";
import Loader from "components/Loader";

const chartOptions = {
  maintainAspectRatio: false,
  legend: { display: true },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
  },
  responsive: true,
  scales: {
    yAxes: [
      {
        gridLines: { drawBorder: false, color: "rgba(29,140,248,0.1)" },
        ticks: { padding: 20, fontColor: "#9a9a9a", beginAtZero: true },
      },
    ],
    xAxes: [
      {
        gridLines: { drawBorder: false, color: "rgba(29,140,248,0.1)" },
        ticks: { padding: 20, fontColor: "#9a9a9a" },
      },
    ],
  },
};

function Dashboard() {
  const [contributions, setContributions] = useState([]);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDonor, setSelectedDonor] = useState("all");
  const [timeRange, setTimeRange] = useState("all");
  const [topCollectors, setTopCollectors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donorsResponse = await axios.get(
          "https://trust-site-frontend.onrender.com/donors"
        );
        const contributionsResponse = await axios.get(
          "https://trust-site-frontend.onrender.com/contributions"
        );

        const donorData = donorsResponse.data.data || [];
        const contributionsData = contributionsResponse.data || [];

        // Map contributions to include donor details
        const mappedContributions = contributionsData.map((contribution) => {
          const donor = donorData.find((d) => d._id === contribution.donorId);
          return {
            ...contribution,
            donorName: donor ? donor.name : "Unknown",
            city: donor ? donor.city : "Unknown",
          };
        });

        // Calculate contributions by collectors
        const contributionsByCollector = mappedContributions.reduce(
          (acc, curr) => {
            acc[curr.collectedBy] =
              (acc[curr.collectedBy] || 0) + curr.amount;
            return acc;
          },
          {}
        );

        // Get top collectors
        const topCollectorsData = Object.entries(contributionsByCollector)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);

        setDonors(donorData);
        setContributions(mappedContributions);
        setTopCollectors(topCollectorsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const contributionsByDonor = contributions.reduce((acc, curr) => {
    acc[curr.donorName] = (acc[curr.donorName] || 0) + curr.amount;
    return acc;
  }, {});

  const topDonors = Object.entries(contributionsByDonor)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const topDonorNames = topDonors.map((donor) => donor[0]);
  const topDonorAmounts = topDonors.map((donor) => donor[1]);

  const contributionsByCity = contributions.reduce((acc, curr) => {
    acc[curr.city] = (acc[curr.city] || 0) + curr.amount;
    return acc;
  }, {});

  const cityNames = Object.keys(contributionsByCity);
  const cityAmounts = Object.values(contributionsByCity);

  const filteredContributions =
    selectedDonor === "all"
      ? contributions
      : contributions.filter((c) => c.donorName === selectedDonor);

  const chartData = {
    labels: filteredContributions.map(
      (c) => `${new Date(c.date).toLocaleDateString()} - ${c.donorName}`
    ),
    datasets: [
      {
        label:
          selectedDonor === "all"
            ? "Total Contributions"
            : `${selectedDonor}'s Contributions`,
        fill: true,
        backgroundColor: "rgba(29,140,248,0.2)",
        borderColor: "#8c92b9",
        borderWidth: 2,
        data: filteredContributions.map((c) => c.amount),
      },
    ],
  };

  const totalContributors = new Set(
    contributions.map((c) => c.donorName)
  ).size;

  const donationsThisMonth = contributions
    .filter((c) => {
      const donationDate = new Date(c.date);
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      return (
        donationDate.getMonth() === currentMonth &&
        donationDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, c) => sum + c.amount, 0);

  const filterContributionsByTimeRange = (range) => {
    const now = new Date();
    let filteredData = [...contributions];

    switch (range) {
      case "week":
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay()); // Get the start of the current week
        filteredData = contributions.filter(c => {
          const donationDate = new Date(c.date);
          return donationDate >= weekStart && donationDate <= now;
        });
        break;
      case "month":
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1); // Start of the current month
        filteredData = contributions.filter(c => {
          const donationDate = new Date(c.date);
          return donationDate >= monthStart && donationDate <= now;
        });
        break;
      default:
        break;
    }

    return filteredData;
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    const filteredContributions = filterContributionsByTimeRange(range);
    setContributions(filteredContributions);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="content">
      <Row>
        <Col lg="6" md="12">
          <Card>
            <CardHeader>
              <h5 className="card-category">Total Contributors</h5>
              <CardTitle tag="h3">
                <i className="tim-icons icon-user-run text-success" /> {totalContributors}
              </CardTitle>
            </CardHeader>
            <CardBody>
              <p>Number of unique contributors this month.</p>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" md="12">
          <Card>
            <CardHeader>
              <h5 className="card-category">Total Donations This Month</h5>
              <CardTitle tag="h3">
                <i className="tim-icons icon-credit-card text-warning" /> {donationsThisMonth}₹
              </CardTitle>
            </CardHeader>
            <CardBody>
              <p>Total amount donated this month.</p>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <Row>
                <Col className="text-left" sm="6">
                  <h5 className="card-category">Contributions</h5>
                  <CardTitle tag="h2">Performance</CardTitle>
                </Col>
                <Col sm="6">
                  <ButtonGroup className="btn-group-toggle float-right">
                    <Button
                      color="info"
                      size="sm"
                      onClick={() => setSelectedDonor("all")}
                      className={classNames({ active: selectedDonor === "all" })}
                    >
                      All Donors
                    </Button>
                    {topDonorNames.map((donor, index) => (
                      <Button
                        key={index}
                        color="info"
                        size="sm"
                        onClick={() => setSelectedDonor(donor)}
                        className={classNames({ active: selectedDonor === donor })}
                      >
                        {donor}
                      </Button>
                    ))}
                  </ButtonGroup>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Line data={chartData} options={chartOptions} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h4">Contribution Trends Over Time</CardTitle>
              <ButtonGroup className="btn-group-toggle float-right">
                <Button color="primary" size="sm" onClick={() => handleTimeRangeChange("week")}>
                  Week
                </Button>
                <Button color="primary" size="sm" onClick={() => handleTimeRangeChange("month")}>
                  Month
                </Button>
              </ButtonGroup>
            </CardHeader>
            <CardBody>
              <Bar data={chartData} options={chartOptions} />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="6">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h4">Top Donors</CardTitle>
            </CardHeader>
            <CardBody>
              <Bar
                data={{
                  labels: topDonorNames,
                  datasets: [{
                    label: "Top Donors",
                    backgroundColor: "rgba(29,140,248,0.6)",
                    data: topDonorAmounts,
                  }],
                }}
                options={{
                  scales: {
                    xAxes: [{
                      barThickness: 10,
                    }],
                  },
                }}
              />
            </CardBody>
          </Card>
        </Col>

        <Col xs="12" md="6">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h4">Donations by City</CardTitle>
            </CardHeader>
            <CardBody>
              <Bar
                data={{
                  labels: cityNames,
                  datasets: [{
                    label: "Donations by City",
                    backgroundColor: "rgba(75,192,192,0.6)",
                    data: cityAmounts,
                  }],
                }}
                options={{
                  scales: {
                    xAxes: [{
                      barThickness: 10,
                    }],
                  },
                }}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
 


  <Col xs="12" md="6">
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Top Donors Table</CardTitle>
      </CardHeader>
      <CardBody>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount Contributed</th>
            </tr>
          </thead>
          <tbody>
            {topDonors.map(([donor, amount], index) => (
              <tr key={index}>
                <td>{donor}</td>
                <td>{amount}₹</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  </Col>
  

        <Col lg="6" md="12">
          <Card>
            <CardHeader>
              <h5 className="card-category">Top Collectors</h5>
            </CardHeader>
            <CardBody>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Collector</th>
                    <th>Amount Collected</th>
                  </tr>
                </thead>
                <tbody>
                  {topCollectors.map(([collector, amount], index) => (
                    <tr key={index}>
                      <td>{collector}</td>
                      <td>{amount}₹</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
