import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function App() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [refNo, setRefNo] = useState('');
  const [isSearched,setSearch] = useState(false);
  const baseUrl = 'http://41.89.227.241:8182/api/Ecitizen/paymentstatus?ref_no=';

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
         

        </View>
      ) : (
        <Text>No data available.</Text>
      )}
    </View>

  );

      
}




