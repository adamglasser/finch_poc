import React, { useState, useEffect } from 'react';
import DisplayData from './DisplayData';
import axios from 'axios';

const DisplayCompany = ({ selectedProvider, accessGranted }) => {
    const [data, setData] = useState({});

    useEffect((selectedProvider) =>{
        if (!selectedProvider){
            setData({})
        }
    },[selectedProvider])

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
                //console.error('Error:', error);
                if (error.response) {
                    console.log(error.response.status)
                    if (error.response.status == 501){
                        setData({})
                        alert('This endpoint is not supported by your selected provider')
                    }
                }
                else{
                    console.error(error)
                    alert('We ran into a server error fetching this data')
                }
            });
        } else {
            alert('Please select a provider and ensure access is granted');
        }
    };

    const buttonEnabled = selectedProvider && accessGranted;

    return (
        <>
            <button 
                className={`gap-8 mx-8 mb-8 inline-block rounded border border-${buttonEnabled ? 'green' : 'grey'}-600 bg-${buttonEnabled ? 'green' : 'grey'}-600 px-8 py-3 text-sm font-medium ${buttonEnabled ? 'text-white' : 'text-dark'} ${buttonEnabled ? 'hover:bg-green-700' : ''}`}
                onClick={fetchData}
            >
                Fetch Company
            </button>
            {data ? <DisplayData data={data} /> : <p>No data loaded.</p>}
        </>
    );
};

export default DisplayCompany;
