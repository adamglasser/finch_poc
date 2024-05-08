import React, { useState, useEffect } from 'react';
import DisplayData from './DisplayData';
import axios from 'axios';

const DisplayCompany = ({ selectedProvider, accessGranted }) => {
    const [data, setData] = useState({});

    const fetchData = () => {
        if (selectedProvider && accessGranted) {
            axios.get('http://localhost:8080/Company', {
                withCredentials: true
            })
            .then(response => {
                console.log('Response:', response.data);
                setData(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            alert('Please select a provider and ensure access is granted');
        }
    };

    const buttonEnabled = selectedProvider && accessGranted;

    return (
        <>
            <button 
                className={`gap-8 mx-8 mb-8 inline-block rounded border border-${buttonEnabled ? 'green' : 'grey'}-600 bg-${buttonEnabled ? 'green' : 'grey'}-600 px-12 py-3 text-sm font-medium ${buttonEnabled ? 'text-white' : 'text-dark'} ${buttonEnabled ? 'hover:bg-green-700' : ''}`}
                onClick={fetchData}
            >
                Load Data
            </button>
            {data ? <DisplayData data={data} /> : <p>No data loaded.</p>}
        </>
    );
};

export default DisplayCompany;
