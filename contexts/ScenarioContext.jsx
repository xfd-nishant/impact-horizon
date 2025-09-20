import { createContext, useContext, useState, useEffect } from 'react';
import { createScenarioContext } from '../lib/scenarioContext';

const ScenarioContext = createContext();

export function ScenarioContextProvider({ children, scenario }) {
  const [context, setContext] = useState(null);

  useEffect(() => {
    if (scenario) {
      setContext(createScenarioContext(scenario));
    }
  }, [scenario]);

  const updateAllocations = (allocations) => {
    if (context) {
      const newContext = createScenarioContext(
        context.scenario, 
        allocations, 
        context.credibility, 
        context.decisionHistory, 
        context.stakeholderResponses
      );
      setContext(newContext);
    }
  };

  const addDecision = (decision) => {
    if (context) {
      const newDecisionHistory = [...context.decisionHistory, {
        ...decision,
        timestamp: new Date().toISOString(),
        credibility: context.credibility
      }];
      const newContext = createScenarioContext(
        context.scenario, 
        context.allocations, 
        context.credibility, 
        newDecisionHistory, 
        context.stakeholderResponses
      );
      setContext(newContext);
    }
  };

  const updateCredibility = (change) => {
    if (context) {
      const newCredibility = Math.max(0, Math.min(100, context.credibility + change));
      const newContext = createScenarioContext(
        context.scenario, 
        context.allocations, 
        newCredibility, 
        context.decisionHistory, 
        context.stakeholderResponses
      );
      setContext(newContext);
    }
  };

  const addStakeholderResponse = (stakeholder, response) => {
    if (context) {
      const newResponses = { ...context.stakeholderResponses };
      if (!newResponses[stakeholder]) {
        newResponses[stakeholder] = [];
      }
      newResponses[stakeholder].push({
        ...response,
        timestamp: new Date().toISOString()
      });
      const newContext = createScenarioContext(
        context.scenario, 
        context.allocations, 
        context.credibility, 
        context.decisionHistory, 
        newResponses,
        context.chatMessages
      );
      setContext(newContext);
    }
  };

  const addChatMessage = (stakeholder, message) => {
    if (context) {
      const newMessages = { ...context.chatMessages };
      if (!newMessages[stakeholder]) {
        newMessages[stakeholder] = [];
      }
      newMessages[stakeholder].push({
        ...message,
        timestamp: new Date().toISOString()
      });
      const newContext = createScenarioContext(
        context.scenario, 
        context.allocations, 
        context.credibility, 
        context.decisionHistory, 
        context.stakeholderResponses,
        newMessages
      );
      setContext(newContext);
    }
  };

  const getChatMessages = (stakeholder) => {
    return context?.getChatMessages(stakeholder) || [];
  };

  const getStakeholderResponse = async (stakeholder) => {
    if (!context) return null;

    try {
      const response = await fetch('/api/stakeholder-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stakeholder,
          ...context.getContext()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Response is not JSON');
      }

      const data = await response.json();
      
      // Update credibility
      if (data.credibilityChange) {
        updateCredibility(data.credibilityChange);
      }

      // Store response
      addStakeholderResponse(stakeholder, data);

      return data;
    } catch (error) {
      console.error('Error getting stakeholder response:', error);
      return null;
    }
  };

  const value = {
    context,
    updateAllocations,
    addDecision,
    updateCredibility,
    addStakeholderResponse,
    addChatMessage,
    getChatMessages,
    getStakeholderResponse
  };

  return (
    <ScenarioContext.Provider value={value}>
      {children}
    </ScenarioContext.Provider>
  );
}

export function useScenarioContext() {
  const context = useContext(ScenarioContext);
  if (!context) {
    throw new Error('useScenarioContext must be used within a ScenarioContextProvider');
  }
  return context;
}