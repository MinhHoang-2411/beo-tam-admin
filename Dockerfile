FROM node:16-alpine AS build

WORKDIR /app

COPY ./package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy all files
COPY ./ ./

# Build Vite app
RUN yarn build

FROM nginx:alpine

COPY ./deploy/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]