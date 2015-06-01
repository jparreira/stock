var appkey = '2Ze1dz';
var token = 'user';
var client;

// PRODUCT DETAILS

var productID = 1234;


// CONNECT TO REALTIME ON AZURE

loadOrtcFactory(IbtRealTimeSJType, function (factory, error) {
	if (error != null) {
	  alert("Factory error: " + error.message);
	} else {
	 		   		    
	    client = factory.createClient();
	    client.setClusterUrl('https://ortc-developers.realtime.co/server/ssl/2.1');
	            
	    client.onConnected = function (c) {
	      $('#status').html('connected');

	      // SUBSCRIBE THE REALTIME CHANNELS TO RECEIVE UPDATES
	      c.subscribe('price-update:' + productID, true, priceUpdate);
	      c.subscribe('stock-update:' + productID, true, stockUpdate);
	    };

	    client.connect(appkey, token);		   
	}
});    


// UPDATES THE PRODUCT PRICE

var priceUpdate = function(c, channel, msg) {
	updateAndBlink('#price', msg);		
}


// UPDATES THE PRODUCT STOCK

var stockUpdate = function(c, channel, msg) {
	stockUpdate = JSON.parse(msg);
	updateAndBlink('#stock', stockUpdate.stock);		
}


// UPDATE AND BLINK UI

var updateAndBlink = function(selector, value){    	    	
	$(selector).css('color', 'red');
	$(selector).fadeOut('slow', function(){			
		$(selector).html(value);
		$(selector).css('color', 'black');			
	    $(this).fadeIn('slow');
	});
	
}