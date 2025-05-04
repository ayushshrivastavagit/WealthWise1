import React, { useState } from 'react';
import { Container, Row, Col, Card, ProgressBar, Button, Form, Modal } from 'react-bootstrap';
import { Target, Edit, Trash2, Plus, Calendar, DollarSign } from 'lucide-react';
import { useFinancialData } from '../context/FinancialDataContext';
import { FinancialGoal } from '../context/FinancialDataContext';

const Goals: React.FC = () => {
  const { goals, addGoal, updateGoal, deleteGoal } = useFinancialData();
  const [showModal, setShowModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<FinancialGoal | null>(null);
  const [formData, setFormData] = useState<FinancialGoal>({
    id: '',
    name: '',
    currentAmount: 0,
    targetAmount: 0,
    deadline: '',
    category: 'Savings'
  });
  
  const openAddModal = () => {
    setEditingGoal(null);
    setFormData({
      id: Date.now().toString(),
      name: '',
      currentAmount: 0,
      targetAmount: 0,
      deadline: new Date().toISOString().split('T')[0],
      category: 'Savings'
    });
    setShowModal(true);
  };
  
  const openEditModal = (goal: FinancialGoal) => {
    setEditingGoal(goal);
    setFormData({ ...goal });
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
  };
  
  const handleChange = (field: keyof FinancialGoal, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const saveGoal = () => {
    if (formData.name.trim() === '') {
      alert('Please enter a goal name');
      return;
    }
    
    if (formData.targetAmount <= 0) {
      alert('Target amount must be greater than zero');
      return;
    }
    
    if (editingGoal) {
      updateGoal(editingGoal.id, formData);
    } else {
      addGoal(formData);
    }
    
    closeModal();
  };
  
  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };
  
  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'success';
    if (progress >= 50) return 'info';
    if (progress >= 25) return 'warning';
    return 'danger';
  };
  
  // Group goals by category
  const categorizedGoals: { [key: string]: FinancialGoal[] } = {};
  goals.forEach(goal => {
    if (!categorizedGoals[goal.category]) {
      categorizedGoals[goal.category] = [];
    }
    categorizedGoals[goal.category].push(goal);
  });

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold">Financial Goals</h1>
          <p className="text-muted">Set and track your personal financial goals</p>
        </Col>
        <Col xs="auto">
          <Button 
            variant="primary" 
            onClick={openAddModal}
            className="d-flex align-items-center"
          >
            <Plus size={18} className="me-2" />
            Add Goal
          </Button>
        </Col>
      </Row>
      
      {Object.entries(categorizedGoals).map(([category, categoryGoals]) => (
        <div key={category}>
          <h4 className="text-light mt-4 mb-3">{category}</h4>
          <Row className="g-4 mb-4">
            {categoryGoals.map((goal, index) => {
              const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
              const daysRemaining = getDaysRemaining(goal.deadline);
              const progressColor = getProgressColor(progress);
              
              return (
                <Col lg={4} md={6} key={goal.id} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Card className="glass-card h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="d-flex align-items-center">
                          <div className={`rounded-circle p-2 me-3 bg-${progressColor} bg-opacity-25`}>
                            <Target size={20} className={`text-${progressColor}`} />
                          </div>
                          <h5 className="m-0">{goal.name}</h5>
                        </div>
                        <div>
                          <Button 
                            variant="link" 
                            className="p-1 text-light"
                            onClick={() => openEditModal(goal)}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="link" 
                            className="p-1 text-danger"
                            onClick={() => deleteGoal(goal.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span className="small">Progress: {progress.toFixed(0)}%</span>
                          <span className="fw-medium">
                            ${goal.currentAmount.toFixed(0)} / ${goal.targetAmount.toFixed(0)}
                          </span>
                        </div>
                        <ProgressBar 
                          now={progress} 
                          variant={progressColor} 
                        />
                      </div>
                      
                      <div className="d-flex justify-content-between mb-3">
                        <div className="d-flex align-items-center small">
                          <Calendar size={14} className="me-1" />
                          <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                        </div>
                        <div className={`badge ${daysRemaining > 30 ? 'bg-success' : 'bg-warning'}`}>
                          {daysRemaining} days left
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between mt-4 text-muted small">
                        <div>Monthly needed:</div>
                        <div className="fw-bold">
                          ${daysRemaining > 0 ? ((goal.targetAmount - goal.currentAmount) / (daysRemaining / 30)).toFixed(2) : 0}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      ))}
      
      {/* Goal Form Modal */}
      <Modal show={showModal} onHide={closeModal} centered backdrop="static" className="text-dark">
        <Modal.Header closeButton>
          <Modal.Title>{editingGoal ? 'Edit Goal' : 'Add New Goal'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Goal Name</Form.Label>
              <Form.Control 
                type="text" 
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g., Emergency Fund, Pay off Credit Card"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                <option value="Savings">Savings</option>
                <option value="Debt Payoff">Debt Payoff</option>
                <option value="Investment">Investment</option>
                <option value="Purchase">Major Purchase</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Current Amount</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <Form.Control 
                      type="number" 
                      value={formData.currentAmount}
                      onChange={(e) => handleChange('currentAmount', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Target Amount</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <Form.Control 
                      type="number" 
                      value={formData.targetAmount}
                      onChange={(e) => handleChange('targetAmount', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Deadline</Form.Label>
              <Form.Control 
                type="date" 
                value={formData.deadline}
                onChange={(e) => handleChange('deadline', e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveGoal}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Add a card for completed goals if needed */}
    </Container>
  );
};

export default Goals;