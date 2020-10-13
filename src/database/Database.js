import { AsyncStorage } from 'react-native';
import Todo from '../mappings/Todo'
import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'

export default class Database {
    static DATABASE_NAME = 'todos'
    static DATABASE_VERSION = 4
    static DATABASE_DESCRIPTION = ''
    
    constructor(recreateDb) {
        
      this.db = SQLite.openDatabase(
        Database.DATABASE_NAME,
        Database.DATABASE_VERSION,
        Database.DATABASE_DESCRIPTION,
        1234
      );
      if (recreateDb) {
         Todo.dropTable()
         Todo.createTable()


      }
    }
  
    close = () => { 
      //this.db.close();
    };
  
    query = query => {
      return new Promise((resolve, reject) => {
        this.db.transaction(tx => {
          tx.executeSql(
            query,
            [],
            (tx, rs) => {
              resolve(rs);
            },
            (t, err) => {
              reject(err);
            }
          );
        });
      });
    };
  
}
