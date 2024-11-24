# Stage 1: Build
FROM node:22.5.1 AS build

# Set working directory inside the container
WORKDIR /app

# Copy package files to avoid reinstalling dependencies unnecessarily
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Stage 2: Runner
FROM node:22.5.1 AS runner

# Set working directory inside the container
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app /app

# Expose the application port
EXPOSE 8000

# Start the application
CMD ["npm", "start"]
