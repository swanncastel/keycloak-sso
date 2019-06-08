FROM node:10 as builder
WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN npm run build

FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
