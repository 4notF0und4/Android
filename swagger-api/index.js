const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const swaggerDocument = YAML.load("./api.yaml");

app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization"] 
}));

app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let courses = []; 


app.get("/courses", (req, res) => {
  res.json(courses);
});


app.get("/courses/:id", (req, res) => {
  const { id } = req.params;
  const course = courses.find((c) => c.id === parseInt(id));

  if (!course) {
    return res.status(404).json({ message: "Kurs tapılmadı!" });
  }

  res.json(course);
});


app.post("/courses", (req, res) => {
  const { title, description, isFree, price, expiryYear } = req.body;
  if (!title || !description || isFree === undefined || !expiryYear) {
    return res.status(400).json({ message: "Bütün sahələri doldurun!" });
  }

  const newCourse = {
    id: courses.length + 1,
    title,
    description,
    isFree,
    price: isFree ? 0 : price,
    expiryYear,
  };

  courses.push(newCourse);
  res.status(201).json(newCourse);
});


app.put("/courses/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, isFree, price, expiryYear } = req.body;

  const courseIndex = courses.findIndex((c) => c.id === parseInt(id));
  if (courseIndex === -1) {
    return res.status(404).json({ message: "Kurs tapılmadı!" });
  }

  courses[courseIndex] = {
    ...courses[courseIndex],
    title: title || courses[courseIndex].title,
    description: description || courses[courseIndex].description,
    isFree: isFree !== undefined ? isFree : courses[courseIndex].isFree,
    price: isFree ? 0 : price || courses[courseIndex].price,
    expiryYear: expiryYear || courses[courseIndex].expiryYear,
  };

  res.json(courses[courseIndex]);
});


app.delete("/courses/:id", (req, res) => {
  const { id } = req.params;
  const courseIndex = courses.findIndex((c) => c.id === parseInt(id));

  if (courseIndex === -1) {
    return res.status(404).json({ message: "Kurs tapılmadı!" });
  }

  courses.splice(courseIndex, 1);
  res.json({ message: "Kurs silindi!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});
