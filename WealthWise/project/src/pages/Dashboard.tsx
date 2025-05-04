import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FinancialHealthCard from '../components/dashboard/FinancialHealthCard';
import FinancialMetricsCard from '../components/dashboard/FinancialMetricsCard';
import RecentTransactionsCard from '../components/dashboard/RecentTransactionsCard';
import RecommendationsCard from '../components/dashboard/RecommendationsCard';
import { useFinancialData } from '../context/FinancialDataContext';

const Dashboard: React.FC = () => {
  const { calculateHealthScore } = useFinancialData();
  const healthScore = calculateHealthScore();
  
  return (
    <Container fluid>
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="fw-bold">Dashboard</h1>
          <p className="text-muted">Track and improve your financial health</p>
        </Col>
        <Col xs="auto">
          <div className="d-flex align-items-center">
            <div className="d-none d-md-block me-3">Your Financial Health:</div>
            <div className={`px-3 py-2 rounded-pill fw-bold ${
              healthScore >= 80 ? 'bg-success bg-opacity-25 text-success' :
              healthScore >= 60 ? 'bg-info bg-opacity-25 text-info' :
              healthScore >= 40 ? 'bg-warning bg-opacity-25 text-warning' :
              'bg-danger bg-opacity-25 text-danger'
            }`}>
              Score: {healthScore}
            </div>
          </div>
        </Col>
      </Row>
      
      <Row className="g-4 mb-4">
        <Col lg={4}>
          <FinancialHealthCard />
        </Col>
        <Col lg={8}>
          <FinancialMetricsCard />
        </Col>
      </Row>
      
      <Row className="g-4">
        <Col lg={8}>
          <RecentTransactionsCard />
        </Col>
        <Col lg={4}>
          <RecommendationsCard />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;