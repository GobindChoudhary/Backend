const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.MK_PUBLIC_URL,
  privateKey: process.env.MK_PRIVATE_URL,
  urlEndpoint: process.env.MK_ENDPOINT_URL,
});

async function uploadFile(file, filename) {
  const response = await imagekit.upload({
    file: file,
    fileName: filename,
    folder: "caption-generator",
  });
  return response;
}

module.exports = uploadFile;
