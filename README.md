# Facebook Login API Project

## Project Title
Facebook Login and API Integration using Node.js and Ngrok

## Project Purpose
- School project requirement
- Demonstrate Facebook Login
- Connect and test external API (Facebook Graph API)
- Understand OAuth authentication flow
- Practice frontend and backend integration

## Technologies Used
- Node.js
- Passport.js (Facebook Strategy)
- Facebook Graph API
- HTML
- CSS
- JavaScript
- Ngrok

## Meta Developer App
- App Name: test-live-api
- Platform: Facebook Login
- Mode: Development
- Callback URL: Ngrok HTTPS URL
- Reason for Ngrok:
  - Meta requires public HTTPS URLs
  - Localhost is not allowed
  - Strict OAuth and security rules 

## Project Structure
- /public
  - index.html
  - profile.html
  - profile.js
  - profile.css
  - profile.jpg
- config.js
- server.js
- package.json
- README.md

## System Flow
- User opens index.html
- User clicks Login with Facebook
- Redirect to Facebook authentication
- Facebook returns data via callback URL
- Node.js server processes authentication
- User is redirected to profile page
- Profile data is displayed

## Output
- Facebook login page
- Successful authentication
- Profile page showing:
  - Name
  - Email
  - Birthday
  - Profile photo
  - Friends list
- Logout functionality

## Running the Project
- Install dependencies:
  - npm install
- Start server:
  - node server.js
- Expose server:
  - ngrok http 3000

## Team Members and Contributions
- Gian
  - Backend development
  - Facebook API integration
  - Server setup
  - Ngrok configuration
- Chay
  - Frontend design
  - HTML and CSS layout
  - UI styling
- Ivan
  - JavaScript logic
  - Data fetching
  - Testing and validation

## Notes
- Friends and photos are limited by Facebook API policies
- Fallback data is used for testing
- Project is for educational purposes only
