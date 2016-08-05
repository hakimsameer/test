(function($) {
    $.fn.jqfileupload = function(options) {
    	
    	var settings = {
    			
			  onStart: function() { console.log('starting upload'); console.log(this); },
	          onComplete: function(response) { console.log('got response: '); console.log(response); console.log(this); },
	          onCancel: function() { console.log('cancelling: '); console.log(this); }   			
    	}
    	console.log('settings done');
    	
    	
    	 if ( options ) { 
             $.extend( settings, options );
             console.log('m in extend');
           }
    	 
          
        return this.each(function() {
        	var $element = $(this);
        	console.log('element load');
        	
        	if($element.val() == '')  settings.onCancel.apply($element);
        	
           $element.change(function()
           {
        	   upload_file();
           });
            
            var upload_file = function()
            {
            	if($element.val() == '')  settings.onCancel.apply($element);
            	
            	var ext = $element.val().split('.').pop().toLowerCase();
            	if( $.inArray(ext, options.valid_extns) == -1)
                //if(true === settings.validate_extensions && $.inArray(ext, settings.valid_extensions) == -1)
                {
                  // Return to the user
                  settings.onComplete.apply($element, [{status: false, message: 'The select file type is invalid. File must be ' + options.valid_extns.join(', ') + '.'}, settings.params]);
                  
                } else
                { 
                	settings.onStart.apply($element);                
                	console.log('onStart');
                	
                	 // Return to the user
                	settings.onComplete.apply($element,[{status: false, message: 'The select file type is invalid. File must be '}]); 
                	console.log('onComplete');
                }            	
            }
        	
        });        
    }    
})( jQuery )
