import {
    MongoClient,
    ServerApiVersion, 
} from 'mongodb';

function extractUriFromEnv () {
    if (process.env.NODE_ENV === 'test') {
        return process.env.VITE_MONGODB_URI;
    } else {
        return process.env.MONGODB_URI;
    }
}

const uri = extractUriFromEnv();

if (!uri) {
    throw new Error('MongoDB URI cannot be empty');
}

const client = new MongoClient(uri, {
    monitorCommands: true,
    serverApi: {
        strict: true,
        deprecationErrors: true,
        version: ServerApiVersion.v1,
    },
});

const database = client.db('workflow');

const users = database.collection('users');

const sessions = database.collection('sessions');

const workspaces = database.collection('workspaces');

await global.Promise.all([
    users.createIndex({
        id: 1, 
    }, {
        unique: true, 
    }),
    users.createIndex({
        email: 1, 
    }, {
        unique: true, 
    }),

    sessions.createIndex({
        id: 1, 
    }, {
        unique: true, 
    }),
    sessions.createIndex({
        token: 1, 
    }, {
        unique: true, 
    }),

    workspaces.createIndex({
        id: 1, 
    }, {
        unique: true, 
    }),
]);

export {
    database, 
};