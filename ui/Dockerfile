# Stage 1: Build the Vite application
FROM node:22-alpine AS builder

WORKDIR /app

# Accept build args for Vite environment variables
ARG VITE_MSAL_CLIENT_ID
ARG VITE_MSAL_AUTHORITY
ARG VITE_MSAL_REDIRECT_URI

# Set them as ENV so Vite sees them during `npm run build`
ENV VITE_MSAL_CLIENT_ID=$VITE_MSAL_CLIENT_ID
ENV VITE_MSAL_AUTHORITY=$VITE_MSAL_AUTHORITY
ENV VITE_MSAL_REDIRECT_URI=$VITE_MSAL_REDIRECT_URI

# Install dependencies first for better caching
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy custom Nginx configuration to support React Router SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder phase
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
