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

const userSschema = new mongoose.Schema<Iuser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);

export onst User = mongoose.model("User", userSschema);
