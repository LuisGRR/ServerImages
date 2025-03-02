const processedFiles = new Set();

module.exports = {
  addFile: (fileName) => processedFiles.add(fileName),
  hasFile: (fileName) => processedFiles.has(fileName),
  removeFile: (fileName) => processedFiles.delete(fileName),
};
