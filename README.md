# My App

## Description
A app to connect to people through their thoughts by blogs.

## Technology Stack
This project is built using the Nodes.js, React.js, Express, PostgresSQL stack, which includes:

- **PostgresSQL**: SQL database to store data.
- **Express.js**: Web framework for Node.js to handle routing and server logic.
- **React**: Frontend library for building user interfaces.
- **Node.js**: JavaScript runtime to run the server-side application.

## Prerequisites
Before you begin, ensure you have the following installed on your local machine:

- **Node.js** (v12 or higher)
- **Postgres** (local Postgres Database)
- **npm** (Node Package Manager) or **yarn** (Optional)

## Setup Instructions

### 1. Clone the repository
Clone the repository to your local machine using the following command:


git clone https://github.com/vishalrs18/my-app.git
cd my-app

### 2. Install Dependency
cd my-app-api (backend)
npm install

cd my-app (ui)
npm install

### 3. Env Var
Update Database variables in the env file

### 4. Start server
npm run dev (ui)
npm run start (backend)

### 5. API endpoints
Public routes - /blogs to see all blogs
Protected routes - /blogs/myblogs to see users specific blog and to post as well
Admin privilege to update users permission whether to post a blog or not

### 6. Auth and Security
JWT token to authenticate user and validate user token
CSRF token validation to protect XSS attack 