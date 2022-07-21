import { Router } from "express";
import { getDoc, parseDoc } from "google-docs-parser";

const router = Router();

const privateKey = process.env.PRIVATE_KEY_64
  ? Buffer.from(process.env.PRIVATE_KEY_64, "base64")
  : process.env.PRIVATE_KEY;

const config = {
  client_email: process.env.CLIENT_EMAIL,
  private_key: privateKey,
};

router.get("/", (req, res) => {
  // res.type("html"); automatically done by Express
  const html =
    "<h2>You've reached the live Google Docs API. </h2>" +
    "<p>Access page data from a Doc by calling adding /id to this URL, where id is the Google Doc ID found in the sharable link.</p>";
  res.send(html);
});

router.get("/:id", async (req, res) => {
  const docID = req.params.id;
  const docDownload = parseDoc(await getDoc(config, docID));
  res.send(docDownload);
});

export default router;
