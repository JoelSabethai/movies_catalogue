# Project
Movie Catalogue (Web and REST API)

# Deploy Angular + Node.js + MongoDB with Docker & Render

This project contains a full-stack application with:

- Angular 12 frontend (web)
- Node.js 20 backend (API)
- MongoDB database (MongoDB Atlas)

## Project Structure

```
project/
│
├── api/                                # Node.js 20 API
│   ├── Dockerfile                      # Dockerfile for backend
│   ├── Dockerfile.dev                  # Dockerfile for backend development
│   ├── .env                            # Environment variables (not committed)
│   └── src/                            # Your Node.js source code
│
├── web/                                # Angular 12 app
│   ├── Dockerfile                      # Dockerfile for frontend
│   ├── Dockerfile.dev                  # Dockerfile for frontend development
│   └── src/                            # Angular source code
│
├── .env                                # Global env for Docker Compose (API_PORT, API_URL, DB credentials)
├── docker-compose.yml                  # Compose file for production
├── docker-compose.prod.yml             # Compose file for production frontend
└── docker-compose.override.yml         # Optional override for development with hot reload
```

## Environment Variables (root level)

- For the API, ensure that the port and MongoDB credentials match those specified in the `.env` file inside the `api/` directory.
- For Angular, make sure to specify the URL where the REST API is running.

## Develop Environment

Run using the command `docker-compose up -d`. This uses docker-compose.override.yml to mount the code as volumes and run Angular (`ng serve`) and the API (`nodemon`).

## Production Environment

Run using the command `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d`.

This will:
- Build the Angular frontend using `npm run build`.
- Start the API with `npm start`.
- Serve Angular using Nginx.
- Access the app at: `http://localhost:4200`.

### Note on using `-d` with Docker Compose

The `-d` flag in the `docker-compose up -d` command runs the services in the background (detached mode), allowing containers to keep running without occupying the terminal. This is ideal for production environments or when you want the application to stay up in the background.

## Create MongoDB

To create a MongoDB database, you can use [MongoDB Atlas](https://www.mongodb.com/) by following these steps:
- Sign up on the website or log in if you already have an account.
- Create a new project or use the default one created by Atlas.
- Go to **DATABASES/clusters** and click on **"Create"**.
- Select the type of cluster you need and click the **"Create Deployment"** button.
- A modal will appear prompting you to set a **username** and **password** save these in a secure location.
- Within the modal, click the **"Choose a connection method"** button and select the language/framework you will use. Copy the **connection string** if needed and save it.

### Note
Inside the project, under the **Security** section, click on **Network Access** to add your API server's IP(s) to the whitelist.
- Click on **ADD IP ADDRESS** and enter the IP and a comment about it.
- Repeat the process for any other IPs if necessary.

## Deploy Projects

To deploy your projects, you can use any hosting provider, such as [Render](https://render.com/), by following these steps:

- Create a new account or log in if you already have one.

### Deploy API

- Go to Workspace **Settings** and click on **"Projects"**.
- Choose the **"Web Services"** option.
- Select the option that best suits your needs to specify the repository where the project is located.
- Indicate the root directory of the project if necessary.
- Select **Docker** as the environment.
- Configure the environment variables one by one, or upload a `.env` file containing the variables.
- Finally, click the **"Deploy Web Service"** button.
- Copy the URL where the API was deployed.

### Note

- In the **Connect** menu, click to get the list of possible IPs to add to the whitelist in **MongoDB Atlas**.

### Deploy Web

- Go to **Workspace Settings** and click on **Add New**.
- Choose the **Static Site** option.
- Select the option that best suits your needs to specify the repository where the project is located.
- Indicate the root directory of the project if necessary.
- Specify the build command. For Angular, it will be `npm install && npm run build:production`, assuming the build script has been properly configured in the `package.json`.
- Indicate the directory where the output files are generated. This is configured in the `angular.json` file under the `outputPath` value.
- Configure the environment variables one by one, or upload a `.env` file containing the variables.
- Finally, click the **"Deploy Static Site"** button.
- Copy the URL where the web application was deployed.


### Note

If you need to update the API or the web app, go to the dashboard **Settings** and click on **Projects**:
- In the list of active services, choose the one you want to update.
- Click on the **Manual Deploy** menu and select **Deploy latest commit**.