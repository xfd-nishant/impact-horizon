# Impact Horizon

Impact Horizon is a web-based simulation that puts players in the shoes of decision-makers facing environmental challenges. The game forces trade-offs between budgets, stakeholders, and environmental outcomes. Every choice has consequences. No “perfect” solution exists.

---

## What It Does
- Players act as a climate policymaker and choose scenarios
- They engage with AI-simulated stakeholders who each have their own objectives and biases.  
- Players allocate funds to interventions, weigh short-term vs. long-term impacts, and manage their credibility score.  
- Overspending is possible (up to 20% over budget) but comes with risks.  
- The goal is to navigate conflicts and finish the scenario without being “fired.”
- Every playthrough is unique as AI determines the change in your credibility score based on your decision.

---

## Why It Matters

Most climate education focuses on individual actions like recycling. Tradeoff teaches systems thinking by letting players experience real-world policy trade-offs, explore consequences, and understand how decisions shape communities and the environment all through AI-powered storytelling.

## How It Works

- **Frontend**: Next.js + Tailwind CSS + Framer Motion for UI.  
- **Backend**: Next.js API routes.  
- **AI**: OpenAI GPT-4o-mini for stakeholder dialogue and decision feedback.  
- **Game Data**: Scenario and stakeholder definitions stored in JSON.  

## Run It Locally
Requirements: Node.js 18+, npm or yarn, OpenAI API key.  

```bash
git clone https://github.com/xfd-nishant/impact-horizon.git
cd impact-horizon
npm install
cp .env.local   # you have to first add your OpenAI API key here
npm run dev
