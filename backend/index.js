import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import routes from "./src/routes/index.js"; // Asegúrate de que la ruta sea correcta
import bodyParser from "body-parser";

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json());

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

const port = process.env.PORT;

app.setMaxListeners(0);

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("¡Bienvenido, PGA!");
});

app.post("/", (req, res) => {
  res.send("¡Bienvenido, PGA!");
});

app.put("/", (req, res) => {
  res.send("¡Bienvenido, PGA!");
});

app.delete("/", (req, res) => {
  res.send("¡Bienvenido, PGA!");
});

app.use((req, res) => {
  res.status(404).send("Error 404 Not Found");
});

app.listen(port, () => {
  console.log(`Servidor iniciado exitosamente en el puerto ${port}`);
});
