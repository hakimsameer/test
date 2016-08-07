(function($) {
    $.fn.jqfileupload = function(options) {
    	
    	var settings = {
    			
			  onStart: function() { console.log('starting upload'); console.log(this); },
	          onComplete: function(response) { console.log('got response:'); 
	        	  //console.log(response + ']'); 
	          console.log(response ); 
	        	  console.log(this); 
	          },	          
	          onCancel: function() { console.log('cancelling: '); console.log(this); },
	          onSizeLimitExceeds: function(response){ console.log('File size limit exceeds'); console.log(response); console.log(this); }
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
        	  // alert(" Chnage event "+ this.files[0].size);
        	   console.log( options.size_limit + " size check " + (Number(this.files[0].size) > Number(options.size_limit)));
        	   var ext = $element.val().split('.').pop().toLowerCase();        	   
        	   if($element.val() == ''){
        		   settings.onCancel.apply($element);
        	   }
        	   else	if(Number(this.files[0].size) > Number(options.size_limit)){	           		
	           		settings.onSizeLimitExceeds.apply($element,[{status: false, message: 'The file size exceeds limit.'}]);
	           }
        	   else if( $.inArray(ext, options.valid_extns) == -1)                
               {
                  // Return to the user
                  settings.onComplete.apply($element, [{status: false, message: 'The select file type is invalid. File must be ' + options.valid_extns.join(', ') + '.'}, settings.params]);
                  
               }
        	   else upload_file();
           });
            
            var upload_file = function()
            { 
            	  
            	console.log('onStart');
            	wrapElement($element);
            	settings.onStart.apply($element);              
            	$element.parent('form').submit(function(e) { e.stopPropagation(); }).submit();
            	
            	 // Return to the user
            	//settings.onComplete.apply($element,[{status: false, message: 'The select file type is invalid. File must be '}]); 
            	//console.log('onComplete');          	
            }
            
            var handleResponse = function(loadedFrame, element) {
                var response, responseStr = loadedFrame.contentWindow.document.body.innerHTML;
                console.log('responseStr' + responseStr);
                responseStr = responseStr.replace("<pre>","").replace("</pre>","")  ;
                console.log('responseStr' + responseStr);
                try {
                  response = $.parseJSON($.trim(responseStr));
                  //response = JSON.parse(responseStr);
                } catch(e) {
                  response = responseStr;
                }
               // console.log(response.status + ' response returned ' + response.message);
                // Tear-down the wrapper form
                element.siblings().remove();
                element.unwrap();

                uploading_file = false;

                // Pass back to the user
                
               // settings.onComplete.apply(element, [{status: true, message: 'Your file has been uploaded!'} , settings.params]);
                settings.onComplete.apply(element,response);
              };
            
            var wrapElement = function(element) {
            	console.log('wrappping' );
                // Create an iframe to submit through, using a semi-unique ID
                var frame_id = 'ajaxUploader-iframe-' + Math.round(new Date().getTime() / 1000)
                $('body').after('<iframe width="0" height="0" style="display:none;" name="'+frame_id+'" id="'+frame_id+'"/>');
                $('#'+frame_id).load(function() {
                  handleResponse(this, element);
                });

                // Wrap it in a form
                element.wrap(function() {
                  return '<form action="' + settings.action + '" method="POST" enctype="multipart/form-data" target="'+frame_id+'" />'
                })
                // Insert <input type='hidden'>'s for each param
                .before(function() {
                  var key, html = '';
                  for(key in settings.params) {
                    var paramVal = settings.params[key];
                    if (typeof paramVal === 'function') {
                      paramVal = paramVal();
                    }
                    html += '<input type="hidden" name="' + key + '" value="' + paramVal + '" />';
                  }
                  return html;
                });
              }
        	
        });        
    }    
})( jQuery )
