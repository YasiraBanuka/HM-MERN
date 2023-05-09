import mongoose from "mongoose";
import config from "../configs/config";
// import logger from "./logger";

let database;

const connect = async () => {

    const MONGODB_URL = config.DB_CONNECTION_STRING;

    if (database) return;

    // mongoose.set('strictQuery', true);

    mongoose
        .connect("mongodb+srv://happyitpproject:12345@cluster0.ujqnw4p.mongodb.net/?retryWrites=true&w=majority")
        .then((connection) => {
            database = connection;
            console.log("Database Synced");
        })
        .catch((err) => {
            console.log(err.message);
        });
};

export { connect };