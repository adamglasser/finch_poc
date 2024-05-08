import React from 'react';
import axios from 'axios';

const DisplayIndividual = ({ selectedIndividual, accessGranted,  setData}) => {

    const buttonBaseClasses = "inline-block rounded border px-3 text-xs  font-medium";
    const enabledClasses = "border-cyan-600 bg-cyan-600 text-white hover:bg-cyan-700";
    const disabledClasses = "border-grey-600 bg-grey-600 text-dark";

    const fetchData = () => {
        if (selectedIndividual && accessGranted) {
            axios.get(`http://localhost:8080/Individual?individualId=${selectedIndividual.value}`, {
                withCredentials: true
            })
            .then(response => {
                console.log('Response:', response.data);
                setData(response.data);
            })
            .catch(error => {
                setData({})
                //console.error('Error:', error);
                if (error.response) {
                    console.log(error.response.status)
                    if (error.response.status == 501){
                        alert('This endpoint is not supported by your selected provider')
                    }
                }
                else{
                    console.error(error)
                    alert('We ran into a server error fetching this data')
                }
            });
        } else {
            alert('Please fetch a directory to get detail on an individual');
        }
    };

    const buttonEnabled = selectedIndividual && accessGranted;

    return (
        <>
            <button 
                className={`${buttonBaseClasses} ${buttonEnabled ? enabledClasses : disabledClasses}`}
                onClick={fetchData}
            >
                Get Detail
            </button>
        </>
    );
};

export default DisplayIndividual;
