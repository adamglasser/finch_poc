import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayCompany = ({ selectedProvider, accessGranted,  setData}) => {

    const buttonBaseClasses = "inline-block rounded border px-8 py-3 text-sm font-medium";
    const enabledClasses = "border-green-600 bg-green-600 text-white hover:bg-green-700";
    const disabledClasses = "border-grey-600 bg-grey-600 text-dark";

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
                className={`${buttonBaseClasses} ${buttonEnabled ? enabledClasses : disabledClasses}`}
                onClick={fetchData}
            >
                Fetch Company
            </button>
        </>
    );
};

export default DisplayCompany;
