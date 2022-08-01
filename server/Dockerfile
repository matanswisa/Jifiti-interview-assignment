FROM node:16-alpine

RUN mkdir -p /home/usersTransactionsServer

WORKDIR /home/usersTransactionsServer

COPY package*.json .
RUN npm install 
COPY . .


EXPOSE 8000
CMD ["npm" ,"start"]