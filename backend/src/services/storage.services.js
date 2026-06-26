const { ImageKit } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(buffer, fileName) {
  //checking
  // console.log(buffer);
  // console.log(fileName);
  // console.log(imagekit);
  // console.log("Uploading:", fileName);
  // console.log("Buffer Size:", buffer.length);testing
  const result = await imagekit.files.upload({
    file: buffer.toString("base64"),
    fileName: fileName,
  });

  return result;
}

module.exports = {
  uploadFile,
  imagekit,
};