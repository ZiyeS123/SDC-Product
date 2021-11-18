FROM node:16.13.0

WORKDIR /product-api

EXPOSE 3000

COPY package.json /product-api/package.json

RUN npm install

COPY . /product-api

CMD ["npm", "start"]