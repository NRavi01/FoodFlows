# Dockerfile
FROM node:alpine AS build-react
WORKDIR /code

COPY foodtracker .
RUN npm install --save react-radio-buttons jsx@latest rc-slider react-script-tag
RUN npm run build


FROM nginx
WORKDIR /code

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-react /code/build /data
COPY foodtracker/src/assets.js /data

ENTRYPOINT ["nginx", "-g", "daemon off;"]