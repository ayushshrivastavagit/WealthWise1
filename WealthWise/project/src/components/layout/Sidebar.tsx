import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  CreditCard, 
  Clock, 
  FileBarChart2, 
  Target, 
  Settings 
} from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar py-4">
      <Nav className="flex-column">
        <div className="px-4 mb-4">
          <div className="text-uppercase text-muted small mb-3">Main</div>
          <Nav.Item>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `nav-link d-flex align-items-center py-2 px-3 rounded ${isActive ? 'bg-primary' : ''}`
              }
              end
            >
              <LayoutDashboard size={18} className="me-3" />
              Dashboard
            </NavLink>
          </Nav.Item>
        </div>
        
        <div className="px-4 mb-4">
          <div className="text-uppercase text-muted small mb-3">Finance</div>
          <Nav.Item>
            <NavLink 
              to="/debt-income" 
              className={({ isActive }) => 
                `nav-link d-flex align-items-center py-2 px-3 rounded ${isActive ? 'bg-primary' : ''}`
              }
            >
              <Wallet size={18} className="me-3" />
              Debt-to-Income
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink 
              to="/credit-utilization" 
              className={({ isActive }) => 
                `nav-link d-flex align-items-center py-2 px-3 rounded ${isActive ? 'bg-primary' : ''}`
              }
            >
              <CreditCard size={18} className="me-3" />
              Credit Utilization
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink 
              to="/payment-history" 
              className={({ isActive }) => 
                `nav-link d-flex align-items-center py-2 px-3 rounded ${isActive ? 'bg-primary' : ''}`
              }
            >
              <Clock size={18} className="me-3" />
              Payment History
            </NavLink>
          </Nav.Item>
        </div>
        
        <div className="px-4 mb-4">
          <div className="text-uppercase text-muted small mb-3">Reports</div>
          <Nav.Item>
            <NavLink 
              to="/monthly-reports" 
              className={({ isActive }) => 
                `nav-link d-flex align-items-center py-2 px-3 rounded ${isActive ? 'bg-primary' : ''}`
              }
            >
              <FileBarChart2 size={18} className="me-3" />
              Monthly Reports
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink 
              to="/goals" 
              className={({ isActive }) => 
                `nav-link d-flex align-items-center py-2 px-3 rounded ${isActive ? 'bg-primary' : ''}`
              }
            >
              <Target size={18} className="me-3" />
              Financial Goals
            </NavLink>
          </Nav.Item>
        </div>
        
        <div className="px-4">
          <div className="text-uppercase text-muted small mb-3">Other</div>
          <Nav.Item>
            <NavLink 
              to="/settings" 
              className={({ isActive }) => 
                `nav-link d-flex align-items-center py-2 px-3 rounded ${isActive ? 'bg-primary' : ''}`
              }
            >
              <Settings size={18} className="me-3" />
              Settings
            </NavLink>
          </Nav.Item>
        </div>
      </Nav>
      
      <div className="mt-5 px-4">
        <div className="glass-card p-3">
          <h6 className="mb-2">Need Help?</h6>
          <p className="small mb-3">Speak with a financial advisor for personalized guidance.</p>
          <button className="btn btn-info btn-sm w-100">Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;