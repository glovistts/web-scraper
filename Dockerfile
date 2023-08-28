FROM node:18.17.0
WORKDIR /usr/src/Projects/WebSraper
COPY package*.json ./
RUN npm install pm2 -g
RUN npm install
COPY . .
EXPOSE 25041
CMD ["pm2-runtime", "app.js", "-i", "max"]