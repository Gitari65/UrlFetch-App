import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import {url} from 'react-native-dotenv'

export default function App() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [refNo, setRefNo] = useState('');
  const [isSearched,setSearch] = useState(false);
  const baseUrl = url;

  const fetchPaymentStatus = () => {
    if (!refNo) {
      alert('Please enter a reference number.');
      return;
    }
  
    setLoading(true);
    const url = baseUrl + refNo;
    const requestOptions={
      method:'POST',
      headers:{'Content-Type':'application/json'},

    }
    fetch(url,requestOptions)
      .then((response) => {
        if (!response.ok) {
          // Handle HTTP error
          setLoading(false);
          setData(null); // Clear existing data
          return response.text();
        }
        return response.text();
      })
      .then((text) => {
        try {
          const json = JSON.parse(text);
          console.log('API Response:', json);
          setData(json);
        } catch (error) {
          alert('Reference number not found or invalid response.');
          setData(null); // Clear data in case of invalid response
        }
      })
      .catch(() => {
        alert('An error occurred while fetching data.');
      })
      .finally(() =>{
        setLoading(false)
       setSearch(true)
      });
  }
  //   fetch(url)
  //     .then((response) => {
  //       if (!response.ok) {
  //         // Handle HTTP error
  //         setLoading(false);
  //         setData(null); // Clear existing data
  //         return response.text();
  //       }
  //       return response.text();
  //     })
  //     .then((text) => {
  //       try {
  //         const json = JSON.parse(text);
  //         console.log('API Response:', json);
  //         setData(json);
  //       } catch (error) {
  //         alert('Reference number not found or invalid response.');
  //         setData(null); // Clear data in case of invalid response
  //       }
  //     })
  //     .catch(() => {
  //       alert('An error occurred while fetching data.');
  //     })
  //     .finally(() =>{
  //       setLoading(false)
  //      setSearch(true)
  //     }
       
  //      );
  // };
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        placeholder="Enter Reference Number"
        value={refNo}
        onChangeText={(text) => setRefNo(text)}
        style={{ marginBottom: 10, padding: 10, borderWidth: 1, width: 200 }}
      />
      <Button  title="Search" onPress={fetchPaymentStatus} >
      
      </Button>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <View>
          <Text>Status: {data.status}</Text>
          <Text>Ref No: {data.ref_no}</Text>
          <Text>Name: {data.name}</Text>
          <Text>Currency: {data.currency}</Text>
          <Text>Client Invoice Ref: {data.client_invoice_ref}</Text>
          <Text>Amount Paid: {data.amount_paid}</Text>
          <Text>Amount Expected: {data.amount_expected}</Text>

        </View>
      ) : (
        <Text>No data available.</Text>
      )}
    </View>

  );

      
}




