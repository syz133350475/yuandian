<include file="Public:header"/>
		<div class="mainbox">
			<div id="nav" class="mainnav_title">
				<ul>
					<a href="{pigcms{:U('Label/index')}" class="on">栏目列表</a>|
					<a href="javascript:void(0);" onclick="window.top.artiframe('{pigcms{:U('Label/column_add')}','添加栏目',600,300,true,false,false,addbtn,'add',true);">添加栏目</a>|
					<a href="{pigcms{:U('Label/label_list')}">标签列表</a>
					<a href="{pigcms{:U('Label/label_add')}" >添加标签</a>
				</ul>
			</div>
			<form name="myform" id="myform" action="" method="post">
				<div class="table-list">
					<table width="100%" cellspacing="0">
						<colgroup>
							<col/>
							<col/>
							<col/>
							<col/>
							<col width="180" align="center"/>
						</colgroup>
						<thead>
							<tr>
								<th>编号</th>
								<th>栏目名称</th>
								<th>URL</th>
								<th>状态</th>
								<th class="textcenter">操作</th>
							</tr>
						</thead>
						<tbody>
							<if condition="is_array($label_list)">
								<volist name="label_list" id="vo">
									<tr>
										<td>{pigcms{$vo.id}</td>
										<td>{pigcms{$vo.title}</td>
										<td><a href="{pigcms{$vo.url}" target="_blank">{pigcms{$vo.url}</a></td>
										<td>
											<if condition="$vo['status'] eq 1"><font color="green">禁止</font><elseif condition="$vo['status'] eq 0"/><font color="red">正常</font></if>
										</td>
										<td class="textcenter">
											<a href="javascript:void(0);" onclick="window.top.artiframe('{pigcms{:U('Label/column_add',array('column_id'=>$vo['id']))}','编辑栏目',600,300,true,false,false,editbtn,'edit',true);">编辑</a>
									  	</td>
									</tr>
								</volist>
								<tr><td class="textcenter pagebar" colspan="7">{pigcms{$pagebar}</td></tr>
							<else/>
								<tr><td class="textcenter red" colspan="4">列表为空！</td></tr>
							</if>
						</tbody>
					</table>
				</div>
			</form>
		</div>
<include file="Public:footer"/>