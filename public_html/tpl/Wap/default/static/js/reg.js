var reg_flag = true,countdown = 60;
$(function(){
	$('#reg-form').submit(function(){
	
		if(must_agree && !$('#register_agreement').attr('checked')){
			$('#tips').html('必须同意注册协议').show();
			return false;
		}

		if(typeof($('#sms_flesh_verify').val())!='undefined' && $('#sms_flesh_verify').val()==''){
			$('#tips').html('请先验证4位验证码').show();
			return false;
		}
		var verify = '',type='';
		if(typeof($('#sms_flesh_verify').val())!='undefined' && $('#sms_flesh_verify').val()!=''){
			verify = $('#sms_flesh_verify').val();
			type = $('#sms_flesh_type').val();
		}

		var phone = $.trim($('#phone').val());
		$('#phone').val(phone);
		if(phone.length == 0){
			$('#tips').html('请输入手机号码。').show();
			return false;
		}
		if(!international_phone && !/^[0-9]{11}$/.test(phone)){
			$('#tips').html('请输入11位数字的手机号码。').show();
			return false;
		}
		var password_type = $('#password_type').val();
		if($('#sms_code')&&$('#sms_code').val()==''){
			$('#tips').html('输入的短信验证码有误。').show();
			return false;
		}
		var sms_code = $('#sms_code').val();
		if(password_type === '0'){
			var password = $('#pwd_password').val();
		}else{
			var password = $('#txt_password').val();
		}
		if(password.length < 6){
			$('#tips').html('请输入6位以上的密码。').show();
			return false;
		}
		if(typeof(sms_code)!='undefined'){
			if(sms_code.length > 6||isNaN(sms_code)){
				$('#tips').html('输入的短信验证码有误。').show();
				return false;
			}
		}
		if(reg_flag){
			reg_flag = false;
		}else{
			$('#tips').html('注册中，请不要重复提交').show();
			return false;
		}
		
		var spread_code = $('#spread_code').val()
		if(typeof(spread_code)=='undefined'){
			spread_code='';
		}
		if( typeof($('#phone_country_type').val())!='undefined'&& $('#phone_country_type').val()!=''){
			phone = $('#phone_country_type').val()+'|'+phone;
		}
		$.post($('#reg-form').attr('action'),{phone:phone,password:password,sms_code:sms_code,verify:verify,type:type,spread_code:spread_code},function(result){
			if(result.status == '1'){
				window.location.href = $('#reg-form').attr('location_url');
			}else{
				reg_flag = true;
				$('#tips').html(result.info).show();
			}
		});
		
		return false;
	});
	
	
	$('#changeWord').click(function(){
		if($(this).html() == '显示明文'){
			$('#txt_password').val($('#pwd_password').val()).show();
			$('#pwd_password').hide();
			$(this).html('显示密文');
			$('#password_type').val(1);
		}else{
			$('#pwd_password').val($('#txt_password').val()).show();
			$('#txt_password').hide();
			$(this).html('显示明文');
			$('#password_type').val(0);
		}
	});
	$('#verify_flesh').click(function(event) {
		send_fleshcode($('#sms_flesh_code').val(),$('#sms_flesh_type').val())
	});

	$('#reg_verifyImg').click(function(event) {
		reg_fleshVerify();
	});
});

			
function sendsms(val){
	if($("input[name='phone']").val()==''){
		alert('手机号码不能为空！');
	}else{

		if(countdown==60){
			$.ajax({
				url: './index.php?g=Index&c=Login&a=Generate',
				type: 'POST',
				dataType: 'json',
				data: {phone: $("input[name='phone']").val(),verify:$('#sms_flesh_verify').val(),type:$('#sms_flesh_type').val(),reg:1},
				success:function(date){
					if(date.error_code){
						$('#tips').html(date.msg).show();
					}
				}

			});
		}
		if (countdown == 0) {
			val.removeAttribute("disabled");
			val.innerText="获取短信验证码";
			countdown = 60;
			//clearTimeout(t);
		} else {
			val.setAttribute("disabled", true);
			val.innerText="重新发送(" + countdown + ")";
			countdown--;
			setTimeout(function() {
				sendsms(val);
			},1000)
		}
	}
}



function reg_fleshVerify(){
	var time = new Date().getTime();
	$('#reg_verifyImg').attr('src','./index.php?c=Verify&a=fleshcode&type=sms'+"&time="+time);
}

function send_fleshcode(code,type){
	$.ajax({
		url: './index.php?c=Verify&a=verify_fleshcode',
		type: 'POST',
		dataType: 'json',
		data: {verify: code,type:type},
		success:function(date){
			if(date.error_code==1){
				$('#tips').html(date.msg).show();
				
			}else{
				$('#tips').html(date.msg).show();
				$('#flesh_code').hide();
				$('#sms_flesh_verify').val(code);
				$('#sms').show();
				$('#password').show();
				$('.register_agreement').show();
				$('#register').show();
				$('#verify_flesh').hide();
				$('.sms_code').attr('required', 'true');
			
			}
			setTimeout(function(){ $('#tips').hide(); }, 3000);
		}
	});
	
}