import React, { useState, useEffect } from 'react';
import DisplayData from './DisplayData';
import axios from 'axios';



const DisplayCompany = ({selectedProvider}) => {
    const [data, setData] = useState({});


    const fetchData = () => {
        if (selectedProvider) {
            axios.get(`http://localhost:8080/Company`,{
                withCredentials: true
            })
            .then(response => {
                    console.log('Response:', response.data);
                    setData(response.data)
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            alert('Please select a provider');
        }
    };


    return (
        <div>
            <h2 className="text-base font-semibold leading-7 text-dark-600 mt-8">Load Data</h2>
            <button disabled={selectedProvider ? false : true}
            className={`mb-8 inline-block rounded border border-${selectedProvider ? 'indigo' : 'grey'}-600 bg-${selectedProvider ? 'indigo' : 'grey'}-600 px-12 py-3 text-sm font-medium text-${selectedProvider ? 'white' : 'dark'} ${selectedProvider ? 'hover:bg-transparent' : ''} ${selectedProvider ? 'hover:text-indigo-600' : ''} focus:outline-none focus:ring active:text-indigo-500`}
            onClick={fetchData}>{selectedProvider ? 'Load Data' : 'Select A Provider'}</button>
            {data ? <DisplayData data={data} /> : <p>No data loaded.</p>}
        </div>
    );
};

export default DisplayCompany;
