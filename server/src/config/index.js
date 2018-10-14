import mongooseConfig from "./mongoose";

const dbConfig = {
  host: "localhost",
  db: "MyNewDB",
  port: 27017
};

const rootConfig = () => {
  mongooseConfig(dbConfig);
};

export default rootConfig;
