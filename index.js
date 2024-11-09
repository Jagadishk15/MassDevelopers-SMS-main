const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
});

const upload = multer({
  storage: storage,
});

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
});

// Shared email template styles
const emailStyles = `
  <style>
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
    }
    .header {
      background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
      padding: 30px 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 28px;
      font-weight: 600;
    }
    .content {
      background-color: #ffffff;
      padding: 30px;
      border: 1px solid #e1e1e1;
      border-radius: 0 0 8px 8px;
    }
    .detail-item {
      margin: 15px 0;
      padding-bottom: 10px;
      border-bottom: 1px solid #f0f0f0;
    }
    .label {
      font-weight: bold;
      color: #2c3e50;
      display: inline-block;
      width: 120px;
    }
    .value {
      color: #555555;
    }
    .message {
      margin-top: 20px;
      padding: 15px;
      background-color: #f8f9fa;
      border-radius: 4px;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      color: #666666;
      font-size: 12px;
    }
  </style>
`;

app.post("/api/form", upload.single('data'), (req, res) => {
  console.log(req.body);
  
  var emailcontent = `
    ${emailStyles}
    <div class="email-container">
      <div class="header">
        <h1>New Contact Message</h1>
      </div>
      <div class="content">
        <div class="detail-item">
          <span class="label">Name:</span>
          <span class="value">${req.body.name}</span>
        </div>
        <div class="detail-item">
          <span class="label">Email:</span>
          <span class="value">${req.body.email}</span>
        </div>
        <div class="message">
          <h3 style="color: #2c3e50; margin-top: 0;">Message</h3>
          <p>${req.body.subject}</p>
        </div>
      </div>
      <div class="footer">
        <p>This email was sent via the contact form</p>
      </div>
    </div>
  `;

  var data = req.file;
  if (data.size >= 15000000) {
    return res.send({
      result: false,
      message: "Your file is greater than 15MB"
    });
  }

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "massdeveleopers.civil@gmail.com",
      pass: "yvzt zcey sgio eikd"
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  var mailOptions = {
    from: `${req.body.email}`,
    to: "massdeveleopers.civil@gmail.com",
    subject: "New Message",
    text: req.body.subject,
    html: emailcontent,
    attachments: [
      {
        filename: data.originalname,
        path: data.path
      }
    ]
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      return res.send({
        result: false,
        message: "Mail Not sent"
      });
    } else {
      console.log("Email sent: " + info.response);
      return res.send({
        result: true,
        message: "Mail sent"
      });
    }
  });
});

app.post("/api/form-1", upload.single('data'), (req, res) => {
  console.log(req.body);
  
  var emailcontent = `
    ${emailStyles}
    <div class="email-container">
      <div class="header">
        <h1>${req.body.title}</h1>
      </div>
      <div class="content">
        <div class="message">
          <p>Please find the attached resume for your review.</p>
        </div>
      </div>
      <div class="footer">
        <p>Resume submission via application portal</p>
      </div>
    </div>
  `;

  var data = req.file;
  if (data.size >= 15000000) {
    return res.send({
      result: false,
      message: "Your file is greater than 15MB"
    });
  }

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "massdeveleopers.civil@gmail.com",
      pass: "yvzt zcey sgio eikd"
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  var mailOptions = {
    from: `${req.body.email}`,
    to: "massdeveleopers.civil@gmail.com",
    subject: "Resume",
    text: req.body.subject,
    html: emailcontent,
    attachments: [
      {
        filename: data.originalname,
        path: data.path
      }
    ]
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      return res.send({
        result: false,
        message: "Mail Not sent"
      });
    } else {
      console.log("Email sent: " + info.response);
      return res.send({
        result: true,
        message: "Mail sent"
      });
    }
  });
});

app.post("/api/form-2", upload.single('data'), (req, res) => {
  console.log(req.body);
  
  var emailcontent = `
    ${emailStyles}
    <div class="email-container">
      <div class="header">
        <h1>${req.body.title}</h1>
      </div>
      <div class="content">
        <div class="detail-item">
          <span class="label">Name:</span>
          <span class="value">${req.body.name}</span>
        </div>
        <div class="detail-item">
          <span class="label">Phone:</span>
          <span class="value">${req.body.phone}</span>
        </div>
        <div class="detail-item">
          <span class="label">Type:</span>
          <span class="value">${req.body.type}</span>
        </div>
      </div>
      <div class="footer">
        <p>Inquiry submitted through website</p>
      </div>
    </div>
  `;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "massdeveleopers.civil@gmail.com",
      pass: "yvzt zcey sgio eikd"
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  var mailOptions = {
    from: `${req.body.email}`,
    to: "massdeveleopers.civil@gmail.com",
    subject: `${req.body.title}`,
    text: req.body.subject,
    html: emailcontent,
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      return res.send({
        result: false,
        message: "Mail Not sent"
      });
    } else {
      console.log("Email sent: " + info.response);
      return res.send({
        result: true,
        message: "Mail sent"
      });
    }
  });
});

app.post("/api/form-3", upload.single('data'), (req, res) => {
  console.log(req.body);
  
  var emailcontent = `
    ${emailStyles}
    <div class="email-container">
      <div class="header">
        <h1>${req.body.title}</h1>
      </div>
      <div class="content">
        <div class="detail-item">
          <span class="label">Name:</span>
          <span class="value">${req.body.name}</span>
        </div>
        <div class="detail-item">
          <span class="label">Phone:</span>
          <span class="value">${req.body.phone}</span>
        </div>
        <div class="detail-item">
          <span class="label">Email:</span>
          <span class="value">${req.body.mail}</span>
        </div>
        <div class="message">
          <h3 style="color: #2c3e50; margin-top: 0;">Description</h3>
          <p>${req.body.des}</p>
        </div>
      </div>
      <div class="footer">
        <p>Contact request submitted via website</p>
      </div>
    </div>
  `;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "massdeveleopers.civil@gmail.com",
      pass: "yvzt zcey sgio eikd"
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  var mailOptions = {
    from: `${req.body.email}`,
    to:"massdeveleopers.civil@gmail.com",
    subject: `${req.body.title}`,
    text: req.body.subject,
    html: emailcontent,
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      return res.send({
        result: false,
        message: "Mail Not sent"
      });
    } else {
      console.log("Email sent: " + info.response);
      return res.send({
        result: true,
        message: "Mail sent"
      });
    }
  });
});

app.post("/api/form-4", upload.single('data'), (req, res) => {
  console.log(req.body);
  
  var emailcontent = `
    ${emailStyles}
    <div class="email-container">
      <div class="header">
        <h1>${req.body.title}</h1>
      </div>
      <div class="content">
        <div class="detail-item">
          <span class="label">Name:</span>
          <span class="value">${req.body.name}</span>
        </div>
        <div class="detail-item">
          <span class="label">Phone:</span>
          <span class="value">${req.body.phone}</span>
        </div>
        <div class="detail-item">
          <span class="label">Email:</span>
          <span class="value">${req.body.mail}</span>
        </div>
        <div class="detail-item">
          <span class="label">Product:</span>
          <span class="value">${req.body.product}</span>
        </div>
        <div class="detail-item">
          <span class="label">Square Feet:</span>
          <span class="value">${req.body.sqft}</span>
        </div>
        <div class="message">
          <h3 style="color: #2c3e50; margin-top: 0;">Description</h3>
          <p>${req.body.des}</p>
        </div>
      </div>
      <div class="footer">
        <p>Product inquiry submitted via website</p>
      </div>
    </div>
  `;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "massdeveleopers.civil@gmail.com",
      pass: "yvzt zcey sgio eikd"
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  var mailOptions = {
    from: `${req.body.email}`,
    to: "massdeveleopers.civil@gmail.com",
    subject: `${req.body.title}`,
    text: req.body.subject,
    html: emailcontent,
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      return res.send({
        result: false,
        message: "Mail Not sent"
      });
    } else {
      console.log("Email sent: " + info.response);
      return res.send({
        result: true,
        message: "Mail sent"
      });
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});