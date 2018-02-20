var coinspot = require('coinspot-api');
module.exports = function(RED) {
    function CoinSpotSend(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.creds = RED.nodes.getNode(config.creds);

        if(!node.creds) {
            node.status({fill:"red",shape:"ring",text:"apiKey or apiSecret not entered. Please check."});
            return;
        }
            
        var client = new coinspot( node.creds.key, node.creds.password);
        node.on('input', function(msg) {
            if(!msg.cointype&&!config.cointype){
                node.status({fill:"red",shape:"ring",text:"cointype not defined"});
                return; 
            }
            if(!msg.amount&&!config.amount){
                node.status({fill:"red",shape:"ring",text:"amount not defined"});
                return; 
            }
            if(!msg.adress&&!config.adress){
                node.status({fill:"red",shape:"ring",text:"adress not defined"});
                return; 
            }
            var coin=msg.cointype||config.cointype;
            var amount=msg.amount||config.amount;
            var adress=msg.adress||config.adress;
            amount = amount.toString();
            client.sendcoin(coin, amount, adress,function(e, data){
                try{
                    msg.payload=JSON.parse(data);
                }
                catch(err){
                    msg.payload=data;
                    node.status({fill:"red",shape:"ring",text:"Server Error"});
                };
                node.send(msg);
            });
        });

    }
    RED.nodes.registerType("Send Coin",CoinSpotSend);
}
