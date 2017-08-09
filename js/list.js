$(function() {
	
	//ajax动态加载
	$.ajax({
		type: "get",
		url: "json/list.json",
		async: true,
		dataType: "json",
		success: function(data) {
			var html = "";
			//通过a标签中的href的search？来控制跳转
			for(var i = 0; i < data.length; i++) {
				html += "<li><a href='detail.html?id="+data[i].id+"' target='_blank' ><img src='" + data[i].src[0] + "'/><p class='title'>" + data[i].title + "</p><p class='price'>" + data[i].price + "</p></a></li>";
			}
			$("#likes ul").append(html);
			//cookie存储点击历史记录
			$("#likes ul li").click(function(){
				//记录下点击的id
				var attr=$(this).find("a").attr("href");
				var arr=attr.split("=");
				var a=arr[1];//10001,10002...
				console.log(a)
				//创建一个空数组用于存cookie--》数据结构：[10001,10002,10003...]
				var record =[];
				//取出cookie中的数据，进行数据处理
				var str=getCookie("record");
				if(!str){
					record.push(a);
					console.log(record,typeof record)
				}else{
					//如果cookie中有数据，将数据变成数组
					record=str.split(",");
					//再往现有的数据中添加当前点击的id--->a
					record.push(a);
					console.log(record)
				}
				//添加好后，存入cookie
				setCookie("record",record,100);
				
			})
		}
	});



})
