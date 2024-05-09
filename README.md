# Finch POC

This repository contains two projects, each with their own README.

This is a demo app for fetching data from FINCH and is meant to be a POC

## Prerequisites

Before you begin, ensure you have Node.js installed on your machine. You can download and install Node.js from [Node.js official website](https://nodejs.org/).

This project also uses npm (Node Package Manager) to manage its dependencies.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**

If you have git installed, you can clone the repository using: 

```shell
git clone https://github.com/adamglasser/finch_poc.git
```

2. **Set up Project Components**

There are separate README files for both the App and Server which is the backend of the application

## App

This is where the  **Frontend** of the application is housed, and how it displays the data returned from the backend

[README](app/README.md)

## Server

This is where the  **Backend** of the application is housed, which fetches data from Finch and returns it to the frontend

[README](server/README.md)


## Notes:

For testing access token permissions you can user the CURLS below

```
# create provider
curl --location 'https://sandbox.tryfinch.com/api/sandbox/create' \
--header 'Content-Type: application/json' \
--data '{
    "provider_id": "gusto",
    "products": ["company", "directory", "individual", "employment"],
    "employee_size": 10
}'

# get payments by start/end date
curl --location 'https://sandbox.tryfinch.com/api/employer/payment?start_date=2024-01-01&end_date=2024-02-01' \
--header 'Authorization: Bearer {{token}}' \
--header 'Content-Type: application/json' \
--data ''

# get specific statement
curl --location 'https://sandbox.tryfinch.com/api/employer/pay-statement' \
--header 'Authorization: Bearer {{token}} \
--header 'Content-Type: application/json' \
--data '{"requests":[{"payment_id":"some_id"}]}'


# Potential XSS vulnerability
curl --location 'https://sandbox.tryfinch.com/api/sandbox/create' \
--header 'Content-Type: application/json' \
--data '{
    "provider_id": "gusto",
    "products": ["company", "directory", "individual", "employment" ],
    "employee_size": "10 <img src=x onerror=alert(0)>"
}'
```


