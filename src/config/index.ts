import dotenv from "dotenv";

const envFound = dotenv.config();

if(!envFound){
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    port : process.env.PORT,
    databaseUrl : process.env.DATABASE_URL as string,
    jwtSecret : process.env.JWT_SECRET as string || "secret_key_to_be_longer_longer"
}