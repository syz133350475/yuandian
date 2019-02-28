<include file="Public:header"/>
	<div id="nav" class="mainnav_title">
		<ul>
			<a href="{pigcms{:U('Service/cat_field_add',array('cid'=>$_GET['cid']))}" class="on">自定义字段</a>
		</ul>
	</div>
	<form id="myform" method="post" action="{pigcms{:U('Service/cat_field_modify')}" frame="true" refresh="true">
		<input type="hidden" name="cid" value="{pigcms{$_GET.cid}"/>
		<input type="hidden" name="numfilter" value="{pigcms{$isfilter}"/>

			<table cellpadding="0" cellspacing="0" class="frame_form" width="100%">
				<tr>
					<th width="80">表单名称</th>
					<td><input type="text" class="input fl" name="name" id="name" size="25" placeholder="" validate="maxlength:20,required:true" tips=""/></td>
				</tr>

				<tr>
					<th width="80">表单标题</th>
					<td><input type="text" class="input fl" name="alias_name" id="alias_name" size="25" placeholder="" validate="maxlength:20,required:true" tips=""/></td>
				</tr>
				
				<tr>
					<th width="80">短标记</th>
					<td><input type="text" class="input fl" name="key_value" id="key_value" size="25" placeholder="英文或数字" validate="maxlength:20,required:true,en_num:true" tips="只能使用英文或数字，用于网址（url）中的标记！建议使用字段的拼音"/></td>
				</tr>
				
				<!-- <tr>
					<th width="80">是否必填</th>
					<td>
						<span class="cb-enable"><label class="cb-enable"><span>是</span><input type="radio" name="iswrite" value="1"/></label></span>
						<span class="cb-disable"><label class="cb-disable selected"><span>否</span><input type="radio" name="iswrite" value="0" checked="checked"/></label></span>
						<span style="margin-left: 30px;color: red">客户发布信息时决定此字段客户是否必须填写</span>
					</td>
				</tr> -->
				<tr>
					<th width="80">字段类型</th>
					<td>
						<select name="type" onchange="ShowTextarea(this.value);">
						    <if condition="!empty($inputTypeArr)">
								<volist name="inputTypeArr" id="vo">
								<option value="{pigcms{$vo['typ']}">{pigcms{$vo['tname']}</option>
								</volist>
							</if>
						</select>
					</td>
				</tr>
			  	<tr id="valueoftype" style="display:none;">
					<th width="80">供选择值</th>
					<td><textarea class="input fl" style="width:250px;height:80px;" name="valueoftype" placeholder ="填写供前台用户选择的内容，多个内容请换行。"></textarea></td>
			    </tr>
				

				<tr id="is_desc" style="display:none;">
					<th width="80">是否加描述</th>
					<td>
						<span class="cb-enable"><label class="cb-enable"><span>是</span><input type="radio" name="is_desc" value="1"/></label></span>
						<span class="cb-disable"><label class="cb-disable selected"><span>否</span><input type="radio" name="is_desc" value="0" checked="checked"/></label></span>
					</td>
				</tr>


				<tr id="valuedesc" style="display:none;">
					<th width="80">对应描述</th>
					<td><textarea class="input fl" style="width:250px;height:80px;" name="valuedesc" placeholder ="必须写上这个字段类型供发布者选择的值一行算一个值"></textarea></td>
				</tr>


			   	<tr id="valueinput" style="display: none;">
					<th width="90">是否添加输入框</th>
					<td>
						<span class="cb-enable"><label class="cb-enable"><span>是</span><input type="radio" name="isinput" value="1"/></label></span>
						<span class="cb-disable"><label class="cb-disable selected"><span>否</span><input type="radio" name="isinput" value="0" checked="checked"/></label></span>
					</td>
				</tr>

				<tr id="valuetime" style="display: none;">
					<th width="90">是否添加时间框</th>
					<td>
						<span class="cb-enable"><label class="cb-enable"><span>是</span><input type="radio" name="istime" value="1"/></label></span>
						<span class="cb-disable"><label class="cb-disable selected"><span>否</span><input type="radio" name="istime" value="0" checked="checked"/></label></span>
					</td>
				</tr>

			</table>
		<div class="btn hidden">
			<input type="submit" id="dosubmit" value="提交" class="button" />
			<input type="reset" value="取消" class="button" />
		</div>
	</form>
	<script type="text/javascript">
      	$('#is_desc input[name="is_desc"]').click(function(){
			var vv=parseInt($(this).val());
			if(vv==1){
				$('#valuedesc').show();
				$('#valuetime').hide();
				$('#valueinput').hide();

			}else{
				$('#valuedesc').hide();
				$('#valuetime').show();
				$('#valueinput').show();
			}
	    });

		function ShowTextarea(vv){
		  	vv=parseInt(vv);
			if(vv==2 || vv==3){
				$('#valueoftype').show();
				if(vv == 2){
					$('#valuetime').show();
					$('#is_desc').show();
					$('#valueinput').show();
				}else{
					$('#valuetime').hide();
					$('#is_desc').hide();
					$('#valueinput').hide();
				}
				
			}else{
				$('#valueoftype').hide();
				$('#valueinput').hide();
				$('#is_desc').hide();
				$('#valuetime').hide();
			}
		}
	</script>
<include file="Public:footer"/>