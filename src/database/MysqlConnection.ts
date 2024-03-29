import mysql, { Pool } from "mysql2/promise";

export class MysqlConnection {
    private pool: Pool;

    constructor(private dbConfig: mysql.PoolOptions) {
        this.pool = mysql.createPool(this.dbConfig);
    }

    async getConnection(): Promise<mysql.PoolConnection> {
        try {
            const connection = await this.pool.getConnection();
            console.log('Conexion a mysql exitosa!');
            return connection;            
        } catch (error) {
            throw new Error("Error al establecer la conexion"+ error);            
        }
    }
}

// no es un singleton por que en el Singleton el constructor debe ser privado y este caso no.