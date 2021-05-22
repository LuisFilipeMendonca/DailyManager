# Daily Manager
## An application to help you managing your day

## Motivation
Build this frontend application after learning how to work with VueJS in order to practise. With this I also learn how to use Vuex as a global state manager and Vue Router. It still needs a lot of refatoring, but it works.

## Features
- Register/Login/Logout from user account
- Create/Read/Update/Delete operations on tasks
- Create/Read/Update/Delete operations on contacts
- Create/Read/Update/Delete operations on chronometers
- Create/Read on account
- Displaying account value using [chart.js](https://www.chartjs.org/)

## Installation

This application requires [Node.js](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) to run.

Download or clone the project on your machine, install the dependencies and start the server.

```sh
cd project_folder
npm install
```

## Usage
In order to use this application you will also need to run the [API](https://github.com/luisfilipemendonca/DailyManager-Backend) on your machine.

### Development

```sh
cd project_folder
npm run serve
```

By default the application will run on [http://localhost:3000](http://localhost:8080).

The application is configured to use the API running on port 3002. If you change that backend port, create a .env file on the project root folder and add the following code with the respective port.
```sh
BACKEND_PORT=PORT_YOU_DEFINE_BACKEND
```
