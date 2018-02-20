var coinspot = require('coinspot-api');
module.exports = function(RED) {
    function CoinspotListBalances(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.creds = RED.nodes.getNode(config.creds);

        if(!node.creds) {
            node.status({fill:"red",shape:"ring",text:"apiKey or apiSecret not entered. Please check."});
            return;
        }
            
        var client = new coinspot( node.creds.key, node.creds.password);
        node.on('input', function(msg) {
            client.balances( function(e, data){
                msg.payload=JSON.parse(data);
                node.send(msg);
            });
            
        });
    }
    RED.nodes.registerType("List Balances",CoinspotListBalances);
}
