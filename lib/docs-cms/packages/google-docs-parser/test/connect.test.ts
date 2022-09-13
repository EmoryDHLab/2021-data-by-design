// import { getDoc } from '../src';
import { getFilesInFolder, getDoc} from "../src/connect";
import info from "./docsconfig.json";
import {docs_v1} from "@googleapis/docs"
import {drive_v3} from "@googleapis/drive";
import { testFile, testFolder } from "./testFiles";

describe("getFilesInFolder", () => {
  test('returns an array of files when properly authenticated', async () => {
    const returnedFiles = await getFilesInFolder(info, testFolder)
    const isArray = Array.isArray(returnedFiles);
    expect(isArray).toBeTruthy();
    if (isArray) {
      (returnedFiles as Array<drive_v3.Schema$File>).forEach(file => expect(file).toEqual(expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String)
      })));
    }
  })

})


describe("getDoc", () => {
  test('throws error when not properly authenticated', async() => {
    const badConfig = Object.assign({}, info);
    badConfig.client_email = "bad";
    await expect(getDoc(badConfig, testFile)).rejects.toThrow();
  })

  const testDoc = (info, doc) => (async () => {
    const returnedFile = await getDoc(info, doc);
    expect(returnedFile).toBeTruthy();
    expect(returnedFile).toEqual(expect.objectContaining({
      title: expect.any(String),
      documentId: expect.any(String),
      body: expect.objectContaining({ content: expect.any(Array)})
    }))
  });

  test('returns a document when properly authenticated', testDoc(info, testFile));

})