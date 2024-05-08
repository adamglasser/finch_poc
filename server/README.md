# Server

This is a basic Node.js server setup using Express. It is configured to handle CORS and manage cookies, but due to security vulnerabilities with cookies it is only suitable for both development environments.

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

To start the server, use the command:

```shell
node index.js

```
This will initiate the server on the default port defined in your `index.js`. Make sure the port is properly configured and not in use by another application.


