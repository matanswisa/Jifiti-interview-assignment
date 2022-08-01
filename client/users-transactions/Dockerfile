FROM node:16-alpine

RUN mkdir -p /home/usersTransactionsClient

WORKDIR /home/usersTransactionsClient

COPY package*.json .
RUN npm install 
COPY . .


EXPOSE 3000
CMD ["npm" ,"start"]