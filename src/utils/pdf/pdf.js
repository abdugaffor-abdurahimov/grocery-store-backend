const ejs = require("ejs");
const htmlPdf = require("html-pdf");

export async function htmlToPdfBuffer(pathname, params) {
  const html = await ejs.renderFile(pathname, params);

  return new Promise((resolve, reject) => {
    htmlPdf.create(html).toBuffer((err, buffer) => {
      if (err) reject(err);
      resolve(buffer);
    });
  });
}
