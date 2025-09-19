export function evaluateGuess(guess, scenario) {
  // guess: { env: number, econ: number, social: number } values 0-10
  // scenario.hidden_actuals holds actual values 0-10
  const actual = scenario.hidden_actuals || { env: 5, econ: 5, social: 5 };
  const delta = {
    env: Math.abs(actual.env - guess.env),
    econ: Math.abs(actual.econ - guess.econ),
    social: Math.abs(actual.social - guess.social),
  };
  // simple accuracy score, lower delta is better
  const score = Math.round(100 - (delta.env + delta.econ + delta.social) * (100 / 30));
  return { actual, delta, score: Math.max(0, score) };
}
