FROM node:6

RUN mkdir -p /usr/src/app
VOLUME "./:/usr/src/app"
WORKDIR /usr/src/app
ADD ./ ./
RUN npm install 
EXPOSE 9020

CMD ["npm", "start"]
