import { Client } from 'pg';

import config from '.';

const client = new Client({
    connectionString : config.databaseUrl
})

async function createDbConnection(){
    try {
        await client.connect();
    } catch (error) {
        console.log('Could not connect to the database. Exiting now...', error);
        process.exit();
    }
}

const connection = createDbConnection();

export {connection,client}