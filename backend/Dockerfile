FROM node:20-alpine

# bcrypt needs these to build its native module
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Install deps first (better layer caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the backend source
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]