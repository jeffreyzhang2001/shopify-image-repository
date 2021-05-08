## Image Repository - Jeffrey Zhang's Shopify Application

This image repository utilizes 3 core external dependencies: React, Flask, and a local SQLite db.  
I chose this stack for its ease of demonstration (less DB and backend boilerplate).  
This on-disk SQLite db is excellent for demonstrative purposes as it is efficient for a relatively small number of rows and persists data between refreshes.  
(Note: the project comes with a pre-seeded database with 4 entries.)

![Shopify Image Repository Screenshot](demo.png)

## Setup Instructions
There are set-up instructions for both the back-end (Flask) and front-end (React).

### Flask Setup
In the project directory, run:  
```bash
cd api
python -m venv venv
```  
to create a virtual environment. Then, enter the virtual environment:  
  
OS X:
`source venv/bin/activate`  
Windows:
`venv/Scripts/activate`  

Then, run `pip install -r requirements.txt` to install the required dependencies.  
Run `flask run` to start the Flask server.

### React Setup
In the project directory, run:
```bash
yarn install
yarn start
```
To install the required Node dependencies and start the React server.  
You can then visit the app at [http://localhost:3000](http://localhost:3000) to view it in the browser in dev mode.

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Testing Instructions
### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
