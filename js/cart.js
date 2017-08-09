$(function() {
	//1ajax获取数据
	$.ajax({
		type: "get",
		url: "json/cart.json",
		async: true,
		success: function(data) {
			//console.log(data);
			//2成功后取出cookie中存储的商品
			var str = getCookie("cart");
			if(str) {
				//				console.log(str);
				var obj = JSON.parse(str);
				//console.log(obj); //{10001: 27, 10003: 19, 10005: 6}
				//3动态创建商品列表
				var html = "";
				//cookie里的i对应商品id,同时对应cart.json中的属性值
				for(var i in obj) {
					var perPrice = (data[i].price).replace("￥", "");
					html += "<li><label class='selectItem'></label><img src='" +
						data[i].src[0] +
						"'/><p class='title'>" + i + data[i].title +
						"</p><span class='price'>" + data[i].price +
						"</span><h4><a data-id='" + i + "' class='reduce'>-</a><input type='text' value='" + obj[i] +
						//为a绑定 data-id属性，以便判断，点击的是哪个商品ID
						"' /><a data-id='" + i + "' class='plus'>+</a></h4><span class='total'>￥" + (perPrice) * (obj[i]) + "</span><a data-id='" + i + "' class='delete'>删除</a></li>";
				}
				$(".cart-content ul").append(html);

				//4增删改查
				//4-0)为保证初始化时显示数量和总价，先调用一下
				var str = getCookie("cart");
				if(str) {
					var obj = JSON.parse(str);
					//					console.log(obj)
					var numAll = 0;
					//计算总价格
					var totalAll = 0;
					for(var i in obj) {
						numAll += obj[i]; //{10001: 7, 10003: 9, 10005: 6}
						totalAll += obj[i] * ((data[i].price).replace("￥", ""));
					}
					$(".cart-footer .numAll").html(numAll);
					$(".cart-footer .totalAll").html("￥" + totalAll);
				}

				//4-1)增
				$(".plus").click(function() {
					//点击时获取input件数，注意是当前对象
					var num = $(this).siblings("input").val();
					//获取.price单价
					var perPrice = ($(this).parent().siblings(".price").html()).replace("￥", "");
					num++;
					//改数量,实时显示
					$(this).siblings("input").val(num);
					//改总价格,实时显示
					$(this).parent().siblings(".total").html("￥" + num * perPrice);

					//存cookie,页面刷新后记录数据-----------》考虑封装函数
					//获取保存在按钮里面的属性,判断点击的是哪个商品
					var proId = $(this).attr("data-id");
					//将自减后的数量存入cookie，预备操作-->先取出cookie，做数据处理
					var str = getCookie("cart");
					if(str) {
						var obj = JSON.parse(str);
						console.log(obj)
						//处理数据-->增加
						obj[proId] = Number(num);
						console.log(obj[proId]);
						//转化成str存入
						var str = JSON.stringify(obj);
						setCookie("cart", str, 365);
						//计算所有选择商品总件数numAll
						var numAll = 0;
						//计算总价格
						var totalAll = 0;
						for(var i in obj) {
							numAll += obj[i]; //{10001: 7, 10003: 9, 10005: 6}
							//单品数量obj[i]*单价(data[i].price).replace("￥", "")
							totalAll += obj[i] * ((data[i].price).replace("￥", ""));
						}
						$(".cart-footer .numAll").html(numAll);
						$(".cart-footer .totalAll").html("￥" + totalAll);
					}
				})

				//4-2）减
				$(".reduce").click(function() {
					//获取input件数
					var num = $(this).siblings("input").val();
					//获取.price单价
					var perPrice = ($(this).parent().siblings(".price").html()).replace("￥", "");
					if(num <= 1) {
						num = 1;
						alert("至少选一件呗~");
					} else {
						num--;
						$(this).siblings("input").val(num);
						$(this).parent().siblings(".total").html("￥" + num * perPrice);
					}
					//存cookie,页面刷新后记录数据-----------》考虑封装函数
					//获取保存在按钮里面的属性,判断点击的是哪个商品
					var proId = $(this).attr("data-id");
					//将自减后的数量存入cookie，预备操作-->先取出cookie，做数据处理
					var str = getCookie("cart");
					if(str) {
						var obj = JSON.parse(str);
						console.log(obj)
						//处理数据-->增加
						obj[proId] = Number(num);
						console.log(obj[proId]);
						//转化成str存入
						var str = JSON.stringify(obj);
						setCookie("cart", str, 365);
						//计算所有选择商品总件数numAll
						var numAll = 0;
						//计算总价格
						var totalAll = 0;
						for(var i in obj) {
							numAll += obj[i]; //{10001: 7, 10003: 9, 10005: 6}
							//单品数量obj[i]*单价(data[i].price).replace("￥", "")
							totalAll += obj[i] * ((data[i].price).replace("￥", ""));
						}
						$(".cart-footer .numAll").html(numAll);
						$(".cart-footer .totalAll").html("￥" + totalAll);
					}
				})

				//4-3)逐条删除li 
				$(".cart-content .delete").click(function() {
					alert("确定要删除该商品吗？");
					$(this).parent("li").remove();
					var str = getCookie("cart");
					var obj = JSON.parse(str);
					var proId = $(this).attr("data-id");
					//					console.log(proId);
					delete obj[proId]; //删除属性值==删除属性
					//					setCookie("cart");
					var str = JSON.stringify(obj);
					setCookie("cart", str, 365);
				})

				//4-4)footer一键删除所有选中商品
				$(".cart-footer .delete").click(function() {
					alert("亲，确定要删除所选商品吗？");
					$(".cart-content ul").empty();
					removeCookie("cart");
				})

				//4-5)自定义输入件数
				$(".cart-content input").change(function() {
					var num = $(this).val();
					var str = getCookie("cart"); //{10001: 7, 10003: 9, 10005: 6}
					console.log(str, typeof str);
					var perPrice = ($(this).parent().siblings(".price").html()).replace("￥", "");

					if(str) {
						var obj = JSON.parse(str);
						//console.log(obj,typeof obj);
						var proId = $(this).prev(".reduce").attr("data-id");
						//console.log(attr)
						obj[proId] = Number(num);
						var str = JSON.stringify(obj);
						setCookie("cart", str, 30);
						$(this).parent().siblings(".total").html("￥" + num * perPrice);
						//改变总件数，总价格
						for(var i in obj) {
							numAll += obj[i]; //{10001: 7, 10003: 9, 10005: 6}
							//单品数量obj[i]*单价(data[i].price).replace("￥", "")
							totalAll += obj[i] * ((data[i].price).replace("￥", ""));
						}
						$(".cart-footer .numAll").html(numAll);
						$(".cart-footer .totalAll").html("￥" + totalAll);

					}

				})

				//4-6)单条勾选，全选

			}
		}
	});

})