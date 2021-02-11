const express = require("express");
const path = require("path");
const morgan = require("morgan");
const compression = require("compression");
const cors = require("cors");

const AppError = require("./utils/appError");
const viewRouter = require("./routes/viewRouter");
const userRouter = require("./routes/userRouter");
const globalErrorHandler = require("./constrollers/errorController");

const app = express();

app.set("view engine", "pug");

app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.options("*", cors());

app.use(express.static(path.join(__dirname, "public"))); // Podemos ir a url´s especificas de nuestros folders como http://127.0.0.1:4000/html/chat.html, hay ue tener cuidado si sacamos el archivo index.html porque se renderiza de inmediato por llamarse index

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(compression());

// Routes:
app.use("/", viewRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Catn find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
