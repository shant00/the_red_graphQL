const { nodes, triggers, responses, actions, resourceTemplates } = require('../dataSource');

let nodeObjects = nodes;
const resolvers = {
    Query: {
        node: (_, { nodeId }) => nodeObjects.find(node => node._id === nodeId),
        nodes: () => nodeObjects,
    },
    NodeObject: {
        trigger: (node) => triggers.find(trigger => trigger._id === node.triggerId),
        responses: (node) => {
            if (Array.isArray(node.responses)) {
                return node.responses.map(id => responses.find(response => response._id === id));
            }
            return [];
        },
        actions: (node) => {
            // Check if actionIds exists and is an array
            if (Array.isArray(node.actionIds)) {
                return node.actionIds.map(id => actions.find(action => action._id === id));
            }
            // Return an empty array if no actionIds
            return [];
        },
        parentIds: (node) => node.parents.map(parent => parent._id),
    },
    Action: {
        resourceTemplate: (action) => resourceTemplates.find(template => template._id === action.resourceTemplateId),
    },
    Trigger: {
        resourceTemplate: (trigger) => resourceTemplates.find(template => template._id === trigger.resourceTemplateId),
    },
    Response: {
        platforms: (response) => response.platforms,
    },
};

module.exports = resolvers;
