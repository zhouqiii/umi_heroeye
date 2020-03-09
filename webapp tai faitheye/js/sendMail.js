function delet(){
	$(".main_bottom").html('');
}
layui.use(['element', 'table', 'form'], function() {
	var element = layui.element;
	var table = layui.table;
	var form = layui.form;
	element.init();
})
//获取大区
onarea()
function onarea(){
	$.ajax({
		type:"get",
		url:"../getArea.action",
		async:true,
		success:function(json){
			for(var i = 0;i<json.rows.length;i++){
				$(".left_content").append("<input type='checkbox' value="+json.rows[i].areaId+" onclick='checboxs(this)' />"+"<span>"+json.rows[i].areaName+"</span>")
			}
			$(".left_content input").eq(0).prop("checked",true)
			checboxs()
		}
	});
}

//获取服务器
function checboxs(obj){
	var areaid
	if(obj == undefined){
		areaid = $(".left_content input").eq(0).val();
		$(".right_content").empty()
		$.ajax({
			type:"get",
			url:"../getServerListNoPage.action",
			async:true,
			data:{
				pId:areaid
			},
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>")
				}
			}
		});
	}
	if($(obj).is(":checked") == true){
		$(obj).siblings().removeAttr("checked")
		$(".right_content").empty()
		areaid = $(obj).val();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage.action",
			async:true,
			data:{
				pId:areaid
			},
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>")
				}
			}
		});
	}else{
		$(obj).prop("checked",true)
	}
}
//选择下拉触发
function selects(ob){
	var value = $(ob).val();
	if(value == 0){
		$(".right_content").empty()
		$.ajax({
			type:"get",
			url:"../getServerListNoPage.action",
			async:true,
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>")
				}
			}
		});
		$(".left_content input").prop("disabled",true);
		$(".right_content input").prop("disabled",true);
		$(".left_content input").prop("checked",true);
		$(".right_content input").prop("checked",true);
	}else{
		$(".right_content").empty()
		var areaid = $(".left_content input").eq(0).val();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage.action",
			async:true,
			data:{
				pId:areaid
			},
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>")
				}
			}
		});
		$(".left_content input").prop("disabled",false);
		$(".right_content input").prop("disabled",false);
		$(".left_content input").eq(0).prop("checked",true).siblings().prop("checked",false);
		console.log($(".right_content input").eq(0))
		$(".right_content input").eq(0).prop("checked",true).siblings().prop("checked",false);
	}
}
$("#openSupplement").click(function(){
	var amount = $(".amount").css("display");
	if(amount == "block"){
		$(".amount").css("display","none");
		$(".number").css("display","none");
		$(this).html("开启补单");
	}else{
		$(".amount").css("display","block");
		$(".number").css("display","block");
		$(this).html("关闭补单");
	}
})
//发送指令
function postsend(){
	var server = $(".right_content input");
	var arr = [];
	if(server.length<=0){
		alert("请选择服务器")
	}
	for(var i = 0;i<server.length;i++){
		if(server[i].checked == true){
			arr.push(server[i].value)
		}
	}
	var jsons = arr.join(',');//服务器
	var roleID = $("#roleID").val();//角色ID
	var times = $("#times").val();//过期时间
	var emailTit = $("#emailTit").val();//邮件标题
	var one_currencyID = $("#one_currencyID").val();//一号货币ID
	var one_currencyNum = $("#one_currencyNum").val();//一号货币数量
	var two_currencyID = $("#two_currencyID").val();//二号货币ID
	var two_currencyNum = $("#two_currencyNum").val();//二号货币数量
	var emailContent = $("#emailContent").val();//邮件内容
	var one_goodsID = $("#one_goodsID").val();//一号物品ID
	var one_goodsNum = $("#one_goodsNum").val();//一号物品数量
	var bind = $("#bind").val();//一号是否绑定
	var two_goodsID = $("#two_goodsID").val();//二号物品ID
	var two_goodsNum = $("#two_goodsNum").val();//二号物品数量
	var two_bind = $("#two_bind").val();//二号是否绑定
	var thr_goodsID = $("#thr_goodsID").val();//三号物品ID
	var thr_goodsNum = $("#thr_goodsNum").val();//三号物品数量
	var thr_bind = $("#thr_bind").val();//三号是否绑定
	var for_goodsID = $("#for_goodsID").val();//四号物品ID
	var for_goodsNum = $("#for_goodsNum").val();//四号物品数量
	var for_bind = $("#for_bind").val();//四号是否绑定
	var fiv_goodsID = $("#fiv_goodsID").val();//五号物品ID
	var fiv_goodsNum = $("#fiv_goodsNum").val();//五号物品数量
	var fiv_bind = $("#fiv_bind").val();//五号是否绑定
	//判断是否开启补单
	var supplement_number;
	var supplement_amount;
	var amount = $(".amount").css("display");
	var input  = /^[\s]*$/
	if(amount == "block"){
		supplement_number = $("#supplement_number").val();//补单单号
		supplement_amount = $("#supplement_amount").val();//补单充值金额
		if(supplement_number != ""&&supplement_amount == ""){
			alert("补单充值金额不能为空");
			return false;
		}else if(supplement_amount != ""&&supplement_number == ""){
			alert("补单编号不能为空");
			return false;
		}
	}else{
		supplement_number = '';
		supplement_amount = '';
	}
	if(roleID == ""||roleID == null||input.test(roleID) ){
		alert("角色ID不能为空");
		return false;
	}else if(times == ""|| times == null){
		alert("过期时间不能为空");
		return false;
	}else if(emailTit == ""|| emailTit == null){
		alert("邮件标题不能为空");
		return false;
	}else if(one_currencyID !=""&&one_currencyNum == ""){
		alert("货币数量不能为空");
		return false;
	}else if(one_currencyID == ""&&one_currencyNum !=""){
		alert("货币ID不能为空");
		return false;
	}else if(two_currencyID !=""&&two_currencyNum == ""){
		alert("货币数量不能为空");
		return false;
	}else if(two_currencyID == ""&&two_currencyNum !=""){
		alert("货币ID不能为空");
		return false;
	}else if(emailContent == ""||emailContent == null){
		alert("邮件内容不能为空");
		return false;
	}else{
		$("body").mLoading("show")
		$.ajax({
			type:"get",
			url:"../postSendEmail.action",
			async:true,
			data:{
				serverId:jsons,
				roleId:roleID,
				emailExpires:times,
				emailTitle:emailTit,
				emailContent:emailContent,
				goodsNumber1:one_goodsNum,
				goodsCode1:one_goodsID,
				goodsBinding1:bind,
				goodsNumber2:two_goodsNum,
				goodsCode2:two_goodsID,
				goodsBinding2:two_bind,
				goodsNumber3:thr_goodsNum,
				goodsCode3:thr_goodsID,
				goodsBinding3:thr_bind,
				goodsNumber4:for_goodsNum,
				goodsCode4:for_goodsID,
				goodsBinding4:for_bind,
				goodsNumber5:fiv_goodsNum,
				goodsCode5:fiv_goodsID,
				goodsBinding5:fiv_bind,
				moneyId_1:one_currencyID,
				moneyNum_1:one_currencyNum,
				moneyId_2:two_currencyID,
				moneyNum_2:two_currencyNum,
				supplyId:supplement_number,//补单单号
				supplyMoney:supplement_amount//补单金额
			},
			success:function(json){
				$("body").mLoading("hide")
				$(".main_bottom").text(json.message)
			}
		});
	}
}

