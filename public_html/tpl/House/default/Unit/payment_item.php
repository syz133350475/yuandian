<include file="Public:header"/>
<div class="main-content">
    <!-- 内容头部 -->
    <div class="breadcrumbs" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="ace-icon fa fa-user"></i>
                <a href="{pigcms{:U('Unit/index')}">物业管理</a>
            </li>
            <li class="active">自定义收费</li>
        </ul>
    </div>
    <!-- 内容头部 -->
    <div class="page-content">
        <div class="page-content-area">
        	<button class="btn btn-success" onclick="importAdd()">添加收费项</button>
            <style>
                .ace-file-input a {display:none;}
            </style>
            <div class="row">
                <div class="col-xs-12">
                    <div id="shopList" class="grid-view">
                        <table class="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th width="20%">编号</th>
                                    <th width="30%">收费名称</th>
                                    <th width="20%">所含收费标准</th>
                                    <th class="button-column" width="20%">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <if condition="$payment_list">
                                    <volist name="payment_list" id="vo">
                                        <tr class="<if condition="$i%2 eq 0">odd<else/>even</if>">
                                            <td><div class="tagDiv">{pigcms{$vo.payment_id}</div></td>
                                            <td><div class="tagDiv">{pigcms{$vo.payment_name}</div></td>
                                            <td><div class="tagDiv">内含&nbsp; {pigcms{$vo.standard_sum}&nbsp; 个 <a href="{pigcms{:U('payment_standard',array('payment_id'=>$vo['payment_id']))}">详情</a></div></td>
                                            <td class="button-column">
                                                <a style="width: 60px;" class="label label-sm label-info" title="编辑" href="{pigcms{:U('payment_item_edit',array('payment_id'=>$vo['payment_id']))}">编辑</a> &nbsp;
                                                <a style="width: 60px;" class="label label-sm label-info" title="删除" href="javascript:void(0)" onClick="if(confirm('删除收费项目会删除所有的收费标准,以收未收费数据，确认要删除吗？')){location.href='{pigcms{:U('payment_item_del',array('payment_id'=>$vo['payment_id']))}'}">删除</a>
                                           </td>
                                        </tr>
                                    </volist>
                                <else/>
                                    <tr class="odd"><td class="button-column" colspan="4" >没有任何收费项。</td></tr>
                                </if>
                            </tbody>
                        </table>
                        {pigcms{$list.pagebar}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="{pigcms{$static_public}js/artdialog/jquery.artDialog.js"></script>
<script type="text/javascript" src="{pigcms{$static_public}js/artdialog/iframeTools.js"></script>
<script>
function importAdd(){
	window.location.href = "{pigcms{:U('payment_item_add')}";
}
function importUserDetail(){
	window.location.href = "{pigcms{:U('User/detail_import')}";
}
</script>
<include file="Public:footer"/>