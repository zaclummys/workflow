import { connect } from '../src/data/mongodb/client';

afterEach(async () => {
    const connection = await connect();

    await connection.dropDatabase();
});