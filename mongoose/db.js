const mongoose = require("mongoose");


mongoose.connect(process.env.MONGO_URL || "mongodb+srv://test:Test123456@cluster0.wqtm7.mongodb.net/base1", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log("u are connected with mongoose");
  } else {
    console.log("u r failed " + err);
  }
});



