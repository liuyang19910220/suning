$(function(){
	$("#submit").click(function(){
		var name=$(".usernamebox input").val();
		var psd=$(".passwordbox input").val();
		$.ajax({
		   type: "POST",
		   url: "common.php",
		   //向接口传参
		   data: "username="+name+"&password="+psd+"&act=login",
		   success: function(data){
		   	var data=JSON.parse(data);
		   	if(data.error==0){
		   		location.href="index.html";
		   	}else if(data.error==1){
		   		$(".tips").html("用户名或密码错误").show();
		   	}
		     
		   }
		});
	})
})

