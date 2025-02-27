const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

function generateImageHash(imagePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(
      path.join(path.resolve(__dirname, ".."), "public", imagePath)
    );

    stream.on("data", (data) => {
      hash.update(data);
    });

    stream.on("end", () => {
      resolve(hash.digest("hex"));
    });

    stream.on("error", (err) => {
      reject(err);
    });
  });
}


module.exports = {
  generateImageHash: generateImageHash,
};

