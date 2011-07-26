<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="/js/jquery-1.6.2.min.js"></script> 
<script type="text/javascript">

	function refreshCount() {
		var json = $.ajax({
			  url: "view",
			  async: false
			 }).responseText;
		
		var object = eval('(' + json + ')');
		
		$("#queueSize").text(object.queueSize);
		
	}
	
	$(document).ready(function(){
		refreshCount();
		setInterval(refreshCount, "500");
	})
</script>
</head>
<body>

<p id="queueSize"></p>

</body>
</html>