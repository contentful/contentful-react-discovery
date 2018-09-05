# Deprecation notice 

This repository is deprecated and no further maintenance is planned.For a Reference example app, please see [https://github.com/contentful/the-example-app.nodejs](https://github.com/contentful/the-example-app.nodejs)

# About

[Contentful](https://www.contentful.com) provides a content infrastructure for digital teams to power content in websites, apps, and devices. Unlike a CMS, Contentful was built to integrate with the modern software stack. It offers a central hub for structured content, powerful management and delivery APIs, and a customizable web app that enable developers and content creators to ship digital products faster.

The Contentful Discovery web app gives you a quick and easy way to preview your content on a web environment, and explore the contents of your Spaces.

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
