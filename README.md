## Image Repository - Jeffrey Zhang's Shopify Application

This image repository utilizes 3 core external dependencies: React, Flask, and a local SQLite db.  
I chose this stack for its ease of demonstration and efficiency (less DB and backend boilerplate).   
The application is well-tested; test running instructions are below, in the [Testing Instructions](#testing-instructions) Section.  
(Note: the project comes with a pre-seeded database with 4 entries.)



## Features
- Efficient, custom pagination solution
  - Client only requests what needs to be shown on the page (very small DB load)
  - Each page loads 6 images at a time
  - Client caches previously loaded image metadata (name, path) in memory to minimize DB trips when revisiting previously loaded pages
  - Client updates cache when adding/deleting photos without additional DB requests
  - No external state management libraries used
- On-disk SQLite db allows for saved images to persist between refreshes
- Users can add photos (with validation) by providing a URL
- Users can delete photos
- Very fast load speeds

Here's a screenshot:
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

## Testing Instructions
### Frontend Unit Tests
Run `yarn test` in the project directory.  
  
While E2E/integration tests would be nice, adding them would be a bit out of the scope of this challenge.
If I were to add them though, I would use Cypress and run through a typical workflow of paginating through results and adding/removing images.

### Backend Unit Tests
`cd api`  
Then activate the virtual env using the instructions in the `Setup Instructions` section. After, run:  
`python -m pytest`

## Possible Improvements
- Extend to uploading files directly (code is largely set up in a way that supports this already)
- Improve client UX (better grid responsiveness)
- Add stock + price functionality
