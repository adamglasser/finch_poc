import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import DisplayCompany from './DisplayCompany'
import DisplayDirectory from './DisplayDirectory';
import DisplayData from './DisplayData';
import DisplayEmployment from './DisplayEmployment';
import DisplayIndividual from './DisplayIndividual';


export default function CreateProvider() {

    const [selectedProvider, setSelectedProvider] = useState(null);
    const [accessGranted, setAccessGranted] = useState(null)
    const [data, setData] = useState({});
    const [rootDataType, setRootDataType] = useState(null);
    const [individuals, setIndividuals] = useState([]);
    const [selectedIndividual, setSelectedIndividual] = useState(null);


    const providers = [
        { "providerName": "ADP Run", "providerId": "adp_run" },
        { "providerName": "Bamboo HR", "providerId": "bamboo_hr" },
        { "providerName": "Bamboo HR (API)", "providerId": "bamboo_hr_api" },
        { "providerName": "HiBob", "providerId": "bob" },
        { "providerName": "Gusto", "providerId": "gusto" },
        { "providerName": "Humaans", "providerId": "humaans" },
        { "providerName": "Insperity", "providerId": "insperity" },
        { "providerName": "Justworks", "providerId": "justworks" },
        { "providerName": "Namely", "providerId": "namely" },
        { "providerName": "Paychex Flex", "providerId": "paychex_flex" },
        { "providerName": "Paychex Flex (API)", "providerId": "paychex_flex_api" },
        { "providerName": "Paycom", "providerId": "paycom" },
        { "providerName": "Paycom (API)", "providerId": "paycom_api" },
        { "providerName": "Paylocity", "providerId": "paylocity" },
        { "providerName": "Paylocity (API)", "providerId": "paylocity_api" },
        { "providerName": "Personio", "providerId": "personio" },
        { "providerName": "Quickbooks", "providerId": "quickbooks" },
        { "providerName": "Rippling", "providerId": "rippling" },
        { "providerName": "Sage HR", "providerId": "sage_hr" },
        { "providerName": "Sapling", "providerId": "sapling" },
        { "providerName": "Sequoia One", "providerId": "sequoia_one" },
        { "providerName": "Square Payroll", "providerId": "square_payroll" },
        { "providerName": "Trinet", "providerId": "trinet" },
        { "providerName": "Trinet (API)", "providerId": "trinet_api" },
        { "providerName": "Ulti Pro", "providerId": "ulti_pro" },
        { "providerName": "Wave", "providerId": "wave" },
        { "providerName": "Workday", "providerId": "workday" },
        { "providerName": "Zenefits", "providerId": "zenefits" },
        { "providerName": "Zenefits (API)", "providerId": "zenefits_api" }
    ];

    const options = providers.map(provider => ({
        value: provider.providerId,
        label: provider.providerName
    }));

    const handleChange = selectedOption => {
        setAccessGranted(false);
        setSelectedProvider(selectedOption);
        setData({})
        setSelectedIndividual({})
        setIndividuals([])
    };

    const handleButtonClick = () => {
        if (selectedProvider) {
            axios.post(`http://localhost:8080/CreateProvider`, {}, {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    provider_id: selectedProvider.value
                },
                withCredentials: true
            })
                .then(response => {
                    console.log('Response:', response.data);
                    setAccessGranted(true)
                })
                .catch(error => {
                    setData({})
                    setIndividuals([])
                    setSelectedIndividual(null)
                    if (error.response) {
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
            alert('Please select a provider');
        }
    };

    const individualsOptions = individuals.map(individual => ({
        value: JSON.parse(individual)['id'],
        label: JSON.parse(individual)['name']
    }));

    const handleIndividualSelected = selectedOption => {
        setSelectedIndividual(selectedOption)
    };


    return (
        <>
            <div>
                <label for="selectProvider" className="block text-sm font-medium text-gray-900"> Select Provider: <span className='text-gray-600'> Current: {selectedProvider && selectedProvider.label || 'Provider Not Selected'} <br></br>Access Granted: {accessGranted ? '✅' : '❌'}</span> </label>
                <Select
                    id="selectProvider"
                    className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                    value={selectedProvider}
                    onChange={handleChange}
                    options={options}
                    placeholder="Select a Provider"
                />
                <div className='row my-5 gap-2 flex'>
                    <button className='rounded border border-indigo-600 bg-indigo-600 px-3 py-3 text-xs font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500' onClick={handleButtonClick}>Create Provider</button>
                    <DisplayCompany setSelectedIndividual={setSelectedIndividual} setIndividuals={setIndividuals} setRootDataType={setRootDataType} setData={setData} selectedProvider={selectedProvider} accessGranted={accessGranted} />
                    <DisplayDirectory setRootDataType={setRootDataType} setData={setData} selectedProvider={selectedProvider} accessGranted={accessGranted} />
                </div>
                <div className='row my-5 gap-2 flex'>
                <Select
                    classNames={`w-10 grid block`}
                    id="individualSelect"
                    className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                    value={selectedIndividual}
                    onChange={handleIndividualSelected}
                    options={individualsOptions}
                    placeholder="Select an Individual"
                />
                <DisplayIndividual setData={setData} selectedIndividual={selectedIndividual} accessGranted={accessGranted} />
                </div>
                {data ? <DisplayData setIndividuals={setIndividuals} rootDataType={rootDataType} data={data} /> : <p>No data loaded.</p>}
            </div>
        </>
    );
};