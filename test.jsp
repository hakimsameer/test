<html>
<head>

<script src="jquery-1.8.2.js"></script>
<script src="jquery.jqfileupload.js"></script>
<script lang="Javascript">
$(document).ready(function() {
		$('input[type="file"]').jqfileupload({
			'valid_extns' : ['jpeg','jpg','png'],
			'size_limit' : 1000000,
			'action' : 'UploadFile',
			'onStart' : function() {
				$('#upload').show();
				$('#message').hide();
			},
			'onCancel' : function() {
				$('#upload').hide();
				$('#message').show();
				
				$("#message").html("<font color='blue'> Please Select File... </font>");
			},
			'onComplete' : function(response) {
				$('#upload').hide();
				$('#message').show();
				
				//var statusVal = JSON.stringify(response.status);
				//var jsonResponse = JSON.parse(response);
				var statusVal = JSON.stringify(response.status);
				console.log('statusVal' + statusVal);
				if(statusVal == "false")
				{
					$("#message").html("<font color='red'>"+ JSON.stringify(response.message) +" </font>");
				}	
				//if(statusVal === new String("true"))
				if(statusVal =="true")
				{
					console.log('m inn');
					$("#message").html("<font color='green'>"+JSON.stringify(response.message) +" </font>");
				}			
			},
			'onSizeLimitExceeds' : function(response)
			{
				$('#upload').hide();
				$('#message').show();
				var statusVal = JSON.stringify(response.status);
				$("#message").html("<font color='red'>"+ JSON.stringify(response.message) +" </font>");
			}
		});
	});
</script>
</head>

<body>
<input type="file" name="file" /><br />
		<div id="upload" style="display: none;">Uploading..</div>
		<div id="message"></div>
</body>			
</html>