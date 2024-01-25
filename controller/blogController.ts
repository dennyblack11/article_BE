import { Request, Response } from "express";
import userModel from "../model/userModel";
import blogModel from "../model/blogModel";
import { stream } from "../utils/stream";
import { Types } from "mongoose";

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { title, content, category } = req.body;

    const user = await userModel.findById(userID);

    const { secure_url, public_id }: any = await stream(req);

    if (user) {
      const blog = await blogModel.create({
        authorName: user.FullName,
        title,
        content,
        category,
        displayImage: secure_url,
        displayImageID: public_id,
      });

      // user?.blogs.push(new Types.ObjectId(blog._id));
      // user.save();

      return res.status(201).json({
        message: "Blog created",
        data: blog,
        status: 201,
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: "Error creating Blog",
      data: error.message,
      status: 404,
    });
  }
};
