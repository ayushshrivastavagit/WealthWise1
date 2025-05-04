import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import { useFinancialData } from '../../context/FinancialDataContext';

const FinancialHealthCard: React.FC = () => {
  const { calculateHealthScore } = useFinancialData();
  const healthScore = calculateHealthScore();
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'info';
    if (score >= 40) return 'warning';
    return 'danger';
  };
  
  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };
  
  const scoreColor = getScoreColor(healthScore);
  const scoreMessage = getScoreMessage(healthScore);

  return (
    <Card className="glass-card h-100 fade-in">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center mb-4">
          <h5>Financial Health Score</h5>
          <span className={`badge bg-${scoreColor}`}>{scoreMessage}</span>
        </Card.Title>
        
        <div className="health-score mb-4">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="20"
            />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke={`var(--${scoreColor})`}
              strokeWidth="20"
              strokeDasharray={`${(healthScore / 100) * 502} 502`}
              strokeDashoffset="0"
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
              style={{ transition: 'all 1s ease' }}
            />
          </svg>
          <div className="score-value">{healthScore}</div>
          <div className="score-label">Financial Health Score</div>
        </div>
        
        <div className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>Debt-to-Income Ratio</span>
            <span className="badge bg-secondary">35%</span>
          </div>
          <ProgressBar now={35} variant="info" className="mb-3" />
          
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>Credit Utilization</span>
            <span className="badge bg-secondary">30%</span>
          </div>
          <ProgressBar now={30} variant="primary" className="mb-3" />
          
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>Payment History</span>
            <span className="badge bg-secondary">35%</span>
          </div>
          <ProgressBar now={35} variant="success" className="mb-3" />
        </div>
      </Card.Body>
    </Card>
  );
};

export default FinancialHealthCard;