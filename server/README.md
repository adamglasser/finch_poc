# Server

This is a basic Node.js server setup using Express. It communicates with a third party API (Finch) to fetch data and sends this information to the frontend (app) to be displayed to a user.

## Prerequisites

Make sure you have Node.js installed on your machine and have cloned the repository as described in the root project readme.

1. **Navigate to the project directory**

After you have cloned the repository you can enter the project directory:

```shell
cd server
```


2. **Install dependencies**

Run the following command to install the necessary dependencies:

```shell
npm install
```

## Running the Server

Before running the server you will want to create an ev variable for your JWT secrets that can be used when creating tokens you

```shell
export JWT_SECRET='your_secret_key'
```
To check the secret you set you can use

```shell
echo $JWT_SECRET
```

To start the server, use the command:

```shell
node index.js

```
This will initiate the server on the default port defined in your `index.js`. Make sure the port is properly configured and not in use by another application.



