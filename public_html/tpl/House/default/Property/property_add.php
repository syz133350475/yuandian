<include file="Public:header"/>
<div class="main-content">
	<!-- 内容头部 -->
	<div class="breadcrumbs" id="breadcrumbs">
		<ul class="breadcrumb">
			<li>
				<i class="ace-icon fa fa-tablet"></i>
				<a href="{pigcms{:U('Property/index')}">缴费类型管理</a>
			</li>
			<li class="active">添加缴费类型</li>
		</ul>
	</div>
	<!-- 内容头部 -->
	<div class="page-content">
		<div class="page-content-area">
			<style type="text/javascript" language="javascript">
				.ace-file-input a {display:none;}
			</style>
			<div class="row">
				<div class="col-xs-12">
					<form  class="form-horizontal" method="post" onSubmit="return check_submit()" action="__SELF__">
						<div class="tab-content">
							<div id="basicinfo" class="tab-pane active">
								<div class="form-group">
									<label class="col-sm-1"><label for="property_name">缴费单元名称</label></label>
									<input class="col-sm-2" size="20" name="property_name" id="property_name" type="text" value=""/>
								</div>
                                
                                <div class="form-group">
									<label class="col-sm-1"><label for="floor_layer">单元楼号</label></label>
									<input class="col-sm-2" size="20" name="floor_layer" id="floor_layer" type="text" value=""/>
								</div>
                                
							</div>
                            
                            <div class="form-group">
									<label class="col-sm-1">状态</label>
									
										<label style="padding-left:0px;padding-right:20px;"><input type="radio" checked="" class="ace" value="1" name="status"><span style="z-index: 1" class="lbl">开启</span></label>
										<label style="padding-left:0px;"><input type="radio" class="ace" value="0" name="status"><span style="z-index: 1" class="lbl">关闭</span></label>
								</div>
						</div>
						<div class="space"></div>
							<div class="clearfix form-actions">
								<div class="col-md-offset-3 col-md-9">
									<button class="btn btn-info" type="submit">
										<i class="ace-icon fa fa-check bigger-110"></i>
										保存
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
<script type="text/javascript">
function check_submit(){
	if($('#floor_name').val() == ''){
		alert('单元名称不能为空！');
		return false;
	}

	if($('#floor_layer').val() == ''){
		alert('单元楼号不能为空！');
		return false;
	}
}
</script>

<include file="Public:footer"/>