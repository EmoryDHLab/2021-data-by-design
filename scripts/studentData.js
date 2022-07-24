const fs = require("fs/promises");

async function main() {
  const content = await fs.readFile("api/static/data/chartOne.json", "utf8");
  const studentData = JSON.parse(content);
  const categories = {};

  for (let { professionCategory, ...student } of studentData) {
    if (professionCategory === "house wives") {
      professionCategory = "housewives";
    }
    if (professionCategory === "other professions") {
      professionCategory = "other";
    }
    if (professionCategory === "government service") {
      professionCategory = "government";
    }
    if (categories[professionCategory]) {
      categories[professionCategory].students.push(student);
    } else {
      categories[professionCategory] = { color: "", students: [student] };
    }
  }

  await fs.writeFile(
    "api/static/data/chartOneGrouped.json",
    JSON.stringify(categories, null, 2),
    "utf8"
  );
}
