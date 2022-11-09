module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.ts?$": "ts-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
};
