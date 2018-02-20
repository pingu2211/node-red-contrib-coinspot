module.exports = function(RED) {
    function ConfigNode(n) {
        RED.nodes.createNode(this,n);
        this.key = n.key;
        this.password = n.password;
}
    RED.nodes.registerType("coinspot-config",ConfigNode);
}