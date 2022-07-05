const { createApp, Client, createProxyConfig } = require('@unleash/proxy');
const express = require('express');

const options = {};
const config = createProxyConfig(options);
const client = new Client(config);

client.unleash.on('ready', console.log);
client.unleash.on('synchronized', console.log);
client.unleash.on('error', console.error);
client.unleash.on('warn', console.warn);

const wrappingApp = express();
wrappingApp.use((req, res, next) => {
  if (client.isReady()) {
    return next();
  }

  client.on('ready', () => {
    next();
  });
})

const app = createApp(options, client, wrappingApp);

exports.unleashProxy = app
