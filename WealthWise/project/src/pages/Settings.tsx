import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { UserCircle, Save, Bell, Shield, Download, FileText } from 'lucide-react';

const Settings: React.FC = () => {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567'
  });
  
  const [notification, setNotification] = useState({
    emailAlerts: true,
    paymentReminders: true,
    goalUpdates: true,
    monthlyReports: true,
    creditScoreChanges: true
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    dataSharing: false,
    analyticsOptIn: true
  });
  
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleProfileChange = (field: string, value: string) => {
    setProfileData({
      ...profileData,
      [field]: value
    });
  };
  
  const handleNotificationChange = (field: string, checked: boolean) => {
    setNotification({
      ...notification,
      [field]: checked
    });
  };
  
  const handlePrivacyChange = (field: string, checked: boolean) => {
    setPrivacySettings({
      ...privacySettings,
      [field]: checked
    });
  };
  
  const saveSettings = () => {
    // In a real app, this would save to a backend
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };
  
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold">Settings</h1>
          <p className="text-muted">Manage your account and preferences</p>
        </Col>
      </Row>
      
      {showSuccess && (
        <Row className="mb-4">
          <Col>
            <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
              Settings saved successfully!
            </Alert>
          </Col>
        </Row>
      )}
      
      <Row className="g-4">
        <Col lg={6}>
          <Card className="glass-card fade-in">
            <Card.Body>
              <Card.Title className="d-flex align-items-center mb-4">
                <UserCircle size={24} className="me-2 text-primary" />
                <span>Profile Information</span>
              </Card.Title>
              
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={profileData.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    className="bg-dark text-light border-secondary"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    value={profileData.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    className="bg-dark text-light border-secondary"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={profileData.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                    className="bg-dark text-light border-secondary"
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          
          <Card className="glass-card mt-4 fade-in">
            <Card.Body>
              <Card.Title className="d-flex align-items-center mb-4">
                <Shield size={24} className="me-2 text-primary" />
                <span>Privacy Settings</span>
              </Card.Title>
              
              <Form>
                <Form.Group className="mb-3">
                  <Form.Check 
                    type="switch"
                    id="dataSharing"
                    label="Share anonymous data to improve financial recommendations"
                    checked={privacySettings.dataSharing}
                    onChange={(e) => handlePrivacyChange('dataSharing', e.target.checked)}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Check 
                    type="switch"
                    id="analyticsOptIn"
                    label="Allow usage analytics to enhance your experience"
                    checked={privacySettings.analyticsOptIn}
                    onChange={(e) => handlePrivacyChange('analyticsOptIn', e.target.checked)}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={6}>
          <Card className="glass-card fade-in">
            <Card.Body>
              <Card.Title className="d-flex align-items-center mb-4">
                <Bell size={24} className="me-2 text-primary" />
                <span>Notification Preferences</span>
              </Card.Title>
              
              <Form>
                <Form.Group className="mb-3">
                  <Form.Check 
                    type="switch"
                    id="emailAlerts"
                    label="Email Alerts"
                    checked={notification.emailAlerts}
                    onChange={(e) => handleNotificationChange('emailAlerts', e.target.checked)}
                  />
                  <Form.Text className="text-muted">
                    Receive important alerts via email
                  </Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Check 
                    type="switch"
                    id="paymentReminders"
                    label="Payment Reminders"
                    checked={notification.paymentReminders}
                    onChange={(e) => handleNotificationChange('paymentReminders', e.target.checked)}
                  />
                  <Form.Text className="text-muted">
                    Get notified before payments are due
                  </Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Check 
                    type="switch"
                    id="goalUpdates"
                    label="Goal Updates"
                    checked={notification.goalUpdates}
                    onChange={(e) => handleNotificationChange('goalUpdates', e.target.checked)}
                  />
                  <Form.Text className="text-muted">
                    Progress updates on your financial goals
                  </Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Check 
                    type="switch"
                    id="monthlyReports"
                    label="Monthly Reports"
                    checked={notification.monthlyReports}
                    onChange={(e) => handleNotificationChange('monthlyReports', e.target.checked)}
                  />
                  <Form.Text className="text-muted">
                    Receive monthly financial health reports
                  </Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Check 
                    type="switch"
                    id="creditScoreChanges"
                    label="Credit Score Changes"
                    checked={notification.creditScoreChanges}
                    onChange={(e) => handleNotificationChange('creditScoreChanges', e.target.checked)}
                  />
                  <Form.Text className="text-muted">
                    Alerts when your credit score changes
                  </Form.Text>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          
          <Card className="glass-card mt-4 fade-in">
            <Card.Body>
              <Card.Title className="d-flex align-items-center mb-4">
                <FileText size={24} className="me-2 text-primary" />
                <span>Data Management</span>
              </Card.Title>
              
              <div className="d-grid gap-2">
                <Button variant="outline-info" className="d-flex align-items-center justify-content-center">
                  <Download size={18} className="me-2" />
                  Export Financial Data (CSV)
                </Button>
                
                <Button variant="outline-secondary" className="d-flex align-items-center justify-content-center">
                  <Download size={18} className="me-2" />
                  Download Monthly Reports (PDF)
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mt-4 mb-5">
        <Col className="d-flex justify-content-end">
          <Button variant="primary" onClick={saveSettings} className="d-flex align-items-center">
            <Save size={18} className="me-2" />
            Save All Settings
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;