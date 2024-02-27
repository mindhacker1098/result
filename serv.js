const mongoose = require("mongoose");
const express = require("express");
const app = express();
mongoose.set("strictQuery", true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.set("strictQuery", true);
var cors = require("cors");
const { result } = require("./components/Calculate");
app.use(cors());
const multer = require("multer");
const xlsx = require("xlsx");
const fs = require("fs");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
mongoose
  .connect(
    process.env.m_url,
    { serverSelectionTimeoutMS: 5000 }
  )
  .then(() => {
    console.log("sucessful");
  })
  .catch((err) => {
    console.log(err);
  });

const UserSchema = mongoose.Schema({
  "Sl No": {
    type: Number,
  },
  "Registration No": {
    type: String,
  },
  Name: {
    type: String,
  },
  Sem: {
    type: String,
  },
  "Subject Code": {
    type: String,
  },
  "Subject Name": {
    type: String,
  },
  "Subject Type": {
    type: String,
  },
  "Subject Credit": {
    type: String,
  },
  Grade: {
    type: String,
  },
});

const User = mongoose.model("result", UserSchema);

app.post("/result", async (req, res) => {
  if (!req.body.reg) {
    res.send("Fill Registeration Number");
  }
  let resp = {};
  const data = await User.find({ "Registration No": req.body.reg });

  if (!data.length) {
    res.status(404).send("Regiseration Number Not Exists");
    return;
  }
  resp["data"] = data;
  resp["Name"] = data[0].Name;
  resp["Regno"] = data[0]["Registration No"];
  resp["Result"] = result(data);
  res.send(resp);
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const sampleData = xlsx.utils.sheet_to_json(sheet);

    try {
      const insertedData = await User.insertMany(sampleData, {
        ordered: false,
        rawResult: true,
        forceServerObjectId: false,
      });

      res.json({ message: "Data inserted successfully", insertedData });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error inserting data", details: error.message });
    }
  } catch (error) {
    console.error(error);
  }
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;

<<<<<<< HEAD
  if (email === "nahakshaktiprasad@gmail.com" && password === "spn@1098") {
=======
  if (email === "nahakshaktiprasad@gmail.com" && password === "cutm@123") {
>>>>>>> b1336a464305cb16e8f8bd447fa1772264f243b8
    res.status(200).json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});
app.get("/deleteall",async(req,res)=>{

try{
  await User.deleteMany({});
res.send("all data deleted");
}
catch(e){

res.send(e);

}

})
var port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("server started");
});
