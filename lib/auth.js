import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const globalStore = globalThis;

if (!globalStore.studioMongoClient) {
  globalStore.studioMongoClient = new MongoClient(
    process.env.MONGODB_URI || "mongodb://localhost:27017"
  );
}

const db = globalStore.studioMongoClient.db(
  process.env.DB_NAME || "studiospace"
);

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
});
