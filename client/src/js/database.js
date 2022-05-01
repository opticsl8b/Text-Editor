import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log("Updating Process");
    // create connection to db and pick the version
    const jateDb = await openDB("jate", 1);
    // create a new transaction with the handle type
    const tx = jateDb.transaction("jate", "readwrite");
    
    const store = tx.objectStore("jate");
    
    const req = store.put({ id:1,data:content });
    
    const result = await req;

    console.log("Updated Key:", result);

    return result;
  } catch (err) {
    console.error("putDb not implemented");
  }

};



// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log("Retriving all content");
    // create connection to db and pick the version
    const jateDb = await openDB("jate", 1);
    // create a new transaction with the handle type
    const tx = jateDb.transaction("jate", "readonly");

    const store = tx.objectStore("jate");

    const id = 1;

    const req = store.get({ id });
    
    const result = await req;

    console.log("All Data", result);

    return result;
  } catch (err) {
    console.error("getDb not implemented");
  }
};



initdb();
