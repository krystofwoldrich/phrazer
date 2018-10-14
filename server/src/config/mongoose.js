import mongoose from "mongoose";

const mongooseConfig = () => {
  mongoose.connect(
    "mongodb://phrazer-server-674354357:UzgE31M1oxU3a4gH@phrazer-db-shard-00-00-rpmal.mongodb.net:27017,phrazer-db-shard-00-01-rpmal.mongodb.net:27017,phrazer-db-shard-00-02-rpmal.mongodb.net:27017/test",
    {
      ssl: true,
      replicaSet: "phrazer-db-shard-0",
      authSource: "admin",
      retryWrites: true,
      useNewUrlParser: true
    }
  );

  const dbConnection = mongoose.connection;

  dbConnection.on("error", console.error.bind(console, "connection error:"));
  dbConnection.once("open", function() {
    console.log("Database connected.");
  });
};

export default mongooseConfig;
