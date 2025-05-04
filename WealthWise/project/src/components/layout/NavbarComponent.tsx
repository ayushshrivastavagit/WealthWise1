import React, { useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronRight, Bell, User } from 'lucide-react';
import { useFinancialData } from '../../context/FinancialDataContext';

const NavbarComponent: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { calculateHealthScore } = useFinancialData();
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('show');
  };

  return (
    <Navbar expand="lg" variant="dark" className="navbar-dark py-2 sticky-top">
      <Container fluid>
        <div className="d-flex align-items-center">
          <Button 
            variant="link" 
            className="p-0 me-3 d-md-none text-light" 
            onClick={toggleSidebar}
          >
            {showSidebar ? <X size={24} /> : <Menu size={24} />}
          </Button>
          
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <div className="me-2 p-1 rounded" style={{ background: 'var(--primary)' }}>
              <ChevronRight size={22} className="text-white" />
            </div>
            <span className="fw-bold">WealthWise</span>
          </Navbar.Brand>
        </div>
        
        <div className="d-none d-md-flex align-items-center gap-2 me-2">
          <div className="px-3 py-1 rounded-pill" style={{ 
            background: 'rgba(16, 185, 129, 0.2)',
            border: '1px solid rgba(16, 185, 129, 0.4)'
          }}>
            <span className="text-success me-1">Health Score:</span>
            <span className="fw-bold">{calculateHealthScore()}</span>
          </div>
        </div>
        
        <Nav className="ms-auto">
          <div className="d-flex align-items-center">
            <Button variant="link" className="nav-link position-relative p-2">
              <Bell size={20} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                2
              </span>
            </Button>
            
            <Button 
              variant="link" 
              className="nav-link ms-2 d-flex align-items-center p-2"
              as={Link}
              to="/settings"
            >
              <div className="d-flex align-items-center justify-content-center rounded-circle bg-primary" 
                style={{ width: '32px', height: '32px' }}>
                <User size={18} />
              </div>
            </Button>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;