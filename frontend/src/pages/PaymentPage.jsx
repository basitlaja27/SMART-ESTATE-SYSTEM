import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PaystackButton } from 'react-paystack';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dues = location.state?.dues || 0;
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [reference, setReference] = useState('');

  // Use a dummy public key for testing since no real key was provided
  const publicKey = "pk_test_b8eaaf13f6c5370071e0a5ca717cf7908027b120";
  const amountToPay = dues > 0 ? dues : 1000; // minimum amount if dues is 0
  
  const componentProps = {
    email: user.email || 'resident@smartestate.com',
    amount: amountToPay * 100, // Paystack amount is in kobo (multiply by 100 for NGN)
    metadata: {
      name: user.name,
      phone: user.phone,
    },
    publicKey,
    text: `Pay ₦${amountToPay}`,
    onSuccess: async (response) => {
      // API call to backend
       try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/payments/pay", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ userId: user.id || 1, amount: amountToPay, description: "Estate Dues" })
        });
        if (res.ok) {
            setIsSuccess(true);
            setReference(response.reference);
            toast.success("Payment successful!");
        } else {
            toast.error("Failed to record payment in the system.");
        }
      } catch (err) {
        toast.error("Network error recording payment");
      }
    },
    onClose: () => {
      toast.error("Payment cancelled");
    },
  };

  if (isSuccess) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f7fafc' }}>
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            style={{ padding: '40px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '400px' }}
        >
            <div style={{ fontSize: '48px', color: 'green', marginBottom: '20px' }}>✓</div>
            <h2>Payment Successful!</h2>
            <p>Your payment of <strong>₦{amountToPay}</strong> was received.</p>
            <p style={{ fontSize: '0.9rem', color: '#718096', margin: '20px 0' }}>Transaction Ref: {reference}</p>
            <button 
                onClick={() => window.print()}
                style={{ padding: '10px 20px', margin: '10px', backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            >
                Print Receipt
            </button>
            <button 
                onClick={() => navigate('/resident')}
                style={{ padding: '10px 20px', margin: '10px', backgroundColor: '#e2e8f0', color: 'black', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            >
                Back to Dashboard
            </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f7fafc' }}>
        <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            style={{ padding: '40px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '400px', width: '100%' }}
        >
            <h2>Checkout</h2>
            <p style={{ marginBottom: '30px' }}>You are about to pay your estate dues.</p>
            
            <div style={{ backgroundColor: '#edf2f7', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
                <span style={{ display: 'block', fontSize: '0.9rem', color: '#4a5568' }}>Total Amount</span>
                <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>₦{amountToPay}</span>
            </div>

            <div className="paystack-button-wrapper" style={{ width: '100%', padding: '15px', backgroundColor: 'var(--primary-color)', color: 'white', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                <PaystackButton {...componentProps} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '16px', fontWeight: 'bold', width: '100%', cursor: 'pointer', outline: 'none' }} />
            </div>

            <button 
                onClick={() => navigate(-1)}
                style={{ marginTop: '20px', padding: '10px', width: '100%', backgroundColor: 'transparent', border: '1px solid #cbd5e0', color: '#4a5568', borderRadius: '6px', cursor: 'pointer' }}
            >
                Cancel
            </button>
        </motion.div>
    </div>
  );
};

export default PaymentPage;
