const express = require("express");
const path = require("path");
const app = express();
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_KEY);

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

app.post("/sendmail", (req, res) => {
  let {
    first_name = "",
    last_name = "",
    email = "-",
    phone = "-",
    notes = "-",
    service = 1,
    package = "-",
  } = req.body;
  const msg = {
    to: "healthpluscenter2016@gmail.com", // Change to your recipient
    from: "healthpluscenter2016@gmail.com", // Change to your verified sender
    subject: "Healthplus Online",
    text: "Hi,",
    html: `<h1>${
      service == 1 ? "Consulting" : "Home Service"
    }</h1><table style="font-size: 18px;border-collapse: collapse;color:#000">
      <tr><td style="border:1px solid #ddd;padding: 8px"><b>Name</b></td><td style="border:1px solid #ddd;padding: 8px">${first_name} ${last_name}</td></tr>
      <tr><td style="border:1px solid #ddd;padding: 8px"><b>Phone</b></td><td style="border:1px solid #ddd;padding: 8px">${phone}</td></tr>
      <tr><td style="border:1px solid #ddd;padding: 8px"><b>Email</b></td><td style="border:1px solid #ddd;padding: 8px">${email}</td></tr>
      <tr><td style="border:1px solid #ddd;padding: 8px"><b>Notes</b></td><td style="border:1px solid #ddd;padding: 8px">${notes}</td></tr>
      <tr><td style="border:1px solid #ddd;padding: 8px"><b>Package</b></td><td style="border:1px solid #ddd;padding: 8px">${package}</td></tr>
    </table>`,
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
