import { getDoc, parseDoc } from "google-docs-parser";

const private_key = import.meta.env.PRIVATE_KEY_64
  ? Buffer.from(import.meta.env.PRIVATE_KEY_64, "base64")
  : import.meta.env.PRIVATE_KEY;

const config = {
  client_email: import.meta.env.CLIENT_EMAIL,
  private_key,
};

export default async function get(doc) {
  const docDownload = parseDoc(await getDoc(config, doc));
  return docDownload;
}
