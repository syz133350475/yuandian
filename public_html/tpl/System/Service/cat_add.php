<include file="Public:header"/>
<form id="myform" method="post" action="{pigcms{:U('Service/cat_modify')}" frame="true" refresh="true">
	<input type="hidden" name="fcid" value="{pigcms{$fcid}"/>
	<input type="hidden" name="pfcid" value="{pigcms{$pfcid}"/>
	<table cellpadding="0" cellspacing="0" class="frame_form" width="100%">
		<tr>
			<th width="80">分类名称</th>
			<td>
				<input type="text" class="input fl" name="cat_name" id="cat_name" size="25" placeholder="" validate="maxlength:20,required:true" tips=""/>
			</td>
		</tr>
		<!-- <if condition='$_GET["fcid"]'>
			<tr>
				<th width="80">字体颜色</th>
				<td>
					<input type="text" tips="请点击右侧按钮选择颜色，用途为页面显示。" placeholder="可不填写" style="width:120px;" id="choose_color" value="" name="font_color" class="input fl">
					&nbsp;&nbsp;
					<a style="line-height:28px;" id="choose_color_box" href="javascript:void(0);">点击选择颜色</a>
				</td>
			</tr>
		</if> -->
		<tr>
			<th width="80">分类排序</th>
			<td>
				<input type="text" class="input fl" name="cat_sort" value="0" size="10" placeholder="分类排序" validate="maxlength:6,required:true,number:true" tips="默认添加时间排序！手动排序数值越大，排序越前。"/>
			</td>
		</tr>

		<tr>
			<th width="80">分类状态</th>
			<td>
				<span class="cb-enable">
					<label class="cb-enable selected">
						<span>启用</span>
						<input type="radio" name="cat_status" value="1" checked="checked" />
					</label>
				</span>
				<span class="cb-disable">
					<label class="cb-disable">
						<span>关闭</span>
						<input type="radio" name="cat_status" value="0" />
					</label>
				</span>
			</td>
		</tr>

		<if condition='$_GET["fcid"]'>
			<tr>
				<th width="80">抽成比例：</th>
				<td><input type="text" tips="抽成比例，百分比返现，最多两位小数！" style="width:100px;" value="" name="cut_proportion" class="input fl"></td>
			</tr>
			
			<!-- <tr>
				<th width="80">积分返现：</th>
				<td><input type="text" tips="积分返现比例，百分比返现，最多两位小数！" style="width:100px;" value="" name="return_Integral_proportion" class="input fl"></td>
			</tr>	 -->
			

			<if condition='$_GET["fcid"]'>
				<tr>
					<th width="80">服务有效期：</th>
					<td><input type="text" tips="接单时间，普通分类按（天）计算，特殊分类接单时间按（小时）计算！" size="10" value="{pigcms{$now_category.accept_time}" name="accept_time" class="input fl" validate="maxlength:6,required:true,number:true"></td>
				</tr>
			</if>
			
		</if>
		
		<if condition='$_GET["fcid"]'>
			<tr>
				<th width="80">分类类型</th>
				<td class="radio_box">
					<label style="float:left;width:60px" class="checkbox_status"><input type="radio" class="input_radio" name="type" value="1" checked="checked"> 普通 </label>
					<label style="float:left;width:60px" class="checkbox_status"><input type="radio" class="input_radio" name="type" value="2"> 帮我买 </label>		
					<label style="float:left;width:60px" class="checkbox_status"><input type="radio" class="input_radio" name="type" value="3"> 帮我送 </label>	
				</td>
			</tr>
		</if>
	</table>
	<div class="btn hidden">
		<input type="submit" name="dosubmit" id="dosubmit" value="提交" class="button" />
		<input type="reset" value="取消" class="button" />
	</div>
</form>
<include file="Public:footer"/>
