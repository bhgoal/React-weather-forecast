# React Weather App

## Installation Instructions

From the command line, clone the repository:
`git clone git@github.com:bhgoal/react-weather-forecast.git`

Install necessary packages:
`npm install`

To run in development mode, use `npm start` and navigate to [browser](http://localhost:3000).

To run in production mode, use `npm run build` to generate a production build. Install serve with `yarn global add serve` and start the server with `serve -s build`.

## Technologies Used

- React (create-react-app)
- Bootstrap for grid and styling
- [OpenWeatherMap API](https://openweathermap.org/api)
- Axios for HTTP requests
- Google Fonts and Font Awesome for styling

## Usage and Functionality

React Weather App uses the OpenWeatherMap API to retrieve current and 5-day weather reports for US zipcodes.

- Submit a zipcode in the search bar on the left to get a weather report.
- Searched locations will be stored below the search bar. Click on them to switch between locations.
- Just to the right of the search bar is a moon-shaped button to toggle the interface's night mode.
- After a location is searched, a button in the top right corner toggles between Fahrenheit and Celcius.

The app is fully responsive and when run in production mode, provides Progressive Web App functionality.
