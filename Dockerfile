FROM node:latest as build
WORKDIR /usr/local/app
COPY package.json package-lock.json ./
RUN npm install --force
COPY ..
RUN npm run build --prod


FROM nginx:latest
COPY --from=build /usr/local/app/dist/patient-appointment-booking-system /usr/share/nginx/html
EXPOSE 8090