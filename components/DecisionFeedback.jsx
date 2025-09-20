import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function DecisionFeedback({ 
  scenario, 
  allocations, 
  totalSpent, 
  budget, 
  onContinue, 
  onRestart 
}) {
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [credibilityChange, setCredibilityChange] = useState(0);

  useEffect(() => {
    fetchAssessment();
  }, []);

  const fetchAssessment = async () => {
    try {
      const response = await fetch('/api/decision-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario,
          allocations,
          totalSpent,
          budget,
          credibility: 85 // Default credibility
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAssessment(data);
      
      // Calculate total credibility change
      let totalChange = 0;
      if (data.stakeholderReactions) {
        Object.values(data.stakeholderReactions).forEach(reaction => {
          totalChange += reaction.credibilityChange || 0;
        });
      }
      setCredibilityChange(totalChange);
      
    } catch (error) {
      console.error('Error fetching assessment:', error);
      // Fallback assessment
      setAssessment({
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
          valid: totalSpent <= budget,
          overBudget: totalSpent > budget,
          message: totalSpent > budget ? 'Decision accepted but over budget - negative consequences' : 'Decision valid'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-forest-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-forest-100">Analyzing Your Decision...</h2>
          <p className="text-forest-400 mt-2">Processing stakeholder reactions and scenario consequences</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-forest-950 py-8">
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-forest-100 mb-4 text-cyber-glow">
            DECISION ASSESSMENT
          </h1>
          <div className="w-24 h-1 bg-forest-600 mx-auto"></div>
        </div>

        {/* Budget Status */}
        <div className="card p-6 mb-8">
          <h2 className="text-2xl font-semibold text-forest-100 mb-4 text-cyber-glow">
            BUDGET ANALYSIS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-mono text-forest-200">
                ${(totalSpent / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-forest-400">Amount Spent</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-mono text-forest-200">
                ${(budget / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-forest-400">Total Budget</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-mono ${
                assessment?.budgetStatus?.overBudget ? 'text-red-400' : 'text-green-400'
              }`}>
                {assessment?.budgetStatus?.message || 'Decision Valid'}
              </div>
              <div className="text-sm text-forest-400">Status</div>
            </div>
          </div>
        </div>

        {/* Stakeholder Reactions */}
        <div className="card p-6 mb-8">
          <h2 className="text-2xl font-semibold text-forest-100 mb-6 text-cyber-glow">
            STAKEHOLDER REACTIONS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assessment?.stakeholderReactions && Object.entries(assessment.stakeholderReactions).map(([stakeholder, reaction]) => (
              <motion.div
                key={stakeholder}
                className="bg-forest-800/50 rounded-lg p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-forest-200">{stakeholder}</h3>
                  <div className={`text-sm font-mono ${
                    reaction.credibilityChange > 0 ? 'text-green-400' : 
                    reaction.credibilityChange < 0 ? 'text-red-400' : 'text-forest-400'
                  }`}>
                    {reaction.credibilityChange > 0 ? '+' : ''}{reaction.credibilityChange}
                  </div>
                </div>
                <p className="text-forest-300 text-sm leading-relaxed">
                  {reaction.reaction}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scenario Consequences */}
        <div className="card p-6 mb-8">
          <h2 className="text-2xl font-semibold text-forest-100 mb-6 text-cyber-glow">
            SCENARIO CONSEQUENCES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-forest-200 mb-2">Flood Risk Mitigation</h3>
              <p className="text-forest-300 text-sm mb-4">
                {assessment?.scenarioConsequence?.floodRiskMitigation}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-forest-200 mb-2">Heat Reduction</h3>
              <p className="text-forest-300 text-sm mb-4">
                {assessment?.scenarioConsequence?.heatReduction}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-forest-200 mb-2">Equity Implications</h3>
              <p className="text-forest-300 text-sm mb-4">
                {assessment?.scenarioConsequence?.equityImplications}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-forest-200 mb-2">Long-term Costs</h3>
              <p className="text-forest-300 text-sm mb-4">
                {assessment?.scenarioConsequence?.longTermCosts}
              </p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-forest-800/30 rounded-lg">
            <h3 className="font-semibold text-forest-200 mb-2">Overall Viability</h3>
            <p className="text-forest-300">
              {assessment?.scenarioConsequence?.overallViability}
            </p>
          </div>
        </div>

        {/* Credibility Impact */}
        {credibilityChange !== 0 && (
          <div className="card p-6 mb-8">
            <h2 className="text-2xl font-semibold text-forest-100 mb-4 text-cyber-glow">
              CREDIBILITY IMPACT
            </h2>
            <div className="text-center">
              <div className={`text-4xl font-mono mb-2 ${
                credibilityChange > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {credibilityChange > 0 ? '+' : ''}{credibilityChange}
              </div>
              <p className="text-forest-300">
                {credibilityChange > 0 ? 'Stakeholder confidence increased' : 'Stakeholder confidence decreased'}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6">
          <button
            onClick={onRestart}
            className="btn-secondary px-8 py-3"
          >
            Try Different Allocations
          </button>
          <button
            onClick={() => onContinue('new_objective')}
            className="btn-primary px-8 py-3"
          >
            Address New Objectives
          </button>
          <button
            onClick={() => onContinue('next_phase')}
            className="btn-secondary px-8 py-3"
          >
            Continue to Next Phase
          </button>
        </div>
      </div>
    </div>
  );
}