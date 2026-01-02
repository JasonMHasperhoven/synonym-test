import { User } from '../types/user';
import Dexie, { type Table } from 'dexie';

interface UsersDBType {
  usersByPage: Table<{ page: number; users: User[] }>;
}

const db = new Dexie('UsersDB') as Dexie & UsersDBType;

db.version(1).stores({
  usersByPage: '++id, page'
});

export { db };
