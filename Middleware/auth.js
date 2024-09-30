const resolvers = {
    Query: {
        node: (parent, args, context) => {
            const { nodeId } = args;
            const node = context.dataSources.nodes.find(node => node._id === nodeId);
            return node;
        }
    },
    NodeObject: {
        trigger: (node, args, context) => {
            return context.dataSources.triggers.find(trigger => trigger._id === node.triggerId);
        },
        responses: (node, args, context) => {
            return context.dataSources.responses.filter(response => node.responseIds.includes(response._id));
        },
        actions: (node, args, context) => {
            return context.dataSources.actions.filter(action => node.actionIds.includes(action._id));
        }
    }
};

module.exports = resolvers;
