const fs = require("fs/promises");

async function main() {
  const content = await fs.readFile("../api/static/data/chartOne.json", "utf8");
  const studentData = JSON.parse(content);
  const categories = {};

  for (let { student } of studentData) {
    if (student.professionCategory === "house wives") {
      student.professionCategory = "housewives";
    }
    if (student.professionCategory === "other professions") {
      student.professionCategory = "other";
    }
    if (student.professionCategory === "government service") {
      student.professionCategory = "government";
    }
    if (categories[student.professionCategory]) {
      categories[student.professionCategory].students.push(student);
    } else {
      categories[student.professionCategory] = {
        color: "",
        students: [student],
      };
    }
  }

  await fs.writeFile(
    "../api/static/data/chartOneGrouped.json",
    JSON.stringify(categories, null, 2),
    "utf8"
  );
}
