import { afterAll, beforeEach } from 'vitest';

import database from "~/core/data/mongodb/database.js";

beforeEach(async () => {
    await database.dropDatabase();
});