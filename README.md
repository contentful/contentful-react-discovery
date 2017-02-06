# About

[Contentful](https://www.contentful.com) is a content management platform for web applications, mobile apps and connected devices. It allows you to create, edit & manage content in the cloud and publish it anywhere via a powerful API. Contentful offers tools for managing editorial teams and enabling cooperation between organizations.

The Contentful Discover web app gives you a quick and easy way to preview your content on a web environment, and explore the contents of your Spaces.

You can try out the app at https://discovery.contentful.com/ or you can check out the source code and suggest your own improvements.

# Running discovery-app locally

## Prepare

clone the app and `cd` to the directory

```shell
git clone https://github.com/contentful/discovery-app-react
```

## Install dependencies via npm

```shell
npm install
```

## Install dependencies via yarn

```shell
yarn
```

## Start the app

```shell
npm start
```

Open `http://0.0.0.0:9020` in your browser to see the app.

Yarn users alternatively can use `yarn start` to start the app.

# Using Docker

clone the app and `cd` to the directory

```shell
git clone https://github.com/contentful/discovery-app-react
```

Build the docker image

```shell
docker build -t discovery-app .
```

Run the docker image

```shell
docker run -it --rm -p 9020:9020 discovery-app
```

Open `http://0.0.0.0:9020` in your browser to see the app
