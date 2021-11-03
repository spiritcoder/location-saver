import * as sqlite from 'sqlite3'
const sqlite3 = sqlite.verbose();
let db = new sqlite3.Database('./sqlite.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

export default class {

    static setupDbForDev() {
        db.serialize(function () {
            //   Drop Tables:
            const dropUsersTable = "DROP TABLE IF EXISTS placs";
            db.run(dropUsersTable);
            const dropItemsTable = "DROP TABLE IF EXISTS users";
            db.run(dropItemsTable);
            
            // Create Tables:
            const createUsersTable = "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,name, email TEXT, password text)";
            if (db.run(createUsersTable)) {
                console.log("created")
            }
            const createItemsTable = "CREATE TABLE IF NOT EXISTS places (ID INTEGER PRIMARY KEY AUTOINCREMENT, latitude TEXT, longitude TEXT, name TEXT, image_url TEXT)";
            db.run(createItemsTable);
        });
    }

    static all(stmt: string, params: Array<string>) {
        return new Promise((res, rej) => {
            db.all(stmt, params, (error, result) => {
                if (error) {
                    return rej(error.message);
                }
                return res(result);
            });
        })
    }
    static get(stmt: string, params: Array<string>) {
        return new Promise((res, rej) => {
            db.get(stmt, params, (error, result) => {
                if (error) {
                    return rej(error.message);
                }
                return res(result);
            });
        })
    }

    static run(stmt: string, params: Array<string>) {
        return new Promise((res, rej) => {
            db.run(stmt, params, (error: any, result: any) => {
                if (error) {
                    return rej(error.message);
                }
                return res(result);
            });
        })
    }


}