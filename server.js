const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Hi There!');
});



//Connect to the database
connectDb();


//Middleware
app.use(cors({
  credentials: true
}));
app.use(express.json()); // Ensure this is before route definitions


//Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/course", require("./routes/courseRoute"));
app.use("/api/videos", require("./routes/videoRoutes"));
app.use("/api/admin", require("./routes/adminRoute"));
app.use("/api/staff", require("./routes/staffRoute"));
app.use("/api/department", require("./routes/departmentRoute"));
app.use("/api/student", require("./routes/studentRoute"));


//Error handling middleware
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
