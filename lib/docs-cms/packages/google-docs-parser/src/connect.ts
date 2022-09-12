
import {docs_v1, docs, auth,} from "@googleapis/docs";
import {drive, drive_v3} from "@googleapis/drive"
type config = {
  client_email: string,
  private_key: string
}

function getJWT(config: config) {
  try {
    const scopes = ["https://www.googleapis.com/auth/documents.readonly", "https://www.googleapis.com/auth/drive.readonly"];
    return new auth.JWT(config.client_email, undefined, config.private_key, scopes);
  } catch (error) {
    return String(error);
  }
}

export async function getDoc(config: config, documentId: string): Promise<docs_v1.Schema$Document | undefined> {
  const auth = getJWT(config);
  if (typeof auth == "string") {
    throw Error(auth);
  }

  try {
    const resp = await docs({version: "v1"}).documents.get({
      documentId,
      auth
    })
    return resp.data;
  } catch (error) {
    //More robust error handling TODO
    throw error;
  }
}

//Untested and practically useless as there's no way to get the position of the comment within the document
async function getComments(config: config, documentId: string) {
  const auth = getJWT(config);
  if (typeof auth == "string") {
    throw Error(auth);
  }
  try {
    const resp = await drive({version: "v3"}).comments.list({
      fileId: documentId,
      fields: "comments/content, comments/htmlContent, comments/anchor, comments/id"
    });
    return resp.data.comments;
  } catch (error) {
    throw error;
  }
}

export async function getFilesInFolder(config: config, folderId: string, params: object = {}): Promise<Array<drive_v3.Schema$File> | undefined> {

  const auth = getJWT(config);
  if (typeof auth == "string") {
    throw Error(auth);
  }

  try {
    const resp = await drive({version: "v3"}).files.list(Object.assign({
      q: `'${folderId}' in parents`,
      auth
    }, params));
    return resp.data.files;
  } catch (error) {
    //More robust error handling TODO
    throw error;
  }
}