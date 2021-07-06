import React from 'react';
import {View, Button} from 'react-native';
import {CardField, useConfirmPayment} from '@stripe/stripe-react-native';
import axios from 'axios';

export default function PaymentScreen() {
  const {confirmPayment, loading} = useConfirmPayment();
  const fetchPaymentIntentClientSecret = async () => {
    const response = await axios.post(`http://10.0.2.2:8080/api/createPay`, {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYyNTY2MzkyNX0.po6K834XaUOFWctwOaezFOMPEtPl6zdu5K6gHyIOphck6uxhaD83KkAmZ2jqc7o5JKggZHG88G9KG1CsUFujLw'
      }
    })
    .then(response => response)
    .catch(err => err)

    return response.data;
  };

  const handlePayPress = async () => {
    const billingDetails = {
        email: 'jenny.rosen@example.com',
      };
  
      // Fetch the intent client secret from the backend
      const clientSecret = await fetchPaymentIntentClientSecret();
  
      // Confirm the payment with the card details
      const {paymentIntent, error} = await confirmPayment(clientSecret, {
        type: 'Card',
        billingDetails,
      });
  
      if (error) {
        console.log('Payment confirmation error', error);
      } else if (paymentIntent) {
        console.log('Success from promise', paymentIntent);
      }
    }


  return (
    <View>
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
      <Button onPress={handlePayPress} title="Pay" disabled={loading} />
    </View>
  );
}
