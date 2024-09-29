import database from "~/core/data/mongodb/database";

describe('MongoDB Database', () => {
    it('Should ping to DB', async () => {
        const { ok } = await database.command({
            ping: 1
        });
       
        expect(ok).toBe(1);
    });
    
    it.each([
        ['users', [
            { id: 1 },
            { email: 1 },
        ]],
        
        ['sessions', [
            { id: 1 },
            { token: 1 },
        ]],
        ['workspaces', [{ id: 1 }]],
        ['workflow-versions', [
            { id: 1 },
            { workflowVersionId: 1, number: 2 },
        ]],
        ['workflow-executions', [{ id: 1 }]],
    ])('Collection %s should have unique indexes', async (collectionName, uniqueIndexKeys) => {
        const indexes = await database.collection(collectionName).listIndexes().toArray();
        
        expect(indexes).toStrictEqual(
            expect.arrayContaining(
                uniqueIndexKeys.map(uniqueIndexKey => (
                    expect.objectContaining({
                        key: uniqueIndexKey,
                        unique: true,
                    })
                ))
            )
        );
    })
});