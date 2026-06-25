FROM node:20-alpine

WORKDIR /app

# Install deps first (better layer caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend source
COPY . .

EXPOSE 5173

# --host is required so Vite's dev server is reachable from outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]