import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'
 
export default class Todo extends BaseModel {
  constructor(obj) {
    super(obj)
  }
 
  static get database() {
    return async () => SQLite.openDatabase('todos.db')
  }
 
  static get tableName() {
    return 'todos'
  }
 
  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true },
      title: { type: types.TEXT, not_null: true },
      isDone: { type: types.BOOLEAN, default: () => false },
      created_at: { type: types.INTEGER, default: () => Date.now() }
    }
  }
}