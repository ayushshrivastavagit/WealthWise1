import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, ProgressBar } from 'react-bootstrap';
import { CreditCard, Plus, Trash2, PieChart } from 'lucide-react';
import { useFinancialData } from '../context/FinancialDataContext';
import { CreditUtilization } from '../context/FinancialDataContext';

const CreditUtilizationPage: React.FC = () => {
  const { creditCards, updateCreditCards } = useFinancialData();
  const [cards, setCards] = useState<CreditUtilization[]>([...creditCards]);
  const [newCard, setNewCard] = useState<CreditUtilization>({ name: '', limit: 0, balance: 0 });
  
  const handleCardChange = (index: number, field: keyof CreditUtilization, value: string | number) => {
    const updatedCards = [...cards];
    
    if (field === 'name') {
      updatedCards[index][field] = value as string;
    } else {
      updatedCards[index][field] = parseFloat(value as string) || 0;
    }
    
    setCards(updatedCards);
  };
  
  const handleNewCardChange = (field: keyof CreditUtilization, value: string | number) => {
    const updatedCard = { ...newCard };
    
    if (field === 'name') {
      updatedCard[field] = value as string;
    } else {
      updatedCard[field] = parseFloat(value as string) || 0;
    }
    
    setNewCard(updatedCard);
  };
  
  const addCard = () => {
    if (newCard.name.trim() === '') {
      alert('Please enter a card name');
      return;
    }
    
    setCards([...cards, { ...newCard }]);
    setNewCard({ name: '', limit: 0, balance: 0 });
  };
  
  const removeCard = (index: number) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
  };
  
  const saveChanges = () => {
    updateCreditCards(cards);
    alert('Credit card information updated successfully!');
  };
  
  const calculateTotalLimit = () => {
    return cards.reduce((sum, card) => sum + card.limit, 0);
  };
  
  const calculateTotalBalance = () => {
    return cards.reduce((sum, card) => sum + card.balance, 0);
  };
  
  const calculateUtilization = () => {
    const totalLimit = calculateTotalLimit();
    const totalBalance = calculateTotalBalance();
    
    return totalLimit > 0 ? totalBalance / totalLimit : 0;
  };
  
  const calculateCardUtilization = (card: CreditUtilization) => {
    return card.limit > 0 ? card.balance / card.limit : 0;
  };
  
  const getUtilizationColor = (ratio: number) => {
    if (ratio <= 0.3) return 'success';
    if (ratio <= 0.5) return 'warning';
    return 'danger';
  };
  
  const totalLimit = calculateTotalLimit();
  const totalBalance = calculateTotalBalance();
  const utilization = calculateUtilization();
  const utilizationColor = getUtilizationColor(utilization);

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold">Credit Card Utilization</h1>
          <p className="text-muted">Track and manage your credit card utilization ratio</p>
        </Col>
      </Row>
      
      <Row className="g-4">
        <Col lg={8}>
          <Card className="glass-card fade-in">
            <Card.Body>
              <Card.Title className="mb-4">Your Credit Cards</Card.Title>
              
              {cards.map((card, index) => (
                <div key={index} className="p-3 mb-3 border border-secondary rounded slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Row>
                    <Col md={5}>
                      <Form.Group className="mb-3">
                        <Form.Label>Card Name</Form.Label>
                        <Form.Control 
                          type="text" 
                          value={card.name}
                          onChange={(e) => handleCardChange(index, 'name', e.target.value)}
                          className="bg-dark text-light border-secondary"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Credit Limit</Form.Label>
                        <Form.Control 
                          type="number" 
                          value={card.limit}
                          onChange={(e) => handleCardChange(index, 'limit', e.target.value)}
                          className="bg-dark text-light border-secondary"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Current Balance</Form.Label>
                        <Form.Control 
                          type="number" 
                          value={card.balance}
                          onChange={(e) => handleCardChange(index, 'balance', e.target.value)}
                          className="bg-dark text-light border-secondary"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={1} className="d-flex align-items-end justify-content-center mb-3">
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => removeCard(index)}
                        className="p-2"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </Col>
                  </Row>
                  
                  <div className="mt-2">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <small>Utilization: {(calculateCardUtilization(card) * 100).toFixed(1)}%</small>
                      <div className="d-flex align-items-center">
                        <small className="me-2">${card.balance} of ${card.limit}</small>
                        <small className={`badge bg-${getUtilizationColor(calculateCardUtilization(card))}`}>
                          {calculateCardUtilization(card) <= 0.3 ? 'Good' : calculateCardUtilization(card) <= 0.5 ? 'Fair' : 'High'}
                        </small>
                      </div>
                    </div>
                    <ProgressBar 
                      now={calculateCardUtilization(card) * 100} 
                      variant={getUtilizationColor(calculateCardUtilization(card))} 
                    />
                  </div>
                </div>
              ))}
              
              <div className="p-3 mb-3 border border-secondary rounded fade-in">
                <h6 className="mb-3">Add New Card</h6>
                <Row>
                  <Col md={5}>
                    <Form.Group className="mb-3">
                      <Form.Label>Card Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={newCard.name}
                        onChange={(e) => handleNewCardChange('name', e.target.value)}
                        placeholder="e.g., Visa Signature"
                        className="bg-dark text-light border-secondary"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Credit Limit</Form.Label>
                      <Form.Control 
                        type="number" 
                        value={newCard.limit || ''}
                        onChange={(e) => handleNewCardChange('limit', e.target.value)}
                        placeholder="5000"
                        className="bg-dark text-light border-secondary"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Current Balance</Form.Label>
                      <Form.Control 
                        type="number" 
                        value={newCard.balance || ''}
                        onChange={(e) => handleNewCardChange('balance', e.target.value)}
                        placeholder="1500"
                        className="bg-dark text-light border-secondary"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={1} className="d-flex align-items-end justify-content-center mb-3">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={addCard}
                      className="p-2"
                    >
                      <Plus size={16} />
                    </Button>
                  </Col>
                </Row>
              </div>
              
              <div className="d-grid d-md-flex justify-content-md-end mt-4">
                <Button 
                  variant="primary" 
                  onClick={saveChanges}
                  className="d-flex align-items-center"
                >
                  <CreditCard size={18} className="me-2" />
                  Save Changes
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="glass-card h-100 fade-in">
            <Card.Body>
              <Card.Title className="mb-4">Overall Utilization</Card.Title>
              
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
                      stroke={`var(--${utilizationColor})`}
                      strokeWidth="20"
                      strokeDasharray={`${utilization * 502} 502`}
                      strokeDashoffset="0"
                      strokeLinecap="round"
                      transform="rotate(-90 100 100)"
                    />
                  </svg>
                  <div className="score-value">{(utilization * 100).toFixed(1)}%</div>
                  <div className="score-label">Credit Utilization</div>
                </div>
                
                <div className={`badge bg-${utilizationColor} px-3 py-2 fs-6`}>
                  {utilization <= 0.3 ? 'Good' : utilization <= 0.5 ? 'Fair' : 'High'}
                </div>
              </div>
              
              <div className="mt-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Total Credit Limit</span>
                  <span className="fw-bold">${totalLimit.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Total Balance</span>
                  <span className="fw-bold">${totalBalance.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Available Credit</span>
                  <span className="fw-bold">${(totalLimit - totalBalance).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="alert bg-dark bg-opacity-50 border-info mt-4">
                <div className="d-flex">
                  <PieChart size={24} className="text-info me-3" />
                  <div>
                    <h6 className="text-info">What is Credit Utilization?</h6>
                    <p className="small mb-0">
                      Credit utilization is the ratio of your current credit card balances to your credit limits. Experts recommend keeping it below 30% for the best impact on your credit score.
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreditUtilizationPage;