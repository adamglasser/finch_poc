# Finch POC

The app is a React application with a set of pre-configured dependencies useful for interacting with the Finch APIs.


## Prerequisites

Make sure you have Node.js installed on your machine and have cloned the repository as described in the root project readme.

## Install Steps

1. **Navigate to the project directory**

After you have cloned the repository you can enter the project directory:

```shell
cd app
```


2. **Install dependencies**

Run the following command to install the necessary dependencies:

```shell
npm install
```

This command reads the `package.json` file and installs all the dependencies listed under `dependencies` and `devDependencies`.

## Running the Server

To start the app, use the command:

```shell
npm start

```
This starts the development server and opens the application in your default browser. The app will reload if you make edits.

## CSS

To hot reload the Tailwind CSS enter a new terminal in the same directory (/app) and run

```shell
npx tailwindcss -i ./src/input.css -o ./src/output.css --watch

```


