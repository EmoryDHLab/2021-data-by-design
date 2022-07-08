import { Router } from "express";
import glob from "glob";
import { readFileSync, createReadStream, readFile } from "fs";
import { extname } from "path";
import parse from "csv-parse";

const router = Router();

const dataFolder = "api/static/data/";
const loadDataset = function (name) {
  return new Promise(function (resolve, reject) {
    glob(dataFolder + name + "*.{json,csv}", (error, files) => {
      if (error) {
        return reject(error);
      }
      if (!files.length) {
        return reject(`Dataset ${name} doesn't exist`);
      }
      const filePath = files[0];
      const extension = extname(filePath);
      if (extension === ".csv") {
        //Assumes first row is property names
        const parser = parse({ delimiter: "," });
        const dataStream = createReadStream(filePath);
        let dataObjProps = [];
        const dataList = [];
        dataStream
          .pipe(parser)
          .on("data", (data) => {
            if (dataObjProps.length == 0) {
              dataObjProps = data;
            } else {
              const newObj = {};
              data.forEach(
                (propValue, index) => (newObj[dataObjProps[index]] = propValue)
              );
              dataList.push(newObj);
            }
          })
          .on("end", () => {
            let output = dataList;
            resolve({ id: name, output });
          })
          .on("error", (err) => {
            return reject(err);
          });
      } else if (extension === ".json") {
        readFile(filePath, "utf8", function (err, data) {
          if (err) {
            console.error(err);
            return reject(err);
          }
          resolve({ id: name, output: JSON.parse(data) });
        });
      }
    });
  });
};

router.get("/", function (req, res) {
  //res.type("html"); automatically done by Express
  // const html = "<h2>Ask for a dataset</h2>" +
  glob(dataFolder + "*.{json,csv}", (er, files) => {
    console.log(er);
    const fileNames = files.map((path) =>
      path.slice(path.lastIndexOf("/") + 1, path.lastIndexOf("."))
    );
    const html = `<ul>${fileNames
      .map((name) => `<li><a href="/api/data/${name}">${name}</a></li>`)
      .join("")}
    </ul>`;
    res.send(html);
  });
});

router.get("/:file", async function (req, res) {
  const fileName = req.params.file;
  try {
    const { id, output } = await loadDataset(fileName);
    res.json(output);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
