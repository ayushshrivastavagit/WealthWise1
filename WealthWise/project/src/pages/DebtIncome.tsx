import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, ProgressBar } from 'react-bootstrap';
import { Wallet, Info, Save } from 'lucide-react';
import { useFinancialData } from '../context/FinancialDataContext';

const DebtIncome: React.FC = () => {
  const { debtIncomeData, updateDebtIncomeData } = useFinancialData();
  const [formData, setFormData] = useState({ ...debtIncomeData });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value) || 0
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateDebtIncomeData(formData);
    alert('Debt-to-income data updated successfully!');
  };
  
  const calculateTotal = () => {
    return formData.mortgagePayment + 
           formData.carPayment + 
           formData.creditCardPayment + 
           formData.studentLoanPayment + 
           formData.otherDebtPayment;
  };
  
  const calculateRatio = () => {
    return formData.monthlyIncome > 0 
      ? calculateTotal() / formData.monthlyIncome 
      : 0;
  };
  
  const ratio = calculateRatio();
  const total = calculateTotal();
  
  const getRatioStatus = () => {
    if (ratio <= 0.28) return { text: 'Excellent', color: 'success' };
    if (ratio <= 0.36) return { text: 'Good', color: 'info' };
    if (ratio <= 0.43) return { text: 'Fair', color: 'warning' };
    return { text: 'High Risk', color: 'danger' };
  };
  
  const status = getRatioStatus();
  
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold">Debt-to-Income Ratio</h1>
          <p className="text-muted">Track and manage your debt relative to your income</p>
        </Col>
      </Row>
      
      <Row className="g-4">
        <Col lg={8}>
          <Card className="glass-card fade-in">
            <Card.Body>
              <Card.Title className="mb-4">Update Your Financial Information</Card.Title>
              
              <Form onSubmit={handleSubmit}>
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Monthly Income</Form.Label>
                      <Form.Control 
                        type="number" 
                        name="monthlyIncome"
                        value={formData.monthlyIncome}
                        onChange={handleChange}
                        className="bg-dark text-light border-secondary"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <h6 className="mb-3">Monthly Debt Payments</h6>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Mortgage/Rent</Form.Label>
                      <Form.Control 
                        type="number" 
                        name="mortgagePayment"
                        value={formData.mortgagePayment}
                        onChange={handleChange}
                        className="bg-dark text-light border-secondary"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Car Loan/Lease</Form.Label>
                      <Form.Control 
                        type="number" 
                        name="carPayment"
                        value={formData.carPayment}
                        onChange={handleChange}
                        className="bg-dark text-light border-secondary"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Credit Card Minimum Payments</Form.Label>
                      <Form.Control 
                        type="number" 
                        name="creditCardPayment"
                        value={formData.creditCardPayment}
                        onChange={handleChange}
                        className="bg-dark text-light border-secondary"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Student Loan Payments</Form.Label>
                      <Form.Control 
                        type="number" 
                        name="studentLoanPayment"
                        value={formData.studentLoanPayment}
                        onChange={handleChange}
                        className="bg-dark text-light border-secondary"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Other Debt Payments</Form.Label>
                      <Form.Control 
                        type="number" 
                        name="otherDebtPayment"
                        value={formData.otherDebtPayment}
                        onChange={handleChange}
                        className="bg-dark text-light border-secondary"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <div className="d-grid d-md-flex justify-content-md-end mt-4">
                  <Button type="submit" variant="primary" className="d-flex align-items-center">
                    <Save size={18} className="me-2" />
                    Save Changes
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="glass-card h-100 fade-in">
            <Card.Body>
              <Card.Title className="mb-4">Debt-to-Income Summary</Card.Title>
              
              <div className="text-center mb-4">
                <div className="health-score mb-3">
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
                      stroke={`var(--${status.color})`}
                      strokeWidth="20"
                      strokeDasharray={`${Math.min(ratio * 3, 1) * 502} 502`}
                      strokeDashoffset="0"
                      strokeLinecap="round"
                      transform="rotate(-90 100 100)"
                    />
                  </svg>
                  <div className="score-value">{(ratio * 100).toFixed(1)}%</div>
                  <div className="score-label">DTI Ratio</div>
                </div>
                
                <div className={`badge bg-${status.color} px-3 py-2 fs-6`}>
                  {status.text}
                </div>
              </div>
              
              <div className="mt-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Total Monthly Debt</span>
                  <span className="fw-bold">${total.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Monthly Income</span>
                  <span className="fw-bold">${formData.monthlyIncome.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="alert bg-dark bg-opacity-50 border-info mt-4">
                <div className="d-flex">
                  <Info size={24} className="text-info me-3" />
                  <div>
                    <h6 className="text-info">What is a good DTI ratio?</h6>
                    <p className="small mb-0">
                      Lenders typically prefer a DTI ratio of 36% or less. A ratio above 43% may make it difficult to qualify for loans.
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mt-4">
        <Col>
          <Card className="glass-card fade-in">
            <Card.Body>
              <Card.Title className="mb-4">Debt Breakdown</Card.Title>
              
              <Row>
                {[
                  { name: "Mortgage/Rent", value: formData.mortgagePayment, color: "primary" },
                  { name: "Car Loan/Lease", value: formData.carPayment, color: "info" },
                  { name: "Credit Cards", value: formData.creditCardPayment, color: "success" },
                  { name: "Student Loans", value: formData.studentLoanPayment, color: "warning" },
                  { name: "Other Debt", value: formData.otherDebtPayment, color: "danger" }
                ].map((debt, index) => (
                  <Col md={6} key={index} className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <div className="d-flex align-items-center">
                        <div className={`rounded-circle p-2 me-2 bg-${debt.color} bg-opacity-25`}>
                          <Wallet size={16} className={`text-${debt.color}`} />
                        </div>
                        <span>{debt.name}</span>
                      </div>
                      <span className="fw-bold">${debt.value.toFixed(2)}</span>
                    </div>
                    <ProgressBar 
                      now={total > 0 ? (debt.value / total) * 100 : 0} 
                      variant={debt.color as 'primary' | 'info' | 'success' | 'warning' | 'danger'} 
                    />
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DebtIncome;