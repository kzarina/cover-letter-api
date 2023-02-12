const express = require("express");
const fs = require("fs");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

const keys = ["roleType", "roleName", "companyName", "topic", "hmName"];

console.log(process.env.MYNAME);

app.get("/coverLetterFetch/:companyName/:roleName", (req, res) => {
  console.log(req.params);
  const { companyName, roleName } = req.params;
  const doc = fs.readFile(`${process.env.MYNAME}-${companyName}-${roleName}-CL.txt`, "utf-8", (err, data) => {
    if (!err) {
      console.log("the file says:", data);
      res.send(data);
    } else console.log("error is:", err);
  });
});

app.get("/coverLetterWrite/:companyName/:roleName/:roleType", (req, res) => {
  console.log("params", req.params, "query", req.query);
  const doc = CoverLetterString(req.params, req.query);
  console.log("doc:", doc, typeof doc);
  fs.writeFile(`${process.env.MYNAME}-${req.params.companyName}-${req.params.roleName}-CL.txt`, doc, (err) => console.log(err));
  res.send("Test");
});

app.listen(process.env.PORT || 4000, () => console.log("listening on port", process.env.PORT || 4000));

// const CoverLetterString = (params, query) => {
//   return `
// Zarina Kubanychbekova
// Karakol, Kyrgyzstan
// 996 555 555555
// zarina@example.com

// Dear ${[query.hmName ? query.hmName : "Hiring Manager"]},

// I am writing to express my interest in the ${params.roleName} position at ${params.companyName}.
// As an experienced Full-Stack Developer with a passion for technology, I am confident that I would be an excellent fit for this role.

// ${
//   params.roleType === "fe"
//     ? "I have a strong understanding of MySQL and have extensive experience using Node.js Express to create scalable and efficient applications. My expertise in HTML/CSS and Javascript has allowed me to build beautiful and user-friendly websites that not only look great but also perform optimally."
//     : ""
// }
// ${
//   params.roleType !== "fe"
//     ? "With 4 years of experience in front-end development, I have developed a strong understanding of HTML, CSS, and JavaScript and have hands-on experience working with popular front-end frameworks such as React, Angular, and Vue.js."
//     : ""
// }
// ${
//   params.roleType === "fe"
//     ? "Just like hiking, developing requires determination and a strong focus on the goal. In both cases, it is important to have a clear plan, stay organized, and never give up, no matter how challenging the terrain may be. Whether I am scaling a mountain or coding a complex solution, I am driven by my passion and a desire to achieve excellence."
//     : ""
// }
// ${
//   params.roleType !== "fe"
//     ? "I have a proven track record of delivering high-quality results and have consistently exceeded my clients' expectations. I am always eager to learn new technologies and stay up-to-date with the latest trends and best practices in the industry."
//     : ""
// }
// I would love the opportunity to bring my passion for technology and my strong Full-Stack Development skills to ${params.companyName},
// and I would enjoy learning more about ${query.topic}.
// Thank you for considering my application. ${"Is there a good time we can meet to further discuss my qualifications with you?"}

// Sincerely,
// Zarina
// `;
// };

// for (let i = 2; i < process.argv.length; i++) {
//   arguments[keys[i - 2]] = process.argv[i].replaceAll("-", " ");
// }
