# NoteApp Backend Readme

This is a README file for the backend of the NoteApp. The backend is responsible for handling API requests, managing the database, and providing data to the frontend.

## Dockerfile

The Dockerfile provided sets up the containerized environment for running the backend. It uses the official Node.js 14 image as the base image and performs the following steps:

1. Sets the working directory in the container to `/app`.

2. Copies the `package.json` and `package-lock.json` files to the container.

3. Installs the `pnpm` package manager globally.

4. Runs `pnpm install` to install the application dependencies.

5. Copies the application source code to the container.

6. Exposes port `3000` for the application to listen on.

7. Specifies the command `pnpm start` to run the application.

To build and run the backend using Docker, run the following commands in the terminal:

```shell
docker build -t backend-image .
docker run -p 3000:3000 backend-image
```

## Docker Compose

The provided Docker Compose file sets up the required services for the backend. It includes a PostgreSQL database service and an app-network for communication between services. The database service uses the latest PostgreSQL image and sets the necessary environment variables for configuration.

To run the backend and the PostgreSQL database using Docker Compose, uncomment the `node-app` service in the Docker Compose file and run the following command:

```shell
docker-compose up
```

## Package.json

The `package.json` file contains the dependencies and scripts necessary for the backend. The main scripts include:

- **dev**: Runs the backend using `nodemon` for automatic reloading during development.

The main dependencies include:

- **bcrypt**: A library for hashing passwords.

- **body-parser**: A middleware for parsing request bodies.

- **cors**: A middleware for enabling Cross-Origin Resource Sharing.

- **dotenv**: A module for loading environment variables from a `.env` file.

- **express**: A fast and minimalist web framework for Node.js.

- **joi**: A library for data validation.

- **jsonwebtoken**: A library for generating and verifying JSON Web Tokens (JWT).

- **pg**: A PostgreSQL client for Node.js.

- **sequelize**: A promise-based ORM (Object-Relational Mapping) for Node.js.

The dev dependencies include:

- **morgan**: A middleware for logging HTTP requests.

- **nodemon**: A tool for automatically restarting the Node.js application when file changes are detected.

## License

The backend for the NoteApp is released under the [ISC License](LICENSE).
