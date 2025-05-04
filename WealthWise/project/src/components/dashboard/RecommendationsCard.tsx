import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Lightbulb, ChevronRight } from 'lucide-react';
import { useFinancialData } from '../../context/FinancialDataContext';

const RecommendationsCard: React.FC = () => {
  const { 
    calculateDebtToIncomeRatio, 
    calculateCreditUtilization,
    paymentHistory,
    creditCards
  } = useFinancialData();
  
  const dtiRatio = calculateDebtToIncomeRatio();
  const creditUtilization = calculateCreditUtilization();
  const hasMissedPayments = paymentHistory.some(p => p.isLate);
  
  // Generate personalized recommendations based on user's financial data
  const getRecommendations = () => {
    const recommendations = [];
    
    // DTI recommendations
    if (dtiRatio > 0.43) {
      recommendations.push({
        title: "Reduce your debt-to-income ratio",
        description: "Your DTI ratio is above the recommended 43%. Consider paying down debt or increasing income.",
        priority: "high"
      });
    } else if (dtiRatio > 0.36) {
      recommendations.push({
        title: "Work on lowering your debt-to-income ratio",
        description: "Try to reduce your DTI ratio below 36% for better financial health.",
        priority: "medium"
      });
    }
    
    // Credit utilization recommendations
    if (creditUtilization > 0.3) {
      recommendations.push({
        title: "Lower your credit card utilization",
        description: "Aim to keep credit utilization below 30% to improve your credit score.",
        priority: creditUtilization > 0.5 ? "high" : "medium"
      });
    }
    
    // Payment history recommendations
    if (hasMissedPayments) {
      recommendations.push({
        title: "Set up automatic payments",
        description: "Consider setting up automatic payments to avoid missing future payments.",
        priority: "high"
      });
    }
    
    // High interest cards
    const highestBalanceCard = [...creditCards].sort((a, b) => b.balance - a.balance)[0];
    if (highestBalanceCard && highestBalanceCard.balance > 1000) {
      recommendations.push({
        title: `Pay down ${highestBalanceCard.name}`,
        description: "Focus on paying down your highest balance card to reduce interest payments.",
        priority: "medium"
      });
    }
    
    // If all looks good
    if (recommendations.length === 0) {
      recommendations.push({
        title: "Keep up the good work!",
        description: "Your financial health looks good. Consider setting up an emergency fund if you haven't already.",
        priority: "low"
      });
    }
    
    return recommendations.slice(0, 3); // Return top 3 recommendations
  };

  const recommendations = getRecommendations();

  return (
    <Card className="glass-card h-100 fade-in">
      <Card.Body>
        <Card.Title>
          <h5>Personalized Recommendations</h5>
        </Card.Title>
        
        <div className="mt-3">
          {recommendations.map((rec, index) => (
            <div 
              key={index} 
              className={`p-3 mb-3 rounded bg-${rec.priority === 'high' ? 'danger' : rec.priority === 'medium' ? 'warning' : 'success'} bg-opacity-15 slide-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="d-flex">
                <div className="me-3">
                  <div className={`rounded-circle p-2 bg-${rec.priority === 'high' ? 'danger' : rec.priority === 'medium' ? 'warning' : 'success'} bg-opacity-25`}>
                    <Lightbulb size={20} className={`text-${rec.priority === 'high' ? 'danger' : rec.priority === 'medium' ? 'warning' : 'success'}`} />
                  </div>
                </div>
                <div>
                  <h6>{rec.title}</h6>
                  <p className="mb-2 small text-light">{rec.description}</p>
                  <Button variant="link" className="p-0 text-info">Learn more <ChevronRight size={16} /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default RecommendationsCard;