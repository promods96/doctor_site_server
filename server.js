const express = require("express");
const path = require("path");
const app = express();
const sgMail = require("@sendgrid/mail");
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
  } = req.body;
  const msg = {
    to: "promods96@gmail.com", // Change to your recipient
    from: "healthpluscenter2016@gmail.com", // Change to your verified sender
    subject: "New Appointment",
    text: "Hi,",
    html: `<h1>${
      service == 1 ? "Consulting" : "Home Service"
    }</h1><table style="font-size: 18px">
      <tr><td><b>Name</b></td><td>${first_name} ${last_name}</td></tr>
      <tr><td><b>Phone</b></td><td>${phone}</td></tr>
      <tr><td><b>Email</b></td><td>${email}</td></tr>
      <tr><td><b>Notes</b></td><td>${notes}</td></tr>
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
