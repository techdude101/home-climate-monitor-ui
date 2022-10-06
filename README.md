# Home Climate Monitor
[Home Climate Monitor](https://techdude101.github.io/home-climate-monitor-ui/)

## View data and manage data logging devices

## Prerequisites
  1. DB setup
  2. API setup

### Clone the repository
	git clone https://github.com/techdude101/home-climate-monitor-ui.git
	cd home-climate-monitor-ui

#### Configure
	Edit src\utils\constants.js
	Change the URL to match your heroku app - https://<your-app-name>.herokuapp.com/
	Save the file
	
	npm install

### Run locally
	npm start
	
### Deploy to github pages
	#### Create a new repository on github
	git remote set-url origin https://github.com/<your-github-account>/<repo-name>.git
	Edit package.json
	Change "homepage": "http://techdude101.github.io/home-climate-monitor-ui" to match your github repo-name
		e.g. "homepage": "http://<your-github-account>.github.io/<repo-name>"
		
		
	npm run deploy
	
	Troubleshooting
	
	Problem: fatal: A branch named 'gh-pages' already exists.
	Solution: Delete node_modules\.cache\gh-pages
	
	Problem: Won't deploy to github pages
	Solution: npx gh-pages -d build
	
##### Add devices
	1. Click the Add devices button
	2. Enter a description & the admin / root API key
	3. Click the Add device button
	4. Save the API key generated and the serial number
