
'use server';

import  { MongoClient, Collection, ObjectId } from  'mongodb';
const mongodb_uri = import.meta.env.VITE_MONGODB_URI

class DB {
  dbName: string
  client: MongoClient
  ObjectId = ObjectId 
  constructor(dbName: string) {
    this.dbName = dbName
    this.client = new MongoClient(mongodb_uri);
  } 
  
  async collection(name: string): Promise<Collection> {
    try {
      await this.client.connect();
      return this.client.db(this.dbName).collection(name);
    } catch (error) {
      console.error('Failed to get collection:', error);
      throw new Error('Failed to connect to the database.');
    }
  }
  async close(): Promise<void> {
    try {
      await this.client.close();
      console.log('Database connection closed.');
    } catch (error) {
      console.error('Failed to close the database connection:', error);
    }
  }
}

export default new DB('flibusta');
