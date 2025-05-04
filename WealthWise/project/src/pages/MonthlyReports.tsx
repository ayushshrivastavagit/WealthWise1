import React from 'react';
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap';
import { useFinancialData } from '../context/FinancialDataContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyReports: React.FC = () => {
  const { monthlyReports } = useFinancialData();
  
  // Prepare data for charts
  const months = monthlyReports.map(report => report.month);
  const healthScores = monthlyReports.map(report => report.healthScore);
  const dtiRatios = monthlyReports.map(report => report.debtToIncomeRatio * 100);
  const utilizations = monthlyReports.map(report => report.creditUtilization * 100);
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
        }
      }
    }
  };
  
  const healthScoreData = {
    labels: months,
    datasets: [
      {
        label: 'Health Score',
        data: healthScores,
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        tension: 0.4,
        fill: true,
      }
    ]
  };
  
  const metricsData = {
    labels: months,
    datasets: [
      {
        label: 'Debt-to-Income Ratio',
        data: dtiRatios,
        borderColor: '#06B6D4',
        backgroundColor: 'rgba(6, 182, 212, 0.5)',
        tension: 0.4,
        borderDash: [],
      },
      {
        label: 'Credit Utilization',
        data: utilizations,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.4,
        borderDash: [],
      }
    ]
  };
  
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold">Monthly Reports</h1>
          <p className="text-muted">Track your financial health progress over time</p>
        </Col>
      </Row>
      
      <Row className="g-4 mb-4">
        <Col lg={6}>
          <Card className="glass-card fade-in">
            <Card.Body>
              <Card.Title className="mb-4">Financial Health Score Trend</Card.Title>
              <div style={{ height: '300px' }}>
                <Line options={chartOptions} data={healthScoreData} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={6}>
          <Card className="glass-card fade-in">
            <Card.Body>
              <Card.Title className="mb-4">Key Metrics Trend</Card.Title>
              <div style={{ height: '300px' }}>
                <Line options={chartOptions} data={metricsData} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <Card className="glass-card fade-in">
            <Card.Body>
              <Card.Title className="mb-4">Monthly Report Details</Card.Title>
              
              <div className="table-responsive">
                <Table className="table-dark table-borderless align-middle">
                  <thead>
                    <tr className="text-muted">
                      <th>Month</th>
                      <th>Health Score</th>
                      <th>DTI Ratio</th>
                      <th>Credit Utilization</th>
                      <th>Missed Payments</th>
                      <th>Status</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyReports.map((report, index) => (
                      <tr key={index} className="slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        <td>{report.month}</td>
                        <td>
                          <span className="fw-bold">{report.healthScore}</span>
                        </td>
                        <td>{(report.debtToIncomeRatio * 100).toFixed(1)}%</td>
                        <td>{(report.creditUtilization * 100).toFixed(1)}%</td>
                        <td>{report.missedPayments}</td>
                        <td>
                          {report.healthScore >= 80 ? (
                            <Badge bg="success" className="rounded-pill">Excellent</Badge>
                          ) : report.healthScore >= 60 ? (
                            <Badge bg="info" className="rounded-pill">Good</Badge>
                          ) : report.healthScore >= 40 ? (
                            <Badge bg="warning" className="rounded-pill">Fair</Badge>
                          ) : (
                            <Badge bg="danger" className="rounded-pill">Poor</Badge>
                          )}
                        </td>
                        <td>
                          <small>{report.notes}</small>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MonthlyReports;