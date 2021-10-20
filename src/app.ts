import "dotenv/config";
import express, { Request, Response } from "express";

const port = 4000;

const app = express();

app.get("/github", (req: Request, res: Response) => {
	res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
});

app.listen(port, () => console.log(`Server running on PORT ${port}`));
