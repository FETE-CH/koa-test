import * as mysql from 'mysql';

const defaultConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
    connectionLimit: 20
};

export default class AsyncMysql {

    private static instance: AsyncMysql;
    private pool: mysql.Pool;

    private constructor(config = defaultConfig) {
        this.pool = mysql.createPool(config);
    }

    static getInstance(): AsyncMysql {
        if (!AsyncMysql.instance) {
            AsyncMysql.instance = new AsyncMysql();
        }
        return this.instance;
    }

    query(sql: string, values: any) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err: mysql.MysqlError, conn: mysql.PoolConnection) => {
                if (err) return reject(err);
                conn.query(sql, values, (err, rows: any) => {
                    if (err) reject(err);
                    else resolve(rows);
                    conn.release();
                });
            });
        });
    }

    get(sql: string, values: any): object {
        try {
            return this.query(sql, values).then((rows: any) => {
                if (rows.length >= 1) {
                    return rows[0];
                }
            });
        } catch (err) {
            return new Promise((resolve, reject) => {
                reject(err);
            });
        }
    }

}
