FROM node:6

RUN mkdir -p /usr/src/app
VOLUME "./:/usr/src/app"
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY ./ ./
EXPOSE 9020

CMD ["npm", "start"]
