import {randomBytes} from "crypto";

import client from './client';

const database = client.db('workflow');

const users = database.collection('users');
const sessions = database.collection('sessions');
const workspaces = database.collection('workspaces');

users.createIndex({
    id: 1,
}, {
    unique: true,
});

users.createIndex({
    email: 1,
}, {
    unique: true,
});

sessions.createIndex({
    id: 1,
}, {
    unique: true,
});

sessions.createIndex({
    token: 1,
}, {
    unique: true,
});

workspaces.createIndex({
    id: 1,
}, {
    unique: true,
});

export default database;