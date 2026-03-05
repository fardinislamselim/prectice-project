import mongoose from "mongoose";

interface Iuser {
  _id?: mongoose.Types.ObjectId;
  name?: string;
  image?: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSschema: Iuser = new mongoose.Schema({}, { timestamps: true });
