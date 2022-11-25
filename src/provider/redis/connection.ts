import { SetOptions } from "@redis/client"

export class Connection {
    private static instance: Connection = null
    static async kill(): Promise<void> {
        await this.instance?.disconnect()
        this.instance = null
    }

    private constructor(private client: RedisClient) { }

    static make(client: RedisClient) {
        if (this.instance === null) {
            this.instance = new Connection(client)
            this.instance.connect()
        }
        return this.instance
    }

    async get(key: string): Promise<string> {
        try{
            return await this.client.get(key)
        } catch(e) {
            console.error(e)
            return null
        }
    }

    async set(key: string, value: string, options: SetOptions) {
        return await this.client.set(key, value, options)
    }

    async flush() {
        await this.client.flushDb()
    }

    async disconnect() {
        if (this.client?.isOpen)
            await this.client.quit()
    }

    private connect() {
        if (!this.client?.isOpen)
            this.client?.connect()
    }
}

export interface RedisClient {
    get(key: string): Promise<string>
    set(key: string, value: string, options: SetOptions): Promise<any>
    flushDb(): Promise<any>
    connect(): Promise<void>
    quit(): Promise<void>
    isOpen: boolean
}
