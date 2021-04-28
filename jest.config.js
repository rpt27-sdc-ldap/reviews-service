module.exports = {
  moduleNameMapper: {
    '\\.(css|less)$': __dirname + '/Client/Tests/styleMock.js',
  },
  "preset": "@shelf/jest-mongodb"
};