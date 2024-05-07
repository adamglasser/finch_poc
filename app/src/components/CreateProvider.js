import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

export default function CreateProvider (){

    const [selectedProvider, setSelectedProvider] = useState(null);

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
        setSelectedProvider(selectedOption);
    };

    const handleButtonClick = () => {
        if (selectedProvider) {
            const data = {
                provider_id: selectedProvider.value,
                products: ["company", "directory", "individual", "employment"],
                employee_size: 10
            };

            axios.post('https://sandbox.tryfinch.com/api/sandbox/create', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log('Response:', response.data);
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
            <Select
                value={selectedProvider}
                onChange={handleChange}
                options={options}
                placeholder="Select a Provider"
            />
            <button onClick={handleButtonClick}>Submit Request</button>
        </div>
    );
};