import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Put to the database');

  // Create a connection to the 'jate' database.
  const db = await openDB('jate', 1);

  // Create a new transaction and specify the 'jate' object store and data privileges.
  const tx = db.transaction('jate', 'readwrite');

  // Open up the 'jate' object store.
  const store = tx.objectStore('jate');

  // Use the .put() method on the store to update or add new content.
  // Assuming 'id' is the primary key and auto-incremented, we don't need to provide it explicitly.
  const request = store.put({ content });

  // Get confirmation of the request.
  const result = await request;
  console.log('Data saved to the database', result);
};

;

export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the 'jate' database.
  const db = await openDB('jate', 1);

  // Create a new transaction and specify the 'jate' object store and data privileges.
  const tx = db.transaction('jate', 'readonly');

  // Open up the 'jate' object store.
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result', result);
  return result;
};


initdb();
