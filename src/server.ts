/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { log, WebHost, Asset, AssetContainer } from '@microsoft/mixed-reality-extension-sdk';
import dotenv from 'dotenv';
import { resolve as resolvePath } from 'path';
import App from './app';

// Read .env if file exists
dotenv.config();

process.on('uncaughtException', err => console.log('uncaughtException', err));
process.on('unhandledRejection', reason => console.log('unhandledRejection', reason));

log.enable('app');

// Start listening for connections, and serve static files
const server = new WebHost({
    // baseUrl: 'http://<ngrok-id>.ngrok.io',
    baseDir: resolvePath(__dirname, '../public')
});

const assets = AssetContainer

// Handle new application sessions
server.adapter.onConnection(context => new App(context, server.baseUrl, new assets(context)));
