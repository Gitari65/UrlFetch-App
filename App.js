import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';



 function App() {
  const [data, setData] = useState(null);
  const[statusData,setStatusData]=useState(null);
  const [isLoading, setLoading] = useState(false);
  const [refNo, setRefNo] = useState('');
  const [isSearched,setSearch] = useState(false);
  const baseUrl='http://41.89.227.241:8182/api/Ecitizen/paymentstatus?ref_no=';
 const statusUrl='http://41.89.227.241:8182/api/Ecitizen/billrefstatus?billref=';
  

  const fetchRefStatus=()=>{
    if (!refNo) {
      alert('Please enter a reference number.');
      return;
    }
    const url = statusUrl + refNo;
  
    setLoading(true);
    const requestStatusOptions={
      method:'GET',
      headers:{'Content-Type':'application/json'},
    }
    fetch(url,requestStatusOptions)
    .then((response)=>{
      if(!response.ok){
        setLoading(false);
        setStatusData(null);
        return response.text();
      }
      return response.text();
    }).then((text)=>{
      try{
        const json = JSON.parse(text);
        console.log('API Response:', json);
        setStatusData(json);
      }catch(error){
        alert('Reference number not found or invalid response.');
        setStatusData(null);
      }
    })


  }



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

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        placeholder="Enter Reference Number"
        value={refNo}
        onChangeText={(text) => setRefNo(text)}
        style={{ marginBottom: 10, padding: 10, borderWidth: 1, width: 200 }}
      />
      <Button  title="Search" onPress={()=>{fetchPaymentStatus(); fetchRefStatus();} } >
      
      </Button>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : statusData&& statusData.status==0?(data ? (
        <View>
          <Text>Status: {data.status}</Text>
          <Text>Ref No: {data.ref_no}</Text>
          <Text>Name: {data.name}</Text>
          <Text>Currency: {data.currency}</Text>
          <Text>Client Invoice Ref: {data.client_invoice_ref}</Text>
          <Text>Amount Paid: {data.amount_paid}</Text>
          <Text>Amount Expected: {data.amount_expected}</Text>
          <Text>Save Description: {data.save_description}</Text>

        </View>
      ): (
        <Text>No data available.</Text>
      )) :statusData&& statusData.status==1?(
        <>
        <Text>timestamp: {data.timestamp}</Text>
          <Text> No: {data.no}</Text>
          <Text>Customer Id: {data.customerId}</Text>
          <Text>Payer Name: {data.payerName}</Text>
          <Text>PayerPhone {data.payerPhone}</Text>
          <Text>Amount: {data.amount}</Text>
          <Text>Reference Code: {data.referenceCode}</Text>
          <Text>Bank Account: {data.bankAccount}</Text>
          <Text>PaymentMode {data.paymentMode}</Text>
          <Text>Narration: {data.narration}</Text>
          <Text>Transaction Date: {data.transactionDate}</Text>
          <Text>Posted: {data.posted}</Text>
          <Text>Bank No: {data.bankNo}</Text>
          <Text>Transaction Time: {data.transactionTime}</Text>
          <Text>Payment Type {data.paymentType}</Text>
          <Text>User Id: {data.userId}</Text>
        </> 
      )
      :(
        <Text>Reference number not found.</Text>
      )
      }
    </View>

  );

      
}
module.exports = App;




