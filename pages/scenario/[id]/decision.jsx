import Head from "next/head";
import { useRouter } from "next/router";
import scenarios from "../../../data/scenarios.json";
import { ScenarioContextProvider, useScenarioContext } from "../../../contexts/ScenarioContext";
import DecisionFeedback from "../../../components/DecisionFeedback";
import NewObjectivePhase from "../../../components/NewObjectivePhase";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function DecisionPageContent() {
  const router = useRouter();
  const { id } = router.query;
  const scenario = scenarios.find((s) => s.id === String(id));
  const { context, updateAllocations, addDecision } = useScenarioContext();
  
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);
  const [allocations, setAllocations] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [submittedAllocations, setSubmittedAllocations] = useState(null);
  const [showNewObjective, setShowNewObjective] = useState(false);

  const getTotalAllocationCost = () => {
    return Object.values(allocations).reduce((sum, cost) => sum + cost, 0);
  };

  const remainingBudget = scenario.budget - getTotalAllocationCost();

  if (!scenario) {
    return (
      <div className="min-h-screen bg-forest-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-forest-100">Scenario not found</h1>
          <p className="text-forest-400 mt-2">The requested scenario could not be found.</p>
        </div>
      </div>
    );
  }

  const neighborhoods = Object.keys(scenario.neighborhoods || {});
  const interventions = Object.keys(scenario.interventions || {});

  const calculateAllocationCost = (neighborhood, intervention) => {
    const key = `${neighborhood}-${intervention}`;
    return allocations[key] || 0;
  };

  const updateAllocation = (neighborhood, intervention, cost) => {
    const key = `${neighborhood}-${intervention}`;
    const newAllocations = { ...allocations };
    
    if (cost === 0) {
      delete newAllocations[key];
    } else {
      newAllocations[key] = cost;
    }
    
    setAllocations(newAllocations);
  };

  const handleSubmitDecision = () => {
    const totalSpent = getTotalAllocationCost();
    const budget = scenario.budget;
    
    // Check budget constraints
    if (totalSpent > budget * 1.2) {
      alert("Decision rejected! You are significantly over budget. Please rebalance your allocations.");
      return;
    }

    // Store the submitted allocations and show feedback screen
    setSubmittedAllocations({
      allocations,
      totalSpent,
      budget
    });
    setShowFeedback(true);

    console.log("Decision submitted:", allocations);
    
    if (addDecision) {
      addDecision({
        type: 'intervention_allocation',
        allocations: allocations,
        totalCost: totalSpent
      });
    }
  };

  const handleContinue = (phase) => {
    if (phase === 'new_objective') {
      setShowFeedback(false);
      setShowNewObjective(true);
    } else {
      // Navigate to next phase or back to dashboard
      router.push('/dashboard');
    }
  };

  const handleRestart = () => {
    setShowFeedback(false);
    setShowNewObjective(false);
    setSubmittedAllocations(null);
    setAllocations({});
    setSelectedNeighborhood(null);
  };

  const handleNewObjectiveContinue = () => {
    // Navigate to next phase or back to dashboard
    router.push('/dashboard');
  };

  // Show new objective phase
  if (showNewObjective && submittedAllocations) {
    return (
      <NewObjectivePhase
        scenario={scenario}
        previousAllocations={submittedAllocations.allocations}
        onContinue={handleNewObjectiveContinue}
      />
    );
  }

  // Show feedback screen if decision has been submitted
  if (showFeedback && submittedAllocations) {
    return (
      <DecisionFeedback
        scenario={scenario}
        allocations={submittedAllocations.allocations}
        totalSpent={submittedAllocations.totalSpent}
        budget={submittedAllocations.budget}
        onContinue={handleContinue}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <>
      <Head>
        <title>{scenario.title} - Decision • Impact Horizon</title>
      </Head>
      
      <div className="min-h-screen bg-forest-950">
        {/* Header */}
        <div className="bg-forest-900 border-b border-forest-700 py-6">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-forest-100">
                  {scenario.title}
                </h1>
                <p className="text-forest-400 mt-1">
                  Decision Making Phase
                </p>
              </div>
              <div className="flex space-x-4">
                <button 
                  onClick={() => router.push(`/scenario/${scenario.id}/chat`)}
                  className="btn-secondary text-sm"
                >
                  Back to Stakeholders
                </button>
                <button 
                  onClick={() => router.push(`/scenario/${scenario.id}/briefing`)}
                  className="btn-secondary text-sm"
                >
                  Back to Briefing
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-8">
          {/* Budget and Metrics Panel */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card p-6">
              <h3 className="font-semibold text-forest-100 mb-2 text-cyber-glow">BUDGET</h3>
              <div className={`text-2xl font-mono ${
                remainingBudget < 0 ? 'text-red-400' : 'text-forest-200'
              }`}>
                ${(remainingBudget / 1000000).toFixed(1)}M
              </div>
              <div className={`text-xs mt-1 ${
                remainingBudget < 0 ? 'text-red-400' : 'text-forest-400'
              }`}>
                {remainingBudget < 0 ? 'OVER BUDGET!' : 'Remaining'}
              </div>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-forest-100 mb-2 text-cyber-glow">ALLOCATED</h3>
              <div className="text-2xl font-mono text-forest-200">
                ${(getTotalAllocationCost() / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs text-forest-400 mt-1">Total Spent</div>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-forest-100 mb-2 text-cyber-glow">CREDIBILITY</h3>
              <div className="text-2xl font-mono text-forest-200">{context?.credibility || 85}%</div>
              <div className="text-xs text-forest-400 mt-1">Current Level</div>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-forest-100 mb-2 text-cyber-glow">PROGRESS</h3>
              <div className="text-2xl font-mono text-forest-200">
                {Object.keys(allocations).length}
              </div>
              <div className="text-xs text-forest-400 mt-1">Allocations Made</div>
            </div>
          </div>

          {/* Neighborhood Selection */}
          <div className="card p-6 mb-8">
            <h3 className="font-semibold text-forest-100 mb-4 text-cyber-glow">
              SELECT NEIGHBORHOOD
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {neighborhoods.map((neighborhood) => (
                <button
                  key={neighborhood}
                  onClick={() => setSelectedNeighborhood(neighborhood)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedNeighborhood === neighborhood
                      ? 'border-forest-500 bg-forest-700/50'
                      : 'border-forest-700 hover:border-forest-600'
                  }`}
                >
                  <div className="font-medium text-forest-200 mb-2">{neighborhood}</div>
                  <div className="text-sm text-forest-400 space-y-1">
                    <div>Flood Risk: {scenario.neighborhoods[neighborhood].floodRisk}</div>
                    <div>Heat Index: {scenario.neighborhoods[neighborhood].heatIndex}</div>
                    <div>Vulnerable: {scenario.neighborhoods[neighborhood].vulnerablePopulation}%</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Intervention Allocation */}
          {selectedNeighborhood && (
            <div className="card p-6 mb-8">
              <h3 className="font-semibold text-forest-100 mb-4 text-cyber-glow">
                ALLOCATE INTERVENTIONS - {selectedNeighborhood.toUpperCase()}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {interventions.map((intervention) => {
                  const data = scenario.interventions[intervention];
                  const currentAllocation = calculateAllocationCost(selectedNeighborhood, intervention);
                  const canAfford = true; // Always allow allocation - budget check happens on submit
                  
                  return (
                    <div key={intervention} className="bg-forest-800/50 rounded-lg p-4">
                      <div className="font-medium text-forest-200 mb-3">{intervention}</div>
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex justify-between">
                          <span className="text-forest-400">Cost:</span>
                          <span className="text-forest-300">${(data.cost / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-forest-400">Heat ↓:</span>
                          <span className="text-forest-300">{data.heatReduction}°C</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-forest-400">Flood ↓:</span>
                          <span className="text-forest-300">{data.floodRiskReduction}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-forest-400">Equity:</span>
                          <span className="text-forest-300">{data.equityImpact}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateAllocation(selectedNeighborhood, intervention, data.cost)}
                          disabled={currentAllocation > 0}
                          className={`flex-1 py-2 px-3 rounded text-xs font-medium transition-all ${
                            currentAllocation === 0
                              ? 'bg-forest-600 hover:bg-forest-500 text-forest-100'
                              : 'bg-forest-700 text-forest-400 cursor-not-allowed'
                          }`}
                        >
                          {currentAllocation > 0 ? 'Allocated' : 'Allocate'}
                        </button>
                        {currentAllocation > 0 && (
                          <button
                            onClick={() => updateAllocation(selectedNeighborhood, intervention, 0)}
                            className="py-2 px-3 rounded text-xs font-medium bg-red-600 hover:bg-red-500 text-white"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Current Allocations Summary */}
          {Object.keys(allocations).length > 0 && (
            <div className="card p-6 mb-8">
              <h3 className="font-semibold text-forest-100 mb-4 text-cyber-glow">
                CURRENT ALLOCATIONS
              </h3>
              <div className="space-y-2">
                {Object.entries(allocations).map(([key, cost]) => {
                  const [neighborhood, intervention] = key.split('-');
                  return (
                    <div key={key} className="flex justify-between items-center bg-forest-800/50 rounded-lg p-3">
                      <div>
                        <span className="font-medium text-forest-200">{neighborhood}</span>
                        <span className="text-forest-400 mx-2">•</span>
                        <span className="text-forest-300">{intervention}</span>
                      </div>
                      <div className="font-mono text-forest-200">
                        ${(cost / 1000000).toFixed(1)}M
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Submit Decision */}
          <div className="card p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-forest-100 mb-4 text-cyber-glow">
                SUBMIT YOUR DECISION
              </h3>
              <p className="text-forest-300 mb-6">
                Review your allocations and submit your final decision for {scenario.title}.
              </p>
              <button 
                onClick={handleSubmitDecision}
                className="btn-primary text-lg px-8 py-3"
              >
                Submit Decision
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function DecisionPage() {
  const router = useRouter();
  const { id } = router.query;
  const scenario = scenarios.find((s) => s.id === String(id));

  if (!scenario) {
    return (
      <div className="min-h-screen bg-forest-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-forest-100">Scenario not found</h1>
          <p className="text-forest-400 mt-2">The requested scenario could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <ScenarioContextProvider scenario={scenario}>
      <DecisionPageContent />
    </ScenarioContextProvider>
  );
}