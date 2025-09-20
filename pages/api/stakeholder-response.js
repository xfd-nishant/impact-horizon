import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { 
    stakeholder, 
    userMessage,
    scenario, 
    currentAllocations, 
    recentDecision, 
    credibility 
  } = req.body;

  try {

    // Stakeholder personality and objectives
    const stakeholderProfiles = {
      "City Council": {
        objective: scenario.id === "2" ? "Wants climate goals met and a big win for clean energy" : "Maximize city efficiency and stay within budget",
        personality: scenario.id === "2" ? "Focused on renewable energy targets and climate action" : "Critical of overspending, supportive of practical interventions",
        priorities: scenario.id === "2" ? ["renewable_energy", "climate_goals", "clean_energy"] : ["budget", "efficiency", "practicality"],
        tone: scenario.id === "2" ? "ambitious, climate-focused" : "authoritative, budget-conscious"
      },
      "Residents' Representative": {
        objective: scenario.id === "2" ? "Split—cheaper power is attractive, but many fear higher food costs and land loss" : "Protect vulnerable populations and improve comfort/safety",
        personality: scenario.id === "2" ? "Torn between energy savings and food security concerns" : "Happy with improvements, angry if disruptions increase",
        priorities: scenario.id === "2" ? ["energy_costs", "food_security", "community_impact"] : ["vulnerable_populations", "safety", "comfort"],
        tone: scenario.id === "2" ? "conflicted, community-focused" : "passionate, community-focused"
      },
      "Urban Developers": {
        objective: scenario.id === "2" ? "Focused on profit and fast build-out; wants minimal restrictions" : "Ensure construction feasibility and minimize delays",
        personality: scenario.id === "2" ? "Profit-driven, wants quick implementation with minimal red tape" : "Warns about unrealistic plans or blocked work",
        priorities: scenario.id === "2" ? ["profit", "speed", "minimal_restrictions"] : ["feasibility", "timeline", "construction"],
        tone: scenario.id === "2" ? "aggressive, profit-focused" : "practical, warning-focused"
      },
      "Environmental NGO": {
        objective: scenario.id === "2" ? "Supports renewables but demands biodiversity safeguards" : "Promote ecological sustainability and green solutions",
        personality: scenario.id === "2" ? "Supports clean energy but concerned about land use and biodiversity" : "Pushes green interventions, critical of grey infrastructure",
        priorities: scenario.id === "2" ? ["renewable_energy", "biodiversity", "sustainable_land_use"] : ["sustainability", "green_solutions", "ecology"],
        tone: scenario.id === "2" ? "cautious, environmentally-conscious" : "passionate, environmental"
      },
      "Local Businesses": {
        objective: scenario.id === "2" ? "Furious about losing farmland; worried about their future" : "Minimize disruption and maintain revenue",
        personality: scenario.id === "2" ? "Angry about farmland loss, concerned about agricultural future" : "Complains if construction blocks streets or deliveries",
        priorities: scenario.id === "2" ? ["farmland_preservation", "agricultural_income", "rural_livelihoods"] : ["revenue", "access", "minimal_disruption"],
        tone: scenario.id === "2" ? "angry, agricultural-focused" : "concerned, business-focused"
      },
      "Farmers' Association": {
        objective: "Furious about losing farmland; worried about their future",
        personality: "Angry about farmland loss, concerned about agricultural future",
        priorities: ["farmland_preservation", "agricultural_income", "rural_livelihoods"],
        tone: "angry, agricultural-focused"
      },
      "Solar Developer": {
        objective: "Focused on profit and fast build-out; wants minimal restrictions",
        personality: "Profit-driven, wants quick implementation with minimal red tape",
        priorities: ["profit", "speed", "minimal_restrictions"],
        tone: "aggressive, profit-focused"
      },
      "Food Security Advocates": {
        objective: "Deeply opposed to farmland loss; argue rooftop and brownfield projects first",
        personality: "Passionate about food security, strongly opposed to farmland conversion",
        priorities: ["food_security", "farmland_preservation", "alternative_energy"],
        tone: "passionate, food-security-focused"
      }
    };

    const profile = stakeholderProfiles[stakeholder];
    if (!profile) {
      return res.status(400).json({ message: 'Invalid stakeholder' });
    }

    // Calculate current scenario state
    const totalSpent = Object.values(currentAllocations || {}).reduce((sum, cost) => sum + cost, 0);
    const remainingBudget = scenario.budget - totalSpent;
    const budgetUsedPercent = (totalSpent / scenario.budget) * 100;

    // Analyze recent decision impact
    let decisionImpact = "";
    if (recentDecision) {
      const { neighborhood, intervention, cost } = recentDecision;
      const interventionData = scenario.interventions[intervention];
      
      decisionImpact = `Recent decision: ${intervention} in ${neighborhood} ($${(cost/1000000).toFixed(1)}M). `;
      decisionImpact += `This provides ${interventionData.heatReduction}°C heat reduction, ${interventionData.floodRiskReduction}% flood reduction, and has ${interventionData.equityImpact} equity impact.`;
    }

    // Build context for GPT
    const context = scenario.id === "2" ? `
Scenario: ${scenario.title}
Current Budget: $${(scenario.budget/1000000).toFixed(1)}M total, $${(remainingBudget/1000000).toFixed(1)}M remaining (${budgetUsedPercent.toFixed(1)}% used)
Current Credibility: ${credibility}%

Energy & Land Status:
${scenario.neighborhoods ? Object.entries(scenario.neighborhoods).map(([name, stats]) => 
  `${name}: ${Object.entries(stats).map(([key, value]) => `${key}: ${value}`).join(', ')}`
).join('\n') : 'No neighborhood data available'}

Current Allocations:
${Object.entries(currentAllocations || {}).map(([key, cost]) => {
  const [neighborhood, intervention] = key.split('-');
  return `${intervention} in ${neighborhood}: $${(cost/1000000).toFixed(1)}M`;
}).join('\n') || 'None'}

${decisionImpact}

Stakeholder: ${stakeholder}
Objective: ${profile.objective}
Personality: ${profile.personality}
Priorities: ${profile.priorities.join(', ')}
Tone: ${profile.tone}
` : `
Scenario: ${scenario.title}
Current Budget: $${(scenario.budget/1000000).toFixed(1)}M total, $${(remainingBudget/1000000).toFixed(1)}M remaining (${budgetUsedPercent.toFixed(1)}% used)
Current Credibility: ${credibility}%

Neighborhood Status:
${scenario.neighborhoods ? Object.entries(scenario.neighborhoods).map(([name, stats]) => 
  `${name}: ${stats.floodRisk} flood risk, ${stats.heatIndex} heat index, ${stats.vulnerablePopulation}% vulnerable population`
).join('\n') : 'No neighborhood data available'}

Current Allocations:
${Object.entries(currentAllocations || {}).map(([key, cost]) => {
  const [neighborhood, intervention] = key.split('-');
  return `${intervention} in ${neighborhood}: $${(cost/1000000).toFixed(1)}M`;
}).join('\n') || 'None'}

${decisionImpact}

Stakeholder: ${stakeholder}
Objective: ${profile.objective}
Personality: ${profile.personality}
Priorities: ${profile.priorities.join(', ')}
Tone: ${profile.tone}
`;

    const prompt = `
You are ${stakeholder} in the ${scenario.title} scenario. ${profile.objective}

${profile.personality}

Current situation: ${context}

The player has asked you: "${userMessage || 'What are your thoughts on the current situation?'}"

Respond to their question and the current state. Your response should:
1. Be 2-3 sentences long
2. Directly address their question
3. Reflect your personality and priorities
4. Include implicit or explicit credibility adjustment (+/- 10% to +/- 20%)
5. Show trade-offs - no decision should be perfect
6. Be realistic and concise
7. Use a ${profile.tone} tone

Format your response as JSON:
{
  "response": "Your 2-3 sentence response here",
  "credibilityChange": -15,
  "mood": "angry|concerned|neutral|pleased|excited"
}

Credibility changes should be percentages:
- Positive (+10% to +20%): When decisions align with your priorities
- Negative (-10% to -20%): When decisions go against your priorities
- Consider budget usage, intervention types, neighborhood focus, and feasibility
`;

    // Use real GPT-4o-mini for dynamic responses

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a stakeholder in an environmental decision-making simulation. Respond as your character would, considering your objectives and the current situation."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 300
    });

    const response = completion.choices[0].message.content;
    
    // Parse JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(response);
    } catch (error) {
      // Fallback if JSON parsing fails
      parsedResponse = {
        response: response,
        credibilityChange: 0,
        mood: "neutral"
      };
    }

    res.status(200).json(parsedResponse);

  } catch (error) {
    console.error('Error generating stakeholder response:', error);
    
    // Fallback to mock responses if there's an API error (quota, etc.)
    if (error.status === 429 || error.code === 'insufficient_quota') {
      const mockResponses = {
        "City Council": {
          response: "We need to be very careful with this budget. $5M is a significant amount and we can't afford to waste it on unproven interventions. I'm concerned about the flood risk in Downtown - we need practical solutions that will actually work.",
          credibilityChange: -10,
          mood: "concerned"
        },
        "Residents' Representative": {
          response: "The vulnerable populations in Riverside are suffering the most from these heat waves and flood risks. We need immediate action to protect our community members who can't afford to relocate or adapt on their own.",
          credibilityChange: 15,
          mood: "passionate"
        },
        "Urban Developers": {
          response: "Any interventions we choose need to be feasible within reasonable construction timelines. We can't have projects that drag on for years and disrupt the entire city. What's the implementation plan?",
          credibilityChange: 0,
          mood: "neutral"
        },
        "Environmental NGO": {
          response: "This is our chance to implement truly sustainable solutions! Green roofs, rain gardens, and shade trees will not only solve the immediate problems but create a healthier ecosystem for future generations.",
          credibilityChange: 20,
          mood: "excited"
        },
        "Local Businesses": {
          response: "We're worried about construction disrupting our operations and customer access. If you're going to implement these interventions, please ensure minimal disruption to our daily business activities.",
          credibilityChange: -15,
          mood: "worried"
        }
      };

      const mockResponse = mockResponses[stakeholder] || {
        response: "I need to understand more about this situation before I can provide meaningful input.",
        credibilityChange: 0,
        mood: "neutral"
      };

      res.status(200).json(mockResponse);
      return;
    }
    
    res.status(500).json({ 
      message: 'Error generating response',
      error: error.message 
    });
  }
}