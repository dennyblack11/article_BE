import { Application, Request, Response } from "express";

export const mainApp = async (app: Application) => {
  try {
    app.get("/", (req: Request, res: Response) => {
      try {
        return res.status(200).json({
          message: "Default Api",
        });
      } catch (error) {
        return res.status(404).json({
          message: "Error Fetching Api",
        });
      }
    });
  } catch (error) {
    return error;
  }
};
