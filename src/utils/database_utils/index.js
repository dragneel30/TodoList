import { AsyncStorage } from 'react-native';
import Todo from '../../mappings/Todo'
import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'
import Database from '../../database/Database'


const createDatabase = async () => {
    
    const db = await AsyncStorage.getItem("database_version")
    .then(res => {
      let recreateDb = true;

      if (res) {
        let dbVersion = parseInt(res);
        recreateDb = dbVersion < Database.DATABASE_VERSION;
      }

      if ( recreateDb || res == null ) {
        AsyncStorage.setItem("database_version", Database.DATABASE_VERSION.toString());
      }

      return new Database(recreateDb);
    })
    .catch(ee => {
        console.log(ee)
        return null
    });
    return db
}


export {
    createDatabase
}