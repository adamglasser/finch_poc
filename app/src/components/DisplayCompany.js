import React from 'react';
import axios from 'axios';

const DisplayCompany = ({ setSelectedIndividual, setIndividuals, selectedProvider, accessGranted,  setData, setRootDataType}) => {

    const buttonBaseClasses = "inline-block rounded border px-3 py-3 text-xs  font-medium";
    const enabledClasses = "border-green-600 bg-green-600 text-white hover:bg-green-700";
    const disabledClasses = "border-grey-600 bg-grey-600 text-dark";

    const fetchData = () => {
        setRootDataType(null)
        if (selectedProvider && accessGranted) {
            axios.get('http://localhost:8080/Company', {
                withCredentials: true,
                params: {
                    timestamp: new Date().getTime()
                },
            })
            .then(response => {
                console.log('Response:', response.data);
                setIndividuals([])
                setSelectedIndividual(null)
                setData(response.data);
            })
            .catch(error => {
                setData({})
                setIndividuals([])
                setSelectedIndividual(null)
                //console.error('Error:', error);
                if (error.response) {
                    console.log(error.response.status)
                    if (error.response.status == 501){
                        setData({})
                        alert('This endpoint is not supported by your selected provider')
                    }
                    else{
                        alert('There was an error fetching data, please reload and try agin')
                    }
                }
                else{
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
