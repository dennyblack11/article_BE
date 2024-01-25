import { Request, Response } from "express";
import userModel from "../model/userModel";
import crypto from "crypto";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const token = crypto.randomBytes(3).toString("hex");
    const user = await userModel.create({
      email,
      Password: token,
    });

    return res.status(201).json({
      message: "User Created Successfully",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating user",
    });
  }
};

export const viewAllUsers = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find();
    return res.status(200).json({
      message: "finding all users",
      data: user,
      status: 200,
    });
  } catch (error) {
    return res.status(404).json({
      message: "error finding all user",
      status: 404,
    });
  }
};
