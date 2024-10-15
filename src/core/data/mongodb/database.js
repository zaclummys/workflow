import client from './client';

const database = client.db();

const users = database.collection('users');
const sessions = database.collection('sessions');
const workspaces = database.collection('workspaces');
const workflowVersions = database.collection('workflow-versions');
const workflowExecutions = database.collection('workflow-executions');

users.createIndex({ id: 1, }, { unique: true });
users.createIndex({ email: 1 }, { unique: true });

sessions.createIndex({ id: 1 }, { unique: true });
sessions.createIndex({ token: 1 }, { unique: true });

workspaces.createIndex({ id: 1 }, { unique: true });

workflowVersions.createIndex({ id: 1 }, { unique: true });
workflowVersions.createIndex({ id: 1, number: 2 }, { unique: true });

workflowExecutions.createIndex({ id: 1 }, { unique: true });

export default database;