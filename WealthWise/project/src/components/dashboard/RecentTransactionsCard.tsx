import React from 'react';
import { Card, Table, Badge } from 'react-bootstrap';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useFinancialData } from '../../context/FinancialDataContext';

const RecentTransactionsCard: React.FC = () => {
  const { paymentHistory } = useFinancialData();
  
  // Sort payments by date, most recent first
  const sortedPayments = [...paymentHistory]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Card className="glass-card h-100 fade-in">
      <Card.Body>
        <Card.Title>
          <h5>Recent Transactions</h5>
        </Card.Title>
        
        <div className="table-responsive">
          <Table className="table-dark table-borderless align-middle">
            <thead>
              <tr className="text-muted">
                <th>Account</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {sortedPayments.map((payment, index) => (
                <tr key={index} className="slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className={`rounded-circle p-2 me-2 ${payment.isPaid ? 'bg-success bg-opacity-25' : 'bg-danger bg-opacity-25'}`}>
                        {payment.isPaid ? 
                          <ArrowUpRight size={18} className="text-success" /> : 
                          <ArrowDownRight size={18} className="text-danger" />
                        }
                      </div>
                      <div>
                        <p className="mb-0 fw-medium">{payment.accountName}</p>
                        <small className="text-muted">Payment</small>
                      </div>
                    </div>
                  </td>
                  <td>${payment.amount.toFixed(2)}</td>
                  <td>
                    {payment.isPaid ? 
                      <Badge bg="success" className="rounded-pill">Paid</Badge> : 
                      <Badge bg="danger" className="rounded-pill">Missed</Badge>
                    }
                  </td>
                  <td>
                    <small>{new Date(payment.date).toLocaleDateString()}</small>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
      <Card.Footer className="bg-transparent border-top border-light">
        <a href="/payment-history" className="text-decoration-none text-info">View all transactions</a>
      </Card.Footer>
    </Card>
  );
};

export default RecentTransactionsCard;