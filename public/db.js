let db;
// create a new db request for a "budget" database.
const request = indexedDB.open("BudgetTracker", 1);

request.onupgradeneeded = function(event) {
   // create object store called "transactions" and set autoIncrement to true
  const db = event.target.result;
  db.createObjectStore("transactions", { autoIncrement: true });
};

request.onsuccess = function(event) {
  db = event.target.result;

  // check if app is online before reading from db
  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function(event) {
  console.log("Woops! " + event.target.errorCode);
};

function saveRecord(record) {
  // create a transaction on the transactions db with readwrite access
  const transaction = db.transaction(["transactions"], "readwrite");

  // access your transactions object store
  const store = transaction.objectStore("transactions");

  // add record to your store with add method.
  store.add(record);
}


// listen for app coming back online
window.addEventListener("online", checkDatabase);
