var coinspot = require('coinspot-api');
module.exports = function(RED) {
    function CoinSpotBuy(config) {
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
            if(!msg.rate&&!config.rate){
                node.status({fill:"red",shape:"ring",text:"rate not defined"});
                return; 
            }
            var coin=msg.cointype||config.cointype;
            var amount=msg.amount||config.amount;
            var rate=msg.rate||config.rate;
            amount = amount.toString();
            client.sell(coin, amount, rate,function(e, data){
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
    RED.nodes.registerType("Buy",CoinSpotBuy);
}
