FROM node:6

RUN mkdir -p /usr/src/app
VOLUME "./:/usr/src/app"
WORKDIR /usr/src/app
RUN npm set progress=false && \
    npm install -g --progress=false yarn
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY ./ ./
EXPOSE 9020

CMD ["yarn", "start"]
