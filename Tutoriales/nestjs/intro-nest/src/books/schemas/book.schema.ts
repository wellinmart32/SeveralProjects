import * as mongoose from 'mongoose';

export const SchemaBook = new mongoose.Schema({
    title: String,
    author: String,
    description: String
});