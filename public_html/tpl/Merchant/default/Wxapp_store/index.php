<include file="Public:header"/>
<div class="main-content">
	<!-- 内容头部 -->
	<div class="breadcrumbs" id="breadcrumbs">
		<ul class="breadcrumb">
			<i class="ace-icon fa fa-cloud"></i>
			<li class="active">微硬件</li>
			<li class="active"><a href="{pigcms{:U('Dizwifi/index')}">微信链接WIFI</a></li>
			<li class="active">店铺列表</li>
		</ul>
	</div>
	<div class="page-content">
		<div class="page-content-area">
			<div class="row">
				<div class="col-xs-12">
					<div id="shopList" class="grid-view">
						<table class="table table-striped table-bordered table-hover">
							<thead>
								<tr>
									<th>编号</th>
									<th>店铺名称</th>
									<th>联系电话</th>
									<th>店铺地址</th>
									<th>店铺状态</th>
									<th class="button-column" style="width:200px;">微信门店小程序</th>
								</tr>
							</thead>
							<tbody>
								<if condition="$store_list">
									<volist name="store_list" id="vo">
										<tr class="<if condition="$i%2 eq 0">odd<else/>even</if>">
											<td>{pigcms{$vo.store_id}</td>
											<td>{pigcms{$vo.name}</td>
											<td>{pigcms{$vo.phone}</td>
											<td>{pigcms{$vo.area_name} - {pigcms{$vo.adress}</td>
											<td>
												<switch name="vo['status']">
													<case value="0">关闭</case>
													<case value="1">正常</case>
													<case value="2">审核中</case>
												</switch>
											</td>
											<td class="button-column" nowrap="nowrap">
												
													<!--a class="green syn" href="{pigcms{:U('Wxapp_store/add_store_in_map', array('store_id' => $vo['store_id']))}">在腾讯地图中添加</a-->
             
                    
													<a class="green syn" href="{pigcms{:U('Wxapp_store/add_store', array('store_id' => $vo['store_id']))}"><if condition="$vo.wxapp_status gt 0">编辑<else />提交</if></a>
                       
											
											</td>
										</tr>
									</volist>
								<else/>
									<tr class="odd"><td class="button-column" colspan="11" >无内容</td></tr>
								</if>
							</tbody>
						</table>
						{pigcms{$pagebar}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<include file="Public:footer"/>
