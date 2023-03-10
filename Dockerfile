FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install


EXPOSE 3000

CMD ["node","/app/src/index.js"]


