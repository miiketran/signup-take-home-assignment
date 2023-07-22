## Getting Started

1. Download and open this zip file
2. In your Terminal, change directory into the root folder for the project (placer-app)
3. Run `npm install` to install dependencies
4. Run `cp .env.example .env` to create your own .env file
5. In the browser, go to [Universal Tutorial](https://www.universal-tutorial.com/rest-apis/free-rest-api-for-country-state-city) and enter your Name and Email to generate an API token
6. Open the .env file to paste the API token value for REACT_APP_API_TOKEN and your email for REACT_APP_API_EMAIL
7. Save the .env file

## Start the app

Run `npm run start` and navigate to `http://localhost:3000`.

## Recording

[Watch Here](https://drive.google.com/file/d/1SLHbPVnXl6uL3JNPJzZf4rhPUDKs5TSd/view?usp=sharing)

## Follow-up Items

1. Show error message without vertically expanding the form
2. When user fixes the validation error, the error should disapear
3. Use a Select component with smaller vertical height
4. Store the API Auth Token in a secret manager and use in app for Production
