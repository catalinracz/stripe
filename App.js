import React from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';
import PaymentScreen from './src/screens/PaymentScreen';

export default function App() {
    return (
      <StripeProvider
        publishableKey="pk_test_51J9rk0GqtMN8OqX5UErIYtfenW6dj1U5L1PgOT3cZf8bsmGbPmSB6ihC1hZ824wh8Oe1fZZuZmcUAZON2bLaDaLn00papjXiI1"
      >
      <PaymentScreen></PaymentScreen>
      </StripeProvider>
    );
  }