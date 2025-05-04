import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { useFinancialData } from '../../context/FinancialDataContext';

const FinancialMetricsCard: React.FC = () => {
  const { 
    calculateDebtToIncomeRatio, 
    calculateCreditUtilization,
    paymentHistory
  } = useFinancialData();
  
  const dtiRatio = calculateDebtToIncomeRatio();
  const creditUtilization = calculateCreditUtilization();
  const missedPaymentsCount = paymentHistory.filter(p => p.isLate).length;
  
  const getDTIStatus = (ratio: number) => {
    if (ratio <= 0.28) return { color: 'success', icon: <TrendingDown size={24} />, text: 'Good' };
    if (ratio <= 0.36) return { color: 'warning', icon: <AlertTriangle size={24} />, text: 'Fair' };
    return { color: 'danger', icon: <TrendingUp size={24} />, text: 'High' };
  };
  
  const getCreditUtilizationStatus = (ratio: number) => {
    if (ratio <= 0.3) return { color: 'success', icon: <TrendingDown size={24} />, text: 'Good' };
    if (ratio <= 0.5) return { color: 'warning', icon: <AlertTriangle size={24} />, text: 'Fair' };
    return { color: 'danger', icon: <TrendingUp size={24} />, text: 'High' };
  };
  
  const getMissedPaymentsStatus = (count: number) => {
    if (count === 0) return { color: 'success', icon: <TrendingDown size={24} />, text: 'Perfect' };
    if (count <= 2) return { color: 'warning', icon: <AlertTriangle size={24} />, text: 'Fair' };
    return { color: 'danger', icon: <TrendingUp size={24} />, text: 'Poor' };
  };
  
  const dtiStatus = getDTIStatus(dtiRatio);
  const utilizationStatus = getCreditUtilizationStatus(creditUtilization);
  const paymentsStatus = getMissedPaymentsStatus(missedPaymentsCount);

  return (
    <Card className="glass-card h-100 fade-in">
      <Card.Body>
        <Card.Title>
          <h5>Key Financial Metrics</h5>
        </Card.Title>
        
        <Row className="g-3 mt-2">
          <Col md={4} className="slide-in" style={{ animationDelay: '0.1s' }}>
            <Card className="bg-dark bg-opacity-50 border-0">
              <Card.Body className="p-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="m-0">Debt-to-Income</h6>
                  <div className={`text-${dtiStatus.color}`}>
                    {dtiStatus.icon}
                  </div>
                </div>
                <h3 className="mb-1">{(dtiRatio * 100).toFixed(1)}%</h3>
                <div className={`badge bg-${dtiStatus.color} bg-opacity-25 text-${dtiStatus.color}`}>
                  {dtiStatus.text}
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4} className="slide-in" style={{ animationDelay: '0.2s' }}>
            <Card className="bg-dark bg-opacity-50 border-0">
              <Card.Body className="p-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="m-0">Credit Utilization</h6>
                  <div className={`text-${utilizationStatus.color}`}>
                    {utilizationStatus.icon}
                  </div>
                </div>
                <h3 className="mb-1">{(creditUtilization * 100).toFixed(1)}%</h3>
                <div className={`badge bg-${utilizationStatus.color} bg-opacity-25 text-${utilizationStatus.color}`}>
                  {utilizationStatus.text}
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4} className="slide-in" style={{ animationDelay: '0.3s' }}>
            <Card className="bg-dark bg-opacity-50 border-0">
              <Card.Body className="p-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="m-0">Missed Payments</h6>
                  <div className={`text-${paymentsStatus.color}`}>
                    {paymentsStatus.icon}
                  </div>
                </div>
                <h3 className="mb-1">{missedPaymentsCount}</h3>
                <div className={`badge bg-${paymentsStatus.color} bg-opacity-25 text-${paymentsStatus.color}`}>
                  {paymentsStatus.text}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default FinancialMetricsCard;