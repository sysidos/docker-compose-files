FROM node:alpine

# Create work directory
WORKDIR /app

# Install runtime dependencies
RUN npm install yarn -g
RUN npm install typescript -g

# Copy app source to work directory
COPY . /app

# Install app dependencies
RUN yarn install

# Build
RUN yarn build

EXPOSE 3000
CMD node build/main.js

# RUN npm install -g nodemon ts-node typescript

# CMD tail -f /dev/null
