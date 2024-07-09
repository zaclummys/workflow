import { afterAll, beforeEach } from 'vitest';
import { database } from "~/core/data/mongodb/client";

afterAll(async () => {
    await database.dropDatabase();
});

beforeEach(async () => {
    await database.dropCollection('users');
});