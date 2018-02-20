var coinspot = require('coinspot-api');
module.exports = function(RED) {
    function CoinspotQuoteBuy(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.creds = RED.nodes.getNode(config.creds);

          
        
        node.on('input', function(msg) {
            if(node.creds) {
                var client = new coinspot( node.creds.key, node.creds.password);
            } else {
                node.status({fill:"red",shape:"ring",text:"apiKey or apiSecret not entered. Please check."});
                return;
            }

            if(msg.cointype||config.cointype){
                var coin=msg.cointype||config.cointype;
            }else {
                node.status({fill:"red",shape:"ring",text:"cointype not defined"});
                return; 
            }

            if(msg.amount||config.amount){
                var amount=msg.amount||config.amount;
            }else{
                node.status({fill:"red",shape:"ring",text:"amount not defined"});
                return; 
            }

            
            
            client.quotebuy(coin,amount,function(e, data){
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
    RED.nodes.registerType("Quote Buy",CoinspotQuoteBuy);
}
