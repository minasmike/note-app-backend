# Use the official Node.js 14 image as the base image
FROM node:20.10.0

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

RUN npm install -g pnpm
# Install the application dependencies
RUN pnpm install

# Copy the application source code to the container
COPY . .

# Expose a port for the application to listen on (if necessary)
EXPOSE 3000

# Specify the command to run the application
CMD ["pnpm", "start"]