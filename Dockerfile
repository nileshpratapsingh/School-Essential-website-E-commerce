FROM node:lts-alpine

# Set the working directory
WORKDIR "/my website"

# Copy all files to the container
COPY . .

# Install dependencies if package.json exists
RUN if [ -f package.json ]; then npm install && npm audit fix --force; fi

# Expose the port
EXPOSE 3000

# Install serve globally
RUN npm install -g serve

# Start the server
CMD ["serve", "-s", "."]

# this file will work for react but next time we will use nginx engine to serve the container it require diffrent tyoes of engine to run btw the containers are working