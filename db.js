const { MongoClient } = require("mongodb");

const state = {
  db: null,
};

exports.connect = async (url, dbname) => {
  try {
    if (state.db) return;

    const client = new MongoClient(url);
    await client.connect();
    state.db = client.db(dbname);

    console.log("Database connected");
  } catch (err) {
    console.error("DB connection error:", err);
  }
};

exports.get = () => {
  return state.db;
};
