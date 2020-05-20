import { openDb } from 'idb';
/**
 * Initialize the IndexedDB.
 * see https://developers.google.com/web/ilt/pwa/lab-indexeddb
 * for information as to why we use switch w/o breaks for migrations.
 * add do the database version and add a switch case each time you need to
 * change migrations
 */
async function db() {
  return await openDb('SDP_POC', 1, upgradeDB => {
    switch (upgradeDB.oldVersion) {
      // Note: we don't use 'break' in this switch statement,
      // the fall-through behavior is what we want.
      case 0:
        upgradeDB.createObjectStore('recentVehicles', {
          keyPath: 'id',
          autoIncrement: true
        });
        break;
      default:
        break;
    }
  });

};

export async function getAll() {
  const dbinstance = await db();
  const tx = await dbinstance.transaction('recentVehicles');
  const data = [];

  tx.objectStore('recentVehicles').iterateCursor(cursor => {
    if (!cursor) {
      return;
    }
    data.push(cursor.value);
    cursor.continue();
  });
  await tx.complete;
  return data;
}

export async function add(data) {
  const dbinstance = await db();
  const store = await dbinstance.transaction('recentVehicles', 'readwrite').objectStore('recentVehicles');
  await store.put(data);
}

export async function removeParticluar(data) {
  const dbinstance = await db();
  data.forEach(item => {
    console.log(`deleting key for ====> ${item.vehicle}, ${item.id}`);
    const tx = dbinstance.transaction('recentVehicles', 'readwrite');
    tx.objectStore('recentVehicles').delete(item.id);
    return tx.complete;
  });
}
