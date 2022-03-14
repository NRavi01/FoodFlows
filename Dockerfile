# Dockerfile
FROM node:alpine AS build-react
WORKDIR /code
COPY foodtracker .
RUN npm install
RUN npm run build


FROM nginx
WORKDIR /code

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-react /code/build /data

ENTRYPOINT ["nginx", "-g", "daemon off;"]