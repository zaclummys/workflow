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
    serverApi: {
        strict: true,
        deprecationErrors: true,
        version: ServerApiVersion.v1,
    },
});

export default client;