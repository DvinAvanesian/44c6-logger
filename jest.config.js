module.exports = {
  preset: 'ts-jest', // Use ts-jest for TypeScript files
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/src/__tests__/setup.ts' // Exclude the setup.ts file
  ]
}
