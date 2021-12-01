FROM node:14.18.1-slim

WORKDIR /app-backend

COPY package.json /app-backend/
COPY package-lock.json /app-backend/

RUN ["npm", "install"]

COPY . .

EXPOSE 5000

CMD ["npm", "start"]

