import { FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";

let rtDatabase: Database | undefined = undefined;

export default {
  initDatabse(firebaseApp: FirebaseApp): Database {
    rtDatabase = getDatabase(firebaseApp);
    return rtDatabase;
  },
  getDatabase(): Database | undefined {
    return rtDatabase;
  },
};
