// Simple scoring system for Impact Sandbox
export function evaluateGuess(guess, scenario) {
  const actual = scenario.hidden_actuals;
  
  // Calculate score based on how close the guess is to actual values
  const envScore = Math.max(0, 10 - Math.abs(guess.env - actual.env));
  const econScore = Math.max(0, 10 - Math.abs(guess.econ - actual.econ));
  const socialScore = Math.max(0, 10 - Math.abs(guess.social - actual.social));
  
  const totalScore = Math.round((envScore + econScore + socialScore) / 3);
  
  return {
    actual,
    score: totalScore,
    breakdown: {
      environmental: envScore,
      economic: econScore,
      social: socialScore
    }
  };
}