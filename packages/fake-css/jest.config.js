module.exports = {
	//   preset: 'ts-jest',
	testEnvironment: 'jsdom',
	rootDir: __dirname,
	testMatch: ['<rootDir>/src/__tests__/**/*.ts'],
	transform: {
		'^.+\\.tsx?$': '@sucrase/jest-plugin'
	}
};
