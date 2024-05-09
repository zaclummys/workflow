import { connect } from '../../../src/data/mongodb/client';

describe('Mongo DB', () => {
    it('Can connect to client', async () => {
        await connect();
    });
});