import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Badge, Form, Button, Modal } from 'react-bootstrap';
import { Calendar, Check, X, Plus, Edit, Clock } from 'lucide-react';
import { useFinancialData } from '../context/FinancialDataContext';
import { PaymentRecord } from '../context/FinancialDataContext';

const PaymentHistory: React.FC = () => {
  const { paymentHistory, addPaymentRecord, updatePaymentRecord } = useFinancialData();
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [paymentRecord, setPaymentRecord] = useState<PaymentRecord>({
    date: new Date().toISOString().split('T')[0],
    accountName: '',
    amount: 0,
    dueDate: new Date().toISOString().split('T')[0],
    isPaid: false,
    isLate: false
  });
  
  const handleChange = (field: keyof PaymentRecord, value: string | number | boolean) => {
    setPaymentRecord({
      ...paymentRecord,
      [field]: value
    });
  };
  
  const openAddModal = () => {
    setEditIndex(null);
    setPaymentRecord({
      date: new Date().toISOString().split('T')[0],
      accountName: '',
      amount: 0,
      dueDate: new Date().toISOString().split('T')[0],
      isPaid: false,
      isLate: false
    });
    setShowModal(true);
  };
  
  const openEditModal = (index: number) => {
    setEditIndex(index);
    setPaymentRecord({ ...paymentHistory[index] });
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
  };
  
  const savePayment = () => {
    if (paymentRecord.accountName.trim() === '') {
      alert('Please enter an account name');
      return;
    }
    
    if (editIndex !== null) {
      updatePaymentRecord(editIndex, paymentRecord);
    } else {
      addPaymentRecord(paymentRecord);
    }
    
    closeModal();
  };
  
  // Sort payments by date with most recent first
  const sortedPayments = [...paymentHistory].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Count metrics
  const totalPayments = paymentHistory.length;
  const onTimePayments = paymentHistory.filter(p => p.isPaid && !p.isLate).length;
  const latePayments = paymentHistory.filter(p => p.isLate).length;
  const missedPayments = paymentHistory.filter(p => !p.isPaid && new Date(p.dueDate) < new Date()).length;
  
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold">Payment History</h1>
          <p className="text-muted">Track your bill payments and payment history</p>
        </Col>
        <Col xs="auto">
          <Button 
            variant="primary" 
            onClick={openAddModal}
            className="d-flex align-items-center"
          >
            <Plus size={18} className="me-2" />
            Add Payment
          </Button>
        </Col>
      </Row>
      
      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card className="glass-card text-center fade-in">
            <Card.Body>
              <div className="rounded-circle bg-primary bg-opacity-25 mx-auto p-3 mb-3" style={{ width: 'fit-content' }}>
                <Calendar size={28} className="text-primary" />
              </div>
              <h2 className="fw-bold">{totalPayments}</h2>
              <p className="text-muted">Total Payments</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="glass-card text-center fade-in">
            <Card.Body>
              <div className="rounded-circle bg-success bg-opacity-25 mx-auto p-3 mb-3" style={{ width: 'fit-content' }}>
                <Check size={28} className="text-success" />
              </div>
              <h2 className="fw-bold">{onTimePayments}</h2>
              <p className="text-muted">On-Time Payments</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="glass-card text-center fade-in">
            <Card.Body>
              <div className="rounded-circle bg-warning bg-opacity-25 mx-auto p-3 mb-3" style={{ width: 'fit-content' }}>
                <Clock size={28} className="text-warning" />
              </div>
              <h2 className="fw-bold">{latePayments}</h2>
              <p className="text-muted">Late Payments</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="glass-card text-center fade-in">
            <Card.Body>
              <div className="rounded-circle bg-danger bg-opacity-25 mx-auto p-3 mb-3" style={{ width: 'fit-content' }}>
                <X size={28} className="text-danger" />
              </div>
              <h2 className="fw-bold">{missedPayments}</h2>
              <p className="text-muted">Missed Payments</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <Card className="glass-card fade-in">
            <Card.Body>
              <Card.Title className="mb-4">Payment Records</Card.Title>
              
              <div className="table-responsive">
                <Table className="table-dark table-borderless align-middle">
                  <thead>
                    <tr className="text-muted">
                      <th>Account</th>
                      <th>Due Date</th>
                      <th>Amount</th>
                      <th>Payment Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedPayments.map((payment, index) => (
                      <tr key={index} className="slide-in" style={{ animationDelay: `${index * 0.05}s` }}>
                        <td>{payment.accountName}</td>
                        <td>{new Date(payment.dueDate).toLocaleDateString()}</td>
                        <td>${payment.amount.toFixed(2)}</td>
                        <td>
                          {payment.isPaid ? new Date(payment.date).toLocaleDateString() : '-'}
                        </td>
                        <td>
                          {payment.isPaid ? (
                            payment.isLate ? (
                              <Badge bg="warning" className="rounded-pill">Paid Late</Badge>
                            ) : (
                              <Badge bg="success" className="rounded-pill">Paid On Time</Badge>
                            )
                          ) : (
                            new Date(payment.dueDate) < new Date() ? (
                              <Badge bg="danger" className="rounded-pill">Missed</Badge>
                            ) : (
                              <Badge bg="secondary" className="rounded-pill">Upcoming</Badge>
                            )
                          )}
                        </td>
                        <td>
                          <Button 
                            variant="outline-light" 
                            size="sm"
                            onClick={() => openEditModal(index)}
                            className="p-1"
                          >
                            <Edit size={16} />
                          </Button>
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
      
      {/* Add/Edit Payment Modal */}
      <Modal show={showModal} onHide={closeModal} centered backdrop="static" className="text-dark">
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Edit Payment' : 'Add New Payment'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Account Name</Form.Label>
              <Form.Control 
                type="text" 
                value={paymentRecord.accountName}
                onChange={(e) => handleChange('accountName', e.target.value)}
                placeholder="e.g., Mortgage, Car Payment"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control 
                type="number" 
                value={paymentRecord.amount}
                onChange={(e) => handleChange('amount', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control 
                type="date" 
                value={paymentRecord.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Check 
                type="switch"
                id="isPaid"
                label="Payment Made"
                checked={paymentRecord.isPaid}
                onChange={(e) => handleChange('isPaid', e.target.checked)}
              />
            </Form.Group>
            
            {paymentRecord.isPaid && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Payment Date</Form.Label>
                  <Form.Control 
                    type="date" 
                    value={paymentRecord.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Check 
                    type="switch"
                    id="isLate"
                    label="Was payment late?"
                    checked={paymentRecord.isLate}
                    onChange={(e) => handleChange('isLate', e.target.checked)}
                  />
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={savePayment}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PaymentHistory;