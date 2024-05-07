import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

export default function CreateProvider (){

    const [selectedProvider, setSelectedProvider] = useState(null);
    const [accessGranted, setAccessGranted] = useState(null)

    const providers = [
        {"providerName":"ADP Run","providerId":"adp_run"},
        {"providerName":"Bamboo HR","providerId":"bamboo_hr"},
        {"providerName":"Bamboo HR (API)","providerId":"bamboo_hr_api"},
        {"providerName":"HiBob","providerId":"bob"},
        {"providerName":"Gusto","providerId":"gusto"},
        {"providerName":"Humaans","providerId":"humaans"},
        {"providerName":"Insperity","providerId":"insperity"},
        {"providerName":"Justworks","providerId":"justworks"},
        {"providerName":"Namely","providerId":"namely"},
        {"providerName":"Paychex Flex","providerId":"paychex_flex"},
        {"providerName":"Paychex Flex (API)","providerId":"paychex_flex_api"},
        {"providerName":"Paycom","providerId":"paycom"},
        {"providerName":"Paycom (API)","providerId":"paycom_api"},
        {"providerName":"Paylocity","providerId":"paylocity"},
        {"providerName":"Paylocity (API)","providerId":"paylocity_api"},
        {"providerName":"Personio","providerId":"personio"},
        {"providerName":"Quickbooks","providerId":"quickbooks"},
        {"providerName":"Rippling","providerId":"rippling"},
        {"providerName":"Sage HR","providerId":"sage_hr"},
        {"providerName":"Sapling","providerId":"sapling"},
        {"providerName":"Sequoia One","providerId":"sequoia_one"},
        {"providerName":"Square Payroll","providerId":"square_payroll"},
        {"providerName":"Trinet","providerId":"trinet"},
        {"providerName":"Trinet (API)","providerId":"trinet_api"},
        {"providerName":"Ulti Pro","providerId":"ulti_pro"},
        {"providerName":"Wave","providerId":"wave"},
        {"providerName":"Workday","providerId":"workday"},
        {"providerName":"Zenefits","providerId":"zenefits"},
        {"providerName":"Zenefits (API)","providerId":"zenefits_api"}
    ];

    const options = providers.map(provider => ({
        value: provider.providerId,
        label: provider.providerName
    }));

    const handleChange = selectedOption => {
        setAccessGranted(false);
        setSelectedProvider(selectedOption);
    };

    const handleButtonClick = () => {
        if (selectedProvider) {
            axios.post(`http://localhost:8080/CreateProvider?provider_id=` + selectedProvider.value)
            .then(response => {
                console.log('Response:', response.data);
                setAccessGranted(true)
                
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
        <label for="selectProvider" class="block text-sm font-medium text-gray-900"> Select Provider: <span className='text-gray-600'> Current: {selectedProvider && selectedProvider.label || 'Provider Not Selected'} <br></br>Access Granted: {accessGranted ? '✅'  : '❌'}</span> </label> 
            <Select
                id="selectProvider"
                className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                value={selectedProvider}
                onChange={handleChange}
                options={options}
                placeholder="Select a Provider"
            />
            <button className='mt-5 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500' onClick={handleButtonClick}>Create Provider</button>
        </div>
    );
};