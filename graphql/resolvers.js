const resolvers = {
    Query: {
        node: (_, { nodeId }, { dataSources }) =>
            dataSources.nodes.find(node => node._id === nodeId),
    },
    NodeObject: {
        parents: (node, _, { dataSources }) => {
            if (Array.isArray(node.parents)) {
                return node.parents.map(parent => dataSources.nodes.find(n => n._id === parent._id));
            }
            return [];
        },
        trigger: (node, _, { dataSources }) => {
            if (Array.isArray(node.trigger)) {
                return node.trigger.map(trigger => dataSources.triggers.find(t => t._id === trigger._id));
            }
            return [];
        },
        responses: (node, _, { dataSources }) => {
            if (Array.isArray(node.responses)) {
                return node.responses.map(id =>
                    dataSources.responses.find(response => response._id === id)
                );
            }
            return [];
        },
        actions: (node, _, { dataSources }) => {
            if (Array.isArray(node.actionIds)) {
                return node.actionIds.map(id =>
                    dataSources.actions.find(action => action._id === id)
                );
            }
            return [];
        },
        parentIds: (node) => {
            if (Array.isArray(node.parents)) {
                return node.parents.map(parent => parent._id);
            }
            return [];
        }
    },
    Action: {
        resourceTemplate: (action, _, { dataSources }) =>
            dataSources.resourceTemplates.find(template => template._id === action.resourceTemplateId),
    },
    Trigger: {
        resourceTemplate: (trigger, _, { dataSources }) =>
            dataSources.resourceTemplates.find(template => template._id === trigger.resourceTemplateId),
    },
    Response: {
        platforms: (response) => response.platforms,
    },
};

module.exports = resolvers;
