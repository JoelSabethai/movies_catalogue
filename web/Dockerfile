# Step 1: Build the Angular application using Node.js
FROM node:14 as build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to install dependencies
COPY ./web/package*.json ./

# Install the dependencies
RUN npm install

# Copy the entire Angular codebase to the container
COPY ./web ./

# Replace placeholder in environment.prod.ts with actual API_URL
ARG API_URL
RUN sed -i "s|__API_URL__|${API_URL}|g" src/environments/environment.prod.ts

# Run the Angular build command to create production-ready assets
RUN npm run build --prod

# Step 2: Serve the Angular application using Nginx
FROM nginx:alpine

# Copy the built Angular app files from the previous step into the Nginx container
COPY --from=build /app/dist/ /usr/share/nginx/html

# Expose port 80 for serving the app via Nginx
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
