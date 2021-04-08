const ejs = require("ejs");
const htmlPdf = require("html-pdf");

module.exports = async function htmlToPdfBuffer(params) {
  const html = await ejs.renderFile("./template.ejs", params);

  return new Promise((resolve, reject) => {
    htmlPdf.create(html).toBuffer((err, buffer) => {
      if (err) reject(err);
      resolve(buffer);
    });
  });
};
