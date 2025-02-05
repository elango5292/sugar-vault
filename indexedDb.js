import localforage from "localforage"

const db = localforage.config({
  driver: localforage.INDEXEDDB,
  name: "sugar-vault",
  description: "IndexedDB for SugarVault"
})

export default db
