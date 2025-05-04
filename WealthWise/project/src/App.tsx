import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavbarComponent from './components/layout/NavbarComponent';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import DebtIncome from './pages/DebtIncome';
import CreditUtilization from './pages/CreditUtilization';
import PaymentHistory from './pages/PaymentHistory';
import MonthlyReports from './pages/MonthlyReports';
import Goals from './pages/Goals';
import Settings from './pages/Settings';
import Footer from './components/layout/Footer';
import { FinancialDataProvider } from './context/FinancialDataContext';
import './styles/App.scss';

function App() {
  return (
    <FinancialDataProvider>
      <Router>
        <div className="app-container d-flex flex-column min-vh-100">
          <NavbarComponent />
          <Container fluid className="flex-grow-1 p-0">
            <div className="d-flex flex-grow-1">
              <Sidebar />
              <main className="content-area flex-grow-1 p-4">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/debt-income" element={<DebtIncome />} />
                  <Route path="/credit-utilization" element={<CreditUtilization />} />
                  <Route path="/payment-history" element={<PaymentHistory />} />
                  <Route path="/monthly-reports" element={<MonthlyReports />} />
                  <Route path="/goals" element={<Goals />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </main>
            </div>
          </Container>
          <Footer />
        </div>
      </Router>
    </FinancialDataProvider>
  );
}

export default App;