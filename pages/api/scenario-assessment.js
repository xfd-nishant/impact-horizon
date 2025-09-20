import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { 
      scenario,
      allocations,
      totalSpent,
      budget,
      credibility
    } = req.body;

    // Calculate budget status
    const budgetUsedPercent = (totalSpent / budget) * 100;
    const isOverBudget = totalSpent > budget;
    const isSignificantlyOverBudget = totalSpent > budget * 1.2;

    // Analyze allocations
    const greenInterventions = [];
    const greyInterventions = [];
    let totalHeatReduction = 0;
    let totalFloodReduction = 0;
    let equityScore = 0;

    Object.entries(allocations).forEach(([key, cost]) => {
      const [neighborhood, intervention] = key.split('-');
      const interventionData = scenario.interventions[intervention];
      
      if (interventionData) {
        totalHeatReduction += interventionData.heatReduction;
        totalFloodReduction += interventionData.floodRiskReduction;
        
        if (interventionData.equityImpact === 'High') equityScore += 3;
        else if (interventionData.equityImpact === 'Medium') equityScore += 2;
        else if (interventionData.equityImpact === 'Low') equityScore += 1;

        // Categorize interventions
        if (['Green Roofs', 'Rain Gardens', 'Shade Trees', 'Permeable Pavement'].includes(intervention)) {
          greenInterventions.push({ intervention, cost, neighborhood });
        } else {
          greyInterventions.push({ intervention, cost, neighborhood });
        }
      }
    });

    const context = `
Scenario: ${scenario.title}
Budget: $${(budget/1000000).toFixed(1)}M
Amount Spent: $${(totalSpent/1000000).toFixed(1)}M
Budget Used: ${budgetUsedPercent.toFixed(1)}%
Over Budget: ${isOverBudget ? 'Yes' : 'No'}
Significantly Over Budget: ${isSignificantlyOverBudget ? 'Yes' : 'No'}

Current Allocations:
${Object.entries(allocations).map(([key, cost]) => {
  const [neighborhood, intervention] = key.split('-');
  return `${intervention} in ${neighborhood}: $${(cost/1000000).toFixed(1)}M`;
}).join('\n') || 'None'}

Green Interventions: ${greenInterventions.length} ($${(greenInterventions.reduce((sum, i) => sum + i.cost, 0)/1000000).toFixed(1)}M)
Grey Interventions: ${greyInterventions.length} ($${(greyInterventions.reduce((sum, i) => sum + i.cost, 0)/1000000).toFixed(1)}M)

Projected Impact:
- Heat Reduction: ${totalHeatReduction}°C
- Flood Risk Reduction: ${totalFloodReduction}%
- Equity Score: ${equityScore}/10

Neighborhood Status:
${Object.entries(scenario.neighborhoods).map(([name, stats]) => 
  `${name}: ${stats.floodRisk} flood risk, ${stats.heatIndex} heat index, ${stats.vulnerablePopulation}% vulnerable population`
).join('\n')}

Current Credibility: ${credibility}%
`;

    const prompt = `
You are the decision engine for the city redevelopment scenario. 

${context}

Analyze this decision and provide feedback from each stakeholder perspective. For each stakeholder, provide:

1. **Reaction** (2-3 sentences in their own voice)
2. **Credibility Change** (+/- value between -2 and +2)

Stakeholders to analyze:
- City Council (budget-conscious, efficiency-focused)
- Residents' Representative (vulnerable populations, community safety)
- Urban Developers (feasibility, construction timelines)
- Environmental NGO (green solutions, sustainability)
- Local Businesses (disruption, revenue impact)

Then provide an overall **Scenario Consequence Summary** covering:
- Flood risk mitigation effectiveness
- Heat reduction impact
- Equity implications
- Long-term cost implications
- Overall project viability

Format your response as JSON:
{
  "stakeholderReactions": {
    "City Council": {
      "reaction": "Reaction text here",
      "credibilityChange": -1
    },
    "Residents' Representative": {
      "reaction": "Reaction text here", 
      "credibilityChange": 2
    },
    "Urban Developers": {
      "reaction": "Reaction text here",
      "credibilityChange": 0
    },
    "Environmental NGO": {
      "reaction": "Reaction text here",
      "credibilityChange": 1
    },
    "Local Businesses": {
      "reaction": "Reaction text here",
      "credibilityChange": -1
    }
  },
  "scenarioConsequence": {
    "floodRiskMitigation": "Assessment of flood risk reduction effectiveness",
    "heatReduction": "Assessment of heat reduction impact", 
    "equityImplications": "Assessment of equity and vulnerable population impact",
    "longTermCosts": "Assessment of maintenance and long-term cost implications",
    "overallViability": "Overall project viability and recommendations"
  },
  "budgetStatus": {
    "valid": ${!isSignificantlyOverBudget},
    "overBudget": ${isOverBudget},
    "significantlyOverBudget": ${isSignificantlyOverBudget},
    "message": "${isSignificantlyOverBudget ? 'Decision rejected - significantly over budget' : isOverBudget ? 'Decision accepted but over budget - negative consequences' : 'Decision valid'}"
  }
}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a decision assessment engine for environmental city planning. Analyze decisions from multiple stakeholder perspectives and provide comprehensive feedback."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const response = completion.choices[0].message.content;
    
    // Parse JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(response);
    } catch (error) {
      // Fallback if JSON parsing fails
      parsedResponse = {
        stakeholderReactions: {
          "City Council": {
            reaction: "We need to review this decision carefully given the budget implications.",
            credibilityChange: -1
          },
          "Residents' Representative": {
            reaction: "I'm concerned about how this will affect our most vulnerable residents.",
            credibilityChange: 0
          },
          "Urban Developers": {
            reaction: "The implementation timeline needs to be carefully managed.",
            credibilityChange: 0
          },
          "Environmental NGO": {
            reaction: "This decision shows some promise for environmental sustainability.",
            credibilityChange: 1
          },
          "Local Businesses": {
            reaction: "We're worried about the potential disruption to our operations.",
            credibilityChange: -1
          }
        },
        scenarioConsequence: {
          floodRiskMitigation: "Moderate flood risk reduction achieved",
          heatReduction: "Some heat reduction benefits",
          equityImplications: "Mixed equity impact",
          longTermCosts: "Consider long-term maintenance costs",
          overallViability: "Decision is viable with some concerns"
        },
        budgetStatus: {
          valid: !isSignificantlyOverBudget,
          overBudget: isOverBudget,
          significantlyOverBudget: isSignificantlyOverBudget,
          message: isSignificantlyOverBudget ? 'Decision rejected - significantly over budget' : isOverBudget ? 'Decision accepted but over budget - negative consequences' : 'Decision valid'
        }
      };
    }

    res.status(200).json(parsedResponse);

  } catch (error) {
    console.error('Error generating decision assessment:', error);
    res.status(500).json({ 
      message: 'Error generating assessment',
      error: error.message 
    });
  }
}