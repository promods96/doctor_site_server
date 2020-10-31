const express = require("express");
const path = require("path");
const app = express();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

app.use(express.static(path.join(__dirname, "build")));

app.post("/sendmail", (req, res) => {
  const msg = {
    to: "chottu64@gmail.com", // Change to your recipient
    from: "promods96@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
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
