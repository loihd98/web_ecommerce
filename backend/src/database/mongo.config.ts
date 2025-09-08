export const MONGODB_CONNECTION_NAME = "VuaxemohinhDatabase";

// Default MongoDB configuration for local development
export const defaultMongoConfig = {
  uri: "mongodb://localhost:27017/vuaxemohinh",
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

// Production MongoDB Atlas configuration
export const getMongoUri = (): string => {
  return process.env.MONGODB_URI || defaultMongoConfig.uri;
};
