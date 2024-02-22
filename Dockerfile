# Stage 1: Build the Angular application
FROM node:20 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli

COPY . .

RUN ng build --configuration production

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

COPY --from=build /usr/src/app/dist/insurer-sign-up/browser /usr/share/nginx/html

# Overwrite the default nginx.conf with our custom file
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
