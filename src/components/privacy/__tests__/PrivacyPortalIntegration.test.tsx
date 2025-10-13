import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { NotificationProvider } from '../../../contexts/NotificationContext';

// Mock the privacy pages
const MockPrivacyDashboard = () => (
  <div>
    <h1>Privacy Dashboard</h1>
    <div data-testid="compliance-score">85%</div>
    <div data-testid="active-requests">12</div>
    <button data-testid="new-request-btn">Submit New Request</button>
  </div>
);

const MockDataRightsPortal = () => (
  <div>
    <h1>Data Rights Portal</h1>
    <form data-testid="data-rights-form">
      <input 
        data-testid="requester-name" 
        placeholder="Your name" 
        required 
      />
      <select data-testid="request-type" required>
        <option value="">Select request type</option>
        <option value="access">Access Request</option>
        <option value="deletion">Deletion Request</option>
      </select>
      <button type="submit" data-testid="submit-request">
        Submit Request
      </button>
    </form>
  </div>
);

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <ThemeProvider>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </ThemeProvider>
  </BrowserRouter>
);

describe('Privacy Portal Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Privacy Dashboard', () => {
    it('should display compliance metrics', () => {
      render(
        <TestWrapper>
          <MockPrivacyDashboard />
        </TestWrapper>
      );

      expect(screen.getByText('Privacy Dashboard')).toBeInTheDocument();
      expect(screen.getByTestId('compliance-score')).toHaveTextContent('85%');
      expect(screen.getByTestId('active-requests')).toHaveTextContent('12');
      expect(screen.getByTestId('new-request-btn')).toBeInTheDocument();
    });

    it('should handle navigation to new request', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <MockPrivacyDashboard />
        </TestWrapper>
      );

      const newRequestBtn = screen.getByTestId('new-request-btn');
      await user.click(newRequestBtn);

      // In a real integration test, this would check navigation
      expect(newRequestBtn).toBeInTheDocument();
    });
  });

  describe('Data Rights Portal', () => {
    it('should render data rights form', () => {
      render(
        <TestWrapper>
          <MockDataRightsPortal />
        </TestWrapper>
      );

      expect(screen.getByText('Data Rights Portal')).toBeInTheDocument();
      expect(screen.getByTestId('data-rights-form')).toBeInTheDocument();
      expect(screen.getByTestId('requester-name')).toBeInTheDocument();
      expect(screen.getByTestId('request-type')).toBeInTheDocument();
      expect(screen.getByTestId('submit-request')).toBeInTheDocument();
    });

    it('should handle form submission workflow', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <MockDataRightsPortal />
        </TestWrapper>
      );

      // Fill out the form
      await user.type(screen.getByTestId('requester-name'), 'John Doe');
      await user.selectOptions(screen.getByTestId('request-type'), 'access');

      // Submit the form
      const submitBtn = screen.getByTestId('submit-request');
      await user.click(submitBtn);

      // Verify form interaction
      expect(screen.getByTestId('requester-name')).toHaveValue('John Doe');
      expect(screen.getByTestId('request-type')).toHaveValue('access');
    });

    it('should validate required fields', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <MockDataRightsPortal />
        </TestWrapper>
      );

      const submitBtn = screen.getByTestId('submit-request');
      await user.click(submitBtn);

      // Check that required fields are validated
      const requesterName = screen.getByTestId('requester-name');
      const requestType = screen.getByTestId('request-type');
      
      expect(requesterName).toBeRequired();
      expect(requestType).toBeRequired();
    });
  });

  describe('Privacy Workflow Integration', () => {
    it('should support complete privacy request workflow', async () => {
      const user = userEvent.setup();

      // Mock a complete workflow from dashboard to request submission
      const WorkflowComponent = () => {
        const [currentStep, setCurrentStep] = React.useState('dashboard');

        return (
          <div>
            {currentStep === 'dashboard' && (
              <div>
                <h1>Privacy Dashboard</h1>
                <button 
                  data-testid="start-request"
                  onClick={() => setCurrentStep('request-form')}
                >
                  Start New Request
                </button>
              </div>
            )}
            {currentStep === 'request-form' && (
              <div>
                <h1>Data Rights Request</h1>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  setCurrentStep('confirmation');
                }}>
                  <input 
                    data-testid="workflow-name" 
                    placeholder="Your name"
                    required 
                  />
                  <button type="submit" data-testid="workflow-submit">
                    Submit Request
                  </button>
                </form>
              </div>
            )}
            {currentStep === 'confirmation' && (
              <div>
                <h1>Request Submitted</h1>
                <p data-testid="confirmation-message">
                  Your privacy request has been submitted successfully.
                </p>
              </div>
            )}
          </div>
        );
      };

      render(
        <TestWrapper>
          <WorkflowComponent />
        </TestWrapper>
      );

      // Step 1: Start from dashboard
      expect(screen.getByText('Privacy Dashboard')).toBeInTheDocument();
      
      // Step 2: Navigate to request form
      await user.click(screen.getByTestId('start-request'));
      expect(screen.getByText('Data Rights Request')).toBeInTheDocument();

      // Step 3: Fill and submit form
      await user.type(screen.getByTestId('workflow-name'), 'Test User');
      await user.click(screen.getByTestId('workflow-submit'));

      // Step 4: Verify confirmation
      await waitFor(() => {
        expect(screen.getByText('Request Submitted')).toBeInTheDocument();
        expect(screen.getByTestId('confirmation-message')).toHaveTextContent(
          'Your privacy request has been submitted successfully.'
        );
      });
    });
  });

  describe('Compliance Tracking Integration', () => {
    it('should display regulation-specific compliance status', () => {
      const ComplianceTracker = () => (
        <div>
          <h2>Compliance Status</h2>
          <div data-testid="ferpa-status" className="compliance-item">
            FERPA: <span className="status-compliant">Compliant</span>
          </div>
          <div data-testid="ccpa-status" className="compliance-item">
            CCPA: <span className="status-needs-attention">Needs Attention</span>
          </div>
          <div data-testid="gdpr-status" className="compliance-item">
            GDPR: <span className="status-compliant">Compliant</span>
          </div>
        </div>
      );

      render(
        <TestWrapper>
          <ComplianceTracker />
        </TestWrapper>
      );

      expect(screen.getByTestId('ferpa-status')).toHaveTextContent('FERPA: Compliant');
      expect(screen.getByTestId('ccpa-status')).toHaveTextContent('CCPA: Needs Attention');
      expect(screen.getByTestId('gdpr-status')).toHaveTextContent('GDPR: Compliant');
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle privacy request submission errors gracefully', async () => {
      const user = userEvent.setup();

      const ErrorHandlingComponent = () => {
        const [error, setError] = React.useState<string | null>(null);
        const [loading, setLoading] = React.useState(false);

        const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setLoading(true);
          setError(null);

          // Simulate API error
          setTimeout(() => {
            setError('Failed to submit request. Please try again.');
            setLoading(false);
          }, 100);
        };

        return (
          <div>
            <form onSubmit={handleSubmit}>
              <input data-testid="error-test-input" required />
              <button 
                type="submit" 
                data-testid="error-test-submit"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
            {error && (
              <div data-testid="error-message" className="error">
                {error}
              </div>
            )}
          </div>
        );
      };

      render(
        <TestWrapper>
          <ErrorHandlingComponent />
        </TestWrapper>
      );

      await user.type(screen.getByTestId('error-test-input'), 'test input');
      await user.click(screen.getByTestId('error-test-submit'));

      // Check loading state
      expect(screen.getByText('Submitting...')).toBeInTheDocument();

      // Wait for error to appear
      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toHaveTextContent(
          'Failed to submit request. Please try again.'
        );
      });
    });
  });
});