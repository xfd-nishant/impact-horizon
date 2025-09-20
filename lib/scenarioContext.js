// Scenario context management for tracking state and decisions

export class ScenarioContext {
  constructor(scenario, allocations = {}, credibility = 85, decisionHistory = [], stakeholderResponses = {}, chatMessages = {}) {
    this.scenario = scenario;
    this.allocations = allocations;
    this.credibility = credibility;
    this.decisionHistory = decisionHistory;
    this.stakeholderResponses = stakeholderResponses;
    this.chatMessages = chatMessages; // Store chat messages per stakeholder
    this.currentMetrics = this.calculateCurrentMetrics();
  }

  // Update allocations and recalculate metrics
  updateAllocations(allocations) {
    this.allocations = allocations;
    this.currentMetrics = this.calculateCurrentMetrics();
  }

  // Add a decision to history
  addDecision(decision) {
    this.decisionHistory.push({
      ...decision,
      timestamp: new Date().toISOString(),
      credibility: this.credibility
    });
  }

  // Update credibility based on stakeholder response
  updateCredibility(change) {
    this.credibility = Math.max(0, Math.min(100, this.credibility + change));
  }

  // Store stakeholder response
  addStakeholderResponse(stakeholder, response) {
    if (!this.stakeholderResponses[stakeholder]) {
      this.stakeholderResponses[stakeholder] = [];
    }
    this.stakeholderResponses[stakeholder].push({
      ...response,
      timestamp: new Date().toISOString()
    });
  }

  // Calculate current metrics based on allocations
  calculateCurrentMetrics() {
    const totalSpent = Object.values(this.allocations).reduce((sum, cost) => sum + cost, 0);
    const remainingBudget = this.scenario.budget - totalSpent;
    
    // Calculate heat and flood reduction based on interventions
    let totalHeatReduction = 0;
    let totalFloodReduction = 0;
    let equityScore = 0;
    
    Object.entries(this.allocations).forEach(([key, cost]) => {
      const [neighborhood, intervention] = key.split('-');
      const interventionData = this.scenario.interventions[intervention];
      
      if (interventionData) {
        totalHeatReduction += interventionData.heatReduction;
        totalFloodReduction += interventionData.floodRiskReduction;
        
        // Simple equity scoring
        if (interventionData.equityImpact === 'High') equityScore += 3;
        else if (interventionData.equityImpact === 'Medium') equityScore += 2;
        else if (interventionData.equityImpact === 'Low') equityScore += 1;
      }
    });

    return {
      totalSpent,
      remainingBudget,
      budgetUsedPercent: (totalSpent / this.scenario.budget) * 100,
      totalHeatReduction,
      totalFloodReduction,
      equityScore,
      allocationCount: Object.keys(this.allocations).length
    };
  }

  // Get context for API calls
  getContext() {
    return {
      scenario: this.scenario,
      allocations: this.allocations,
      credibility: this.credibility,
      metrics: this.currentMetrics,
      recentDecision: this.decisionHistory[this.decisionHistory.length - 1] || null
    };
  }

  // Get stakeholder response history
  getStakeholderHistory(stakeholder) {
    return this.stakeholderResponses[stakeholder] || [];
  }

  // Get all recent responses (last 5)
  getRecentResponses() {
    const allResponses = [];
    Object.entries(this.stakeholderResponses).forEach(([stakeholder, responses]) => {
      responses.forEach(response => {
        allResponses.push({
          stakeholder,
          ...response
        });
      });
    });
    
    return allResponses
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5);
  }

  // Chat message management
  addChatMessage(stakeholder, message) {
    if (!this.chatMessages[stakeholder]) {
      this.chatMessages[stakeholder] = [];
    }
    this.chatMessages[stakeholder].push({
      ...message,
      timestamp: new Date().toISOString()
    });
  }

  getChatMessages(stakeholder) {
    return this.chatMessages[stakeholder] || [];
  }

  clearChatMessages(stakeholder) {
    if (this.chatMessages[stakeholder]) {
      this.chatMessages[stakeholder] = [];
    }
  }
}

// Create context instance for a scenario
export function createScenarioContext(scenario) {
  return new ScenarioContext(scenario);
}