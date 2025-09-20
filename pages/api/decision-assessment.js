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
    let totalEnergyOutput = 0;
    let totalJobsCreated = 0;
    let equityScore = 0;
    let landImpactScore = 0;
    let foodSecurityScore = 0;

    Object.entries(allocations).forEach(([key, cost]) => {
      const [neighborhood, intervention] = key.split('-');
      const interventionData = scenario.interventions[intervention];
      
      if (interventionData) {
        // Scenario 1 metrics
        if (interventionData.heatReduction !== undefined) {
          totalHeatReduction += interventionData.heatReduction;
        }
        if (interventionData.floodRiskReduction !== undefined) {
          totalFloodReduction += interventionData.floodRiskReduction;
        }
        
        // Scenario 2 metrics
        if (interventionData.energyOutput !== undefined) {
          totalEnergyOutput += interventionData.energyOutput;
        }
        if (interventionData.jobsCreated !== undefined) {
          totalJobsCreated += interventionData.jobsCreated;
        }
        if (interventionData.landImpact !== undefined) {
          if (interventionData.landImpact === 'High') landImpactScore += 3;
          else if (interventionData.landImpact === 'Medium') landImpactScore += 2;
          else if (interventionData.landImpact === 'Low') landImpactScore += 1;
        }
        if (interventionData.foodSecurityImpact !== undefined) {
          if (interventionData.foodSecurityImpact === 'High') foodSecurityScore += 3;
          else if (interventionData.foodSecurityImpact === 'Medium') foodSecurityScore += 2;
          else if (interventionData.foodSecurityImpact === 'Low') foodSecurityScore += 1;
        }
        
        // Equity scoring
        if (interventionData.equityImpact === 'High') equityScore += 3;
        else if (interventionData.equityImpact === 'Medium') equityScore += 2;
        else if (interventionData.equityImpact === 'Low') equityScore += 1;

        // Categorize interventions
        if (scenario.id === "2") {
          // Solar scenario categorization
          if (['Rooftop Panels Program', 'Brownfield Solar', 'Distributed Solar Arrays', 'Agricultural Solar (Agrivoltaics)'].includes(intervention)) {
            greenInterventions.push({ intervention, cost, neighborhood });
          } else {
            greyInterventions.push({ intervention, cost, neighborhood });
          }
        } else {
          // Heat/flood scenario categorization
          if (['Green Roofs', 'Rain Gardens', 'Shade Trees', 'Permeable Pavement'].includes(intervention)) {
            greenInterventions.push({ intervention, cost, neighborhood });
          } else {
            greyInterventions.push({ intervention, cost, neighborhood });
          }
        }
      }
    });

    const context = scenario.id === "2" ? `
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

Renewable Interventions: ${greenInterventions.length} ($${(greenInterventions.reduce((sum, i) => sum + i.cost, 0)/1000000).toFixed(1)}M)
Traditional Interventions: ${greyInterventions.length} ($${(greyInterventions.reduce((sum, i) => sum + i.cost, 0)/1000000).toFixed(1)}M)

Projected Impact:
- Energy Output: ${totalEnergyOutput} MW
- Jobs Created: ${totalJobsCreated}
- Land Impact Score: ${landImpactScore}/10
- Food Security Score: ${foodSecurityScore}/10
- Equity Score: ${equityScore}/10

Energy & Land Status:
${Object.entries(scenario.neighborhoods).map(([name, stats]) => 
  `${name}: ${Object.entries(stats).map(([key, value]) => `${key}: ${value}`).join(', ')}`
).join('\n')}

Current Credibility: ${credibility}%
` : `
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
You are the decision engine for the ${scenario.id === "2" ? "solar energy development" : "city redevelopment"} scenario. 

${context}

Analyze this decision and provide feedback from each stakeholder perspective. For each stakeholder, provide:

1. **Reaction** (2-3 sentences in their own voice)
2. **Credibility Change** (+/- percentage between -20% and +20%)

${scenario.id === "2" ? `
Stakeholders to analyze:
- City Council (climate goals, clean energy targets)
- Farmers' Association (farmland preservation, agricultural income)
- Environmental NGO (renewable energy, biodiversity safeguards)
- Local Residents (energy costs vs food security concerns)
- Solar Developer (profit, fast build-out, minimal restrictions)
- Food Security Advocates (farmland preservation, alternative energy)

Then provide an overall **Scenario Consequence Summary** covering:
- Energy output and renewable energy goals
- Land use and agricultural impact
- Food security implications
- Job creation and economic impact
- Overall project viability
` : `
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
`}

Format your response as JSON with stakeholder reactions, scenario consequences, and budget status.

For Scenario 2, include these stakeholders: City Council, Farmers' Association, Environmental NGO, Local Residents, Solar Developer, Food Security Advocates.

For Scenario 1, include these stakeholders: City Council, Residents' Representative, Urban Developers, Environmental NGO, Local Businesses.

Include credibility changes as percentages between -20% and +20%.

Budget status: valid=${!isSignificantlyOverBudget}, overBudget=${isOverBudget}, significantlyOverBudget=${isSignificantlyOverBudget}
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
      parsedResponse = scenario.id === "2" ? {
        stakeholderReactions: {
          "City Council": {
            reaction: "We need to carefully evaluate this decision against our climate goals and renewable energy targets.",
            credibilityChange: -10
          },
          "Farmers' Association": {
            reaction: "We're deeply concerned about the impact on our agricultural land and rural livelihoods.",
            credibilityChange: 15
          },
          "Environmental NGO": {
            reaction: "This decision shows promise for renewable energy but we need to ensure biodiversity safeguards.",
            credibilityChange: 0
          },
          "Local Residents": {
            reaction: "We're torn between cheaper energy and concerns about food security and land use.",
            credibilityChange: 10
          },
          "Solar Developer": {
            reaction: "We need to ensure this project can proceed efficiently with minimal regulatory delays.",
            credibilityChange: -15
          },
          "Food Security Advocates": {
            reaction: "We strongly oppose any decision that sacrifices farmland for energy production.",
            credibilityChange: 20
          }
        },
        scenarioConsequence: {
          energyOutput: "Moderate renewable energy generation achieved",
          landUseImpact: "Significant agricultural land use implications",
          foodSecurity: "Mixed impact on food security and agricultural economy",
          jobCreation: "Some employment opportunities created",
          overallViability: "Decision is viable with significant trade-offs"
        },
        budgetStatus: {
          valid: !isSignificantlyOverBudget,
          overBudget: isOverBudget,
          significantlyOverBudget: isSignificantlyOverBudget,
          message: isSignificantlyOverBudget ? 'Decision rejected - significantly over budget' : isOverBudget ? 'Decision accepted but over budget - negative consequences' : 'Decision valid'
        }
      } : {
        stakeholderReactions: {
          "City Council": {
            reaction: "We need to review this decision carefully given the budget implications.",
            credibilityChange: -10
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
            credibilityChange: 10
          },
          "Local Businesses": {
            reaction: "We're worried about the potential disruption to our operations.",
            credibilityChange: -15
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