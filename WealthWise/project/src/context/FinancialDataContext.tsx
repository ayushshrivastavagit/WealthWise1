import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface DebtIncomeData {
  monthlyIncome: number;
  mortgagePayment: number;
  carPayment: number;
  creditCardPayment: number;
  studentLoanPayment: number;
  otherDebtPayment: number;
}

export interface CreditUtilization {
  limit: number;
  balance: number;
  name: string;
}

export interface PaymentRecord {
  date: string;
  accountName: string;
  amount: number;
  dueDate: string;
  isPaid: boolean;
  isLate: boolean;
}

export interface FinancialGoal {
  id: string;
  name: string;
  currentAmount: number;
  targetAmount: number;
  deadline: string;
  category: string;
}

export interface MonthlyReport {
  month: string;
  healthScore: number;
  debtToIncomeRatio: number;
  creditUtilization: number;
  missedPayments: number;
  notes: string;
}

interface FinancialDataContextType {
  debtIncomeData: DebtIncomeData;
  creditCards: CreditUtilization[];
  paymentHistory: PaymentRecord[];
  goals: FinancialGoal[];
  monthlyReports: MonthlyReport[];
  updateDebtIncomeData: (data: DebtIncomeData) => void;
  updateCreditCards: (cards: CreditUtilization[]) => void;
  addPaymentRecord: (record: PaymentRecord) => void;
  updatePaymentRecord: (index: number, record: PaymentRecord) => void;
  addGoal: (goal: FinancialGoal) => void;
  updateGoal: (id: string, goal: FinancialGoal) => void;
  deleteGoal: (id: string) => void;
  calculateHealthScore: () => number;
  calculateDebtToIncomeRatio: () => number;
  calculateCreditUtilization: () => number;
}

const defaultDebtIncomeData: DebtIncomeData = {
  monthlyIncome: 5000,
  mortgagePayment: 1200,
  carPayment: 350,
  creditCardPayment: 200,
  studentLoanPayment: 400,
  otherDebtPayment: 100,
};

const defaultCreditCards: CreditUtilization[] = [
  { name: 'Chase Freedom', limit: 5000, balance: 1500 },
  { name: 'Citi Rewards', limit: 7500, balance: 3000 },
  { name: 'Discover It', limit: 3000, balance: 500 },
];

const defaultPaymentHistory: PaymentRecord[] = [
  { date: '2023-12-01', accountName: 'Mortgage', amount: 1200, dueDate: '2023-12-01', isPaid: true, isLate: false },
  { date: '2023-12-05', accountName: 'Car Loan', amount: 350, dueDate: '2023-12-05', isPaid: true, isLate: false },
  { date: '2023-12-15', accountName: 'Credit Card', amount: 200, dueDate: '2023-12-15', isPaid: true, isLate: false },
  { date: '2024-01-01', accountName: 'Mortgage', amount: 1200, dueDate: '2024-01-01', isPaid: true, isLate: false },
  { date: '2024-01-05', accountName: 'Car Loan', amount: 350, dueDate: '2024-01-05', isPaid: false, isLate: true },
];

const defaultGoals: FinancialGoal[] = [
  { id: '1', name: 'Emergency Fund', currentAmount: 5000, targetAmount: 15000, deadline: '2024-12-31', category: 'Savings' },
  { id: '2', name: 'Pay off Credit Card', currentAmount: 2500, targetAmount: 7000, deadline: '2024-06-30', category: 'Debt Payoff' },
];

const defaultMonthlyReports: MonthlyReport[] = [
  { month: 'November 2023', healthScore: 72, debtToIncomeRatio: 0.42, creditUtilization: 0.32, missedPayments: 0, notes: 'Good progress on reducing credit card balances.' },
  { month: 'December 2023', healthScore: 75, debtToIncomeRatio: 0.41, creditUtilization: 0.30, missedPayments: 0, notes: 'Continue to focus on building emergency fund.' },
  { month: 'January 2024', healthScore: 71, debtToIncomeRatio: 0.43, creditUtilization: 0.31, missedPayments: 1, notes: 'One missed payment affected score. Set up automatic payments.' },
];

const FinancialDataContext = createContext<FinancialDataContextType | null>(null);

export const useFinancialData = () => {
  const context = useContext(FinancialDataContext);
  if (!context) {
    throw new Error('useFinancialData must be used within a FinancialDataProvider');
  }
  return context;
};

export const FinancialDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [debtIncomeData, setDebtIncomeData] = useState<DebtIncomeData>(defaultDebtIncomeData);
  const [creditCards, setCreditCards] = useState<CreditUtilization[]>(defaultCreditCards);
  const [paymentHistory, setPaymentHistory] = useState<PaymentRecord[]>(defaultPaymentHistory);
  const [goals, setGoals] = useState<FinancialGoal[]>(defaultGoals);
  const [monthlyReports] = useState<MonthlyReport[]>(defaultMonthlyReports);

  const updateDebtIncomeData = (data: DebtIncomeData) => {
    setDebtIncomeData(data);
  };

  const updateCreditCards = (cards: CreditUtilization[]) => {
    setCreditCards(cards);
  };

  const addPaymentRecord = (record: PaymentRecord) => {
    setPaymentHistory([...paymentHistory, record]);
  };

  const updatePaymentRecord = (index: number, record: PaymentRecord) => {
    const updatedHistory = [...paymentHistory];
    updatedHistory[index] = record;
    setPaymentHistory(updatedHistory);
  };

  const addGoal = (goal: FinancialGoal) => {
    setGoals([...goals, goal]);
  };

  const updateGoal = (id: string, goal: FinancialGoal) => {
    const updatedGoals = goals.map(g => g.id === id ? goal : g);
    setGoals(updatedGoals);
  };

  const deleteGoal = (id: string) => {
    const updatedGoals = goals.filter(g => g.id !== id);
    setGoals(updatedGoals);
  };

  const calculateDebtToIncomeRatio = () => {
    const totalMonthlyDebt = 
      debtIncomeData.mortgagePayment + 
      debtIncomeData.carPayment + 
      debtIncomeData.creditCardPayment + 
      debtIncomeData.studentLoanPayment + 
      debtIncomeData.otherDebtPayment;
    
    return debtIncomeData.monthlyIncome > 0 
      ? totalMonthlyDebt / debtIncomeData.monthlyIncome 
      : 0;
  };

  const calculateCreditUtilization = () => {
    const totalLimit = creditCards.reduce((sum, card) => sum + card.limit, 0);
    const totalBalance = creditCards.reduce((sum, card) => sum + card.balance, 0);
    
    return totalLimit > 0 ? totalBalance / totalLimit : 0;
  };

  const calculateHealthScore = () => {
    // Factors affecting score:
    // 1. Debt-to-income ratio (lower is better)
    // 2. Credit utilization (lower is better)
    // 3. Payment history (fewer missed payments is better)
    
    const dtiRatio = calculateDebtToIncomeRatio();
    const creditUtil = calculateCreditUtilization();
    const missedPayments = paymentHistory.filter(payment => payment.isLate).length;
    
    // Calculate individual scores
    let dtiScore = 100 - (dtiRatio * 100); // 0% DTI = 100 points, 50%+ DTI = 50 or fewer points
    if (dtiRatio > 0.43) dtiScore *= 0.8; // Severe penalty for DTI above 43%
    
    let utilizationScore = 100 - (creditUtil * 200); // 0% utilization = 100 points, 50% = 0 points
    if (utilizationScore < 0) utilizationScore = 0;
    
    let paymentScore = 100 - (missedPayments * 15); // Each missed payment reduces score
    if (paymentScore < 0) paymentScore = 0;
    
    // Weight the factors
    const weightedScore = (dtiScore * 0.35) + (utilizationScore * 0.30) + (paymentScore * 0.35);
    
    return Math.round(weightedScore);
  };

  const value = {
    debtIncomeData,
    creditCards,
    paymentHistory,
    goals,
    monthlyReports,
    updateDebtIncomeData,
    updateCreditCards,
    addPaymentRecord,
    updatePaymentRecord,
    addGoal,
    updateGoal,
    deleteGoal,
    calculateHealthScore,
    calculateDebtToIncomeRatio,
    calculateCreditUtilization,
  };

  return (
    <FinancialDataContext.Provider value={value}>
      {children}
    </FinancialDataContext.Provider>
  );
};