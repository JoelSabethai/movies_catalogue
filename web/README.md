# Web - Angular 12 + TypeScript

## Main Technologies

- [Angular CLI](https://github.com/angular/angular-cli) version 12.2.18.
- [NodeJS](https://nodejs.org/download/release/latest-v14.x/) version 14.21.3
- [Taildwind](https://v2.tailwindcss.com) version 2.2.17
- [ngx-toastr](https://www.npmjs.com/package/ngx-toastr) version 14.3.0
- [TypeScript](https://www.typescriptlang.org/) version 4.3.5
- [ngx-pagination](https://www.npmjs.com/package/ngx-pagination) version 6.0.3
- [fortawesome](https://docs.fontawesome.com) version 6.7.2

## Structure
``` bash
project/
├── src/
│   ├── app/
│   │   ├── core/                               # Singleton services, interceptors, guards, global config
│   │   │   ├── guards/                         # Route guards (e.g., AuthGuard)
│   │   │   ├── interceptors/                   # HTTP interceptors (e.g., JwtInterceptor, ErrorInterceptor)
│   │   │   ├── initializers/                   # App Initializers (e.g., load config before app starts)
│   │   │   └── models/                         # Core-level interfaces/types (e.g., BaseResponse)
│   │   ├── shared/                             # Reusable components, pipes, directives
│   │   ├── features/                           # Feature-specific modules and components (optional)
│   │   ├── welcome/                            # Public landing/welcome page
│   │   ├── movies/                             # Movies feature module
│   │   │   ├── components/                     # MovieCard, MovieFilter, etc.
│   │   │   ├── pages/                          # MovieCatalogPage, MovieDetailPage, etc.
│   │   │   ├── services/                       # MovieApiService
│   │   │   ├── models/                         # Movie interface, etc.
│   │   |   ├── movies.component.ts             # Movies module
│   │   │   └── movies-routing.module.ts        # Routes for movie-related views
│   │   ├── auth/                               # Authentication feature module
│   │   │   ├── components/                     # Auth components, etc.
│   │   │   ├── pages/                          # LogIn, Register, etc.
│   │   │   ├── services/                       # AuthApiService
│   │   │   ├── models/                         # Auth interface, etc.
│   │   |   ├── auth.component.ts               # Auth module
│   │   │   └── auth-routing.module.ts          # Routes for auth-related views
│   │   ├── app-routing.module.ts               # Main routing configuration
│   │   ├── app.component.ts                    # Root component
│   │   └── app.module.ts                       # Root module of the application
│   │
│   ├── assets/                                 # Static resources (images, files, etc.)
│   ├── environments/                           # Environment-specific config files (dev, prod)
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   │
│   ├── index.html                              # Main HTML entry point
│   ├── main.ts                                 # Main entry point of the application
│   ├── styles.css                              # Global styles (could be .css, .scss, etc.)
│   └── polyfills.ts                            # Compatibility for older browsers
│ 
├── angular.json                                # Angular project configuration
├── package.json                                # Project dependencies and scripts
├── tailwind.config.js                          # Tailwind CSS configuration
└── tsconfig.json                               # TypeScript configuration
```

## Setup project

1. **Install dependencies**

    Run the following command to install all project dependencies: `npm install`.

2. **Environment configuration**

    Add to environment.ts or environment.prod.ts your API URL with the name **apiUrl**.
    
    e.g.: `apiURL: 'http://localhost:3000'`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive | pipe | service | class | guard | interface | enum | module`.

## Build production directory

Run `ng build --prod` to build the project. The build artifacts will be stored either directly in the `dist/` directory or in a subdirectory named after your application (e.g., `dist/your-app-name`), depending on your Angular configuration.

Copy the generated files to your server:
- If you're using a cPanel-based server, upload the files to the `public_html` directory.
- If you're using a Linux VPS, upload the files to the html folder located at `/var/www/html`.
