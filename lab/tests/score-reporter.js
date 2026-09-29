// Prints "SCORE: <passed>/<total>" at the end of a test run, for submit.py.
// If a test file crashes before its tests run, Jest leaves its tests out of the
// total — so the total here is fixed, and missing tests count as failed.
class ScoreReporter {
  constructor(globalConfig, options = {}) {
    this.expectedTotal = options.expectedTotal || 0;
    this.expectedSuites = options.expectedSuites || 1;
  }

  onRunComplete(contexts, results) {
    // Only score full runs (npm test / submit.py), not `npx jest tests/02`.
    if (results.numTotalTestSuites < this.expectedSuites) return;
    const total = Math.max(this.expectedTotal, results.numTotalTests);
    console.log(`\nSCORE: ${results.numPassedTests}/${total}`);
  }
}

module.exports = ScoreReporter;
