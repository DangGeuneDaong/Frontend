FROM node:20-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "run", "start"]

FROM nginx as production-stage 

RUN mkdir /app 

COPY --from=build-stage /app/dist /app 

COPY nginx.conf /etc/nginx/nginx.conf 

RUN service nginx restart 