# API Backend - Node.js + Express + TypeScript

## Main Technologies

- [Node.js](https://nodejs.org/) version 20.11.1
- [Express](https://expressjs.com/) version 5.1.0
- [TypeScript](https://www.typescriptlang.org/) version 5.8.3
- [Mongoose](https://mongoosejs.com/) version 8.14.1
- [Clerk](https://clerk.dev/) version 1.4.14
- [TMDB](https://developer.themoviedb.org/docs/getting-started) API version 3
- [Joi](https://joi.dev/) version 17.13.3
- [dotenv](https://www.npmjs.com/package/dotenv) version 16.5.0
- [env-var](https://www.npmjs.com/package/env-var) version 7.5.0
- [axios](https://axios-http.com/es/docs/intro) version 1.9.0

## Structure
``` bash
project/
├── src/
│   ├── config/                         # Environment and database configuration
│   │   ├── index.ts                    # Loads environment variables (.env)
│   │   └── mongooseOptions.ts          # Mongoose connection options
│   │
│   ├── controllers/                    # Controllers that handle route logic
│   │   └── *.controller.ts
│   │
│   ├── db/models/                      # Mongoose models (MongoDB)
│   │   └── *.model.ts
│   │
│   ├── loaders/                        # Modular service initializers
│   │   ├── express.ts                  # Sets up middlewares and routes
│   │   ├── index.ts                    # Executes all loaders
│   │   └── mongoose.ts                 # Connects to MongoDB
│   │
│   ├── middlewares/                    # Custom middlewares
│   │   ├── auth.handler.ts             # Clerk authentication middleware
│   │   ├── endpoint.handler.ts         # Middleware for endpoint validation
│   │   ├── errors.handler.ts           # Centralized error handling
│   │   ├── logger.ts                   # Request/logging middleware
│   │   └── validator.handler.ts        # Input validation middleware
│   │
│   ├── routes/                         # API route definitions
│   │   └── index.ts                    # Main route registration file
│   │
│   ├── schemas/                        # Validation schemas (e.g., Zod, Joi)
│   │   └── *.schema.ts
│   │
│   ├── services/                       # Reusable business logic
│   │   └── *.service.ts
│   │
│   ├── types/                          # Custom TypeScript types
│   │   └── global.d.ts                 # Global types (e.g., Express extensions)
│   │
│   └── index.ts                        # Main entry point (starts the server)
│
├── .env                                # Environment variables
├── .env.example                        # Example environment variables file
├── package.json                        # Project dependencies and scripts
├── package-lock.json                   # Locked dependency versions
└── tsconfig.json                       # TypeScript configuration
```

## Setup project

1. **Install dependencies**

    Run the following command to install all project dependencies: `npm install`.

2. **Environment configuration**

    Run the following command to copy the example file and create your own .env file: `cp .env.example .env`. Then fill in the required variables to connect to the database, the TMDB API, Clerk authentication, and other services.

### Setup TMDB (The Movie DB) API

1. Create an account at [TMDB (The Movie DB)](https://developer.themoviedb.org/docs/getting-started).
2. Go to your account settings.
3. Select the API section (you’ll be asked to complete a form).
4. Copy your API Key and paste it into the .env file under the variable `TMDB_API_KEY`.
5. Set the `TMDB_BASE_URL` variable in the .env file using the appropriate base URL from the TMDB documentation [TMDB documentation](https://developer.themoviedb.org/reference/intro/getting-started).

### Setup Clerk (user authentications)

1. Create an account at [clerk](https://clerk.com/).
2. In your account dashboard, go to **Configure**.

**Session management**

1. Under the **Sessions** section, set the session lifetime according to your needs.
2. In the **JWT Templates** section, create a new template to generate authentication tokens.

**Developers**

In the API Keys section, select the environment you’re working with (for this project, choose Express) and copy the API keys:

- `CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

Paste them into your .env file.

**Implementation**

To implement Clerk, follow the official documentation for integrating the Express SDK: [Clerk Express Quickstart](https://clerk.com/docs/quickstarts/express).

To handle sessions and authentication tokens, refer to the JS Backend SDK: [JS Backend SDK Documentation](https://clerk.com/docs/references/backend/overview).
- Use the **Users** reference to implement login by retrieving a user via email and verifying the password, and to register new users.
- Use the **Sessions** reference to manage user sessions and generate authentication tokens.¿
 
## Development server

Run `npm run dev` to start the development server. Navigate to `http://localhost:{PORT}`, where `{PORT}` is the value specified in the .env file (default is 3000). The app will automatically reload when you modify source files.

## Build production directory

Run `npm run build` to compile the project. The build artifacts will be stored in the `build/` directory.

Run `npm start` to start the compiled (production) version of the server.
