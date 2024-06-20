# Use an official Node runtime as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object

# Copy the entire project to the working directory
COPY . .

# Disable source map generation
ENV GENERATE_SOURCEMAP=false

# Build the React app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]

# docker build -t medimanager .
