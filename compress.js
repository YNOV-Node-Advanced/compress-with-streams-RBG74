const fs = require("fs");
const zlib = require("zlib");

async function compress(input, output) {
    return new Promise((resolve, reject) => {
        const gzip = zlib.createGzip();
        const inputStream = fs.createReadStream(input);
        const outputStream = fs.createWriteStream(output);

        inputStream.on("error", err => {
            reject(err);
        });
        gzip.on("error", err => {
            reject(err);
        });
        outputStream.on("error", err => {
            reject(err);
        });

        outputStream.on("close", () => {
            resolve(outputStream.bytesWritten);
        });

        inputStream.pipe(gzip).pipe(outputStream);
    });
}

compress("input.txt", "output.txt")
    .then(result => console.log("Bytes written: ", result))
    .catch(err => console.error(err));
