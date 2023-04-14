module.exports = {
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/__mocks__/fileMock.js"
  },
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json"
    }
  },
  setupFilesAfterEnv: ["./jest.setup.ts"]
};
