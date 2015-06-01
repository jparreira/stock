var appkey = '2Ze1dz';
var token = 'admin';
var client;

// PRODUCT DETAILS

var productID = 1234;
var currentStock = 20;    

// CONNECT TO REALTIME ON AZURE

loadOrtcFactory(IbtRealTimeSJType, function (factory, error) {

     if (error != null) {
        console.log("Factory error: " + error.message);
     } else {                                
        client = factory.createClient();                
        client.setClusterUrl('https://ortc-developers.realtime.co/server/ssl/2.1');

        client.onConnected = function() {
            document.getElementById('status').innerHTML = "connected";
        }

        client.connect(appkey, token);           
     }
});


// SEND PRODUCT PRICE UPDATE

function updatePrice(){
    var oldPrice = document.getElementById('oldPrice').value;
    var newPrice = document.getElementById('newPrice').value;
    var msg = '<b>before <em> $' + oldPrice + '</em></b><span>now $' + newPrice + '</span>';
    
    client.send('price-update:' + productID, msg);        
}



// SEND PRODUCT STOCK UPDATE

function decreaseStock(){                

    if(currentStock > 0) {
        currentStock--;    
    }            

    var msg = { stock: currentStock };

    client.send('stock-update:' + productID, JSON.stringify(msg));        
}