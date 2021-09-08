import {createConnection, ConnectionOptions} from "typeorm";


if (!global._entityList) global._entityList = new Set();
if (!global._migrationList) global._migrationList = new Set();

export function registerEntity(entity) {
    global._entityList.add(entity);
}

export function registerMigration(migration) {
    global._migrationList.add(migration);
}

export function _bootstrap() {
    let config: ConnectionOptions = {
        "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": "test",
        "password": "test",
        "database": "test",
        entities: Array.from(global._entityList),
        migrations: Array.from(global._migrationList)
     };

    const connection =  createConnection(config);
}