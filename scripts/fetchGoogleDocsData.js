import { getDoc, parseDoc } from "google-docs-parser";
import { writeFile } from "node:fs/promises";
import chaptersConfig from "../chaptersConfig.js";
import "dotenv/config";

const privateKey = process.env.PRIVATE_KEY_64
  ? Buffer.from(process.env.PRIVATE_KEY_64, "base64")
  : process.env.PRIVATE_KEY;

const config = {
  client_email: process.env.CLIENT_EMAIL,
  private_key: privateKey,
};

async function fetchGoogleDoc(chapterConfig) {
  const chapterID = chapterConfig.id;
  const docID = chapterConfig.doc;
  const docDownload = parseDoc(await getDoc(config, docID));
  await writeFile(
    `docs/${chapterID}.json`,
    JSON.stringify(docDownload),
    "utf8"
  );
}

setInterval(() => {
  Promise.all(Object.values(chaptersConfig).map(fetchGoogleDoc)).catch(
    (err) => {
      console.error(err);
    }
  );
}, 2000);
