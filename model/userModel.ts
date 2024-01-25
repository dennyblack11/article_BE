import { Schema, model, Document, Types } from "mongoose";

interface iUser {
  FullName: string;
  email: string;
  Password: string;
  avatar: string;
  verify: boolean;

  blogs: Array<{}>;
}

interface iUserData extends iUser, Document {}

const userModel = new Schema<iUserData>(
  {
    FullName: {
      type: String,
    },

    email: {
      type: String,
    },

    verify: {
      type: Boolean,
      default: false,
    },

    Password: {
      type: String,
    },

    avatar: {
      type: String,
    },
    blogs: [
      {
        type: Types.ObjectId,
        ref: "blogs",
      },
    ],
  },
  { timestamps: true }
);

export default model<iUserData>("user", userModel);
