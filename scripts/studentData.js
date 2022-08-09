const fs = require("fs/promises");

async function processFile(file, outputFile) {
  const content = await fs.readFile(file, "utf8");
  const studentData = JSON.parse(content);
  const categories = [];

  for (let student of studentData) {
    student.professionCategory = student["Category of Profession"];
    delete student["Category of Profession"];
    delete student[""];
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
        name: student.professionCategory,
        color: "",
        students: [student],
      };
    }
  }

  const output = {
    count: studentData.length,
    categories: Object.values(categories),
  };

  await fs.writeFile(outputFile, JSON.stringify(output, null, 2), "utf8");
}

processFile(
  "./api/static/data/chartTwo.json",
  "./api/static/data/chartTwo.json"
);
