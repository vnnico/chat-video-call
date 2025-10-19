import express, { Request, Response } from "express";

const app = express();

app.get("/", async (req: Request, res: Response) => {
  res.send("hallo sayang");
});

app.listen(3000, () => {
  console.log("Port listening");
});
