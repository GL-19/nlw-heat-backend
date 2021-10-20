import "dotenv/config";
import express, { Request, Response } from "express";

import { router } from "./routes";

const port = 4000;

const app = express();
app.use(express.json());

app.use(router);

app.get("/github", (req: Request, res: Response) => {
	res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
});

app.get("/signin/callback", (req: Request, res: Response) => {
	const { code } = req.query;
	return res.json(code);
});

app.listen(port, () => console.log(`Server running on PORT ${port}`));
