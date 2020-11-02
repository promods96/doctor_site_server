const express = require("express");
const path = require("path");
const app = express();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);

app.use(express.static(path.join(__dirname, "build")));

app.post("/sendmail", (req, res) => {
   const msg = {
    to: "healthpluscenter2016@gmail.com", // Change to your recipient
    from: "healthpluscenter2016@gmail.com", // Change to your verified sender
    subject: "Test email for appointment",
    text: "Ignore this is for testing",
    html: "<strong>New Appointment</strong>",
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
  res.send("success").status(200);
});
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 5000);
