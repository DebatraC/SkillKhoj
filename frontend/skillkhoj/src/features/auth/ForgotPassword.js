import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Card, Alert } from '../../components';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Password reset instructions have been sent to your email.');
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <Card style={{ width: '400px', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1>Forgot Password</h1>
          <p>Enter your email to receive reset instructions</p>
        </div>
        
        {message && <Alert type="success" message={message} />}
        {error && <Alert type="error" message={error} />}
        
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <Button type="submit" style={{ width: '100%' }} disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Reset Instructions'}
          </Button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link to="/login">Back to Login</Link>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;