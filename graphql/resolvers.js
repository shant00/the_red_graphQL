const resolvers = {
    Query: {
        node: (parent, args, context) => {
            const { nodeId } = args;
            const node = context.dataSources.nodes.find(node => node._id === nodeId);
            return node || null; // Return null if node is not found
        },
        nodes: (parent, args, context) => {
            return context.dataSources.nodes || []; // Return all nodes
        },
    },
    NodeObject: {
        trigger: (node, args, context) => {
            return context.dataSources.triggers.find(trigger => trigger._id === node.triggerId) || null; // Return null if trigger not found
        },
        responses: (node, args, context) => {
            return context.dataSources.responses.filter(response => node.responseIds.includes(response._id)) || []; // Return empty array if no responses
        },
        actions: (node, args, context) => {
            return context.dataSources.actions.filter(action => node.actionIds.includes(action._id)) || []; // Return empty array if no actions
        },

    }
};

module.exports = resolvers;
