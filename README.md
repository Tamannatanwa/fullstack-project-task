Overview
This User Management API provides essential functionalities for user registration, login with hashed password storage and OTP verification, and CRUD operations for profile management. Additionally, frontend interfaces have been developed for each API, featuring local storage for logout functionality, routers, and OTP verification logic.

API Endpoints
1. User Registration
Endpoint: /api/register
Method: POST
Description: Registers a new user with hashed password storage and OTP verification.
Request Body:
username: User's username
password: User's password
email: User's email address
Response:
status: Status of the request (success/failure)
message: Additional message (e.g., success message or error details)
2. User Login
Endpoint: /api/login
Method: POST
Description: Authenticates a user using OTP verification.
Request Body:
username: User's username
otp: One-time password sent to the user's email
Response:
status: Status of the request (success/failure)
message: Additional message (e.g., success message or error details)
3. Profile Management
Endpoint: /api/profile/:userId
Method: GET, PUT, DELETE
Description: Manages user profiles (fetch, update, delete).
Request Parameters:
userId: ID of the user profile to be accessed
Request Body (for PUT):
username: Updated username
email: Updated email address
Response:
status: Status of the request (success/failure)
data: Retrieved user profile data (for GET request)
Frontend Integration
The frontend interfaces have been developed using React.js and integrated with the backend API endpoints. The following features have been implemented:

Signup Interface: Allows users to register with a username, password, and email address. Upon successful registration, an OTP is sent to the user's email for verification.
Login Interface: Provides a login form where users can enter their username and OTP received via email to authenticate.
Profile Management Interface: Displays user profile information and allows users to update or delete their profiles.
Logout Functionality: Implemented using local storage for seamless logout functionality.
Router Integration: Integrated routers for smooth navigation between different sections of the application.
OTP Verification Logic: Incorporated OTP verification logic in the frontend for secure authentication.
Usage
Setup Instructions
Clone the repository from GitHub.
Install dependencies using npm install.
Run the backend server using npm start.
Run the frontend application using npm start.
API Usage Guide
Refer to the API documentation for available endpoints and their functionalities.
Use appropriate HTTP methods (POST, GET, PUT, DELETE) to interact with the API.
Ensure proper handling of responses (success or failure) in frontend implementations.
