<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>选择优惠券</title>
<meta http-equiv="MSThemeCompatible" content="Yes" />
<link rel="stylesheet" type="text/css" href="/tpl/Merchant/default/static/css/style_2_common.css" />
<link href="/tpl/Merchant/default/static/css/style.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="/tpl/Merchant/default/static/css/cymain.css" />

<script src="/tpl/Merchant/default/static/js/common.js" type="text/javascript"></script>
<script src="/tpl/Merchant/default/static/js/jquery.min.js" type="text/javascript"></script>
<script type="text/javascript" src="./static/js/artdialog/jquery.artDialog.js"></script>
<script type="text/javascript" src="./static/js/artdialog/iframeTools.js"></script>
<style>
body{line-height:180%;}
ul.modules li{padding:4px 10px;margin:4px;background:#efefef;float:left;width:27%;}
ul.modules li div.mleft{float:left;width:40%}
ul.modules li div.mright{float:right;width:55%;text-align:right;}
</style>
</head>
<body style="background:#fff;padding:20px 20px;">
<div style="background:#fefbe4;border:1px solid #f3ecb9;color:#993300;padding:10px;margin-bottom:5px;">使用方法：点击对应内容后面的“选中”即可。
<a href="<if condition="$_GET['iskeyword'] eq 1">{pigcms{:U('Link/insert', array('iskeyword' => 1))} <else /> {pigcms{:U('Link/insert')} </if>">
点击这里返回模块选择</a></div>
<h4>{pigcms{$moduleName}列表</h4>
<table class="ListProduct" border="0" cellSpacing="0" cellPadding="0" width="100%">
<thead>
<tr>
<th>标题</th>
<th style=" width:80px;">操作 <span class="tooltips" ><span>
<p>点击“选中”即可</p>
</span></span></th>
</tr>
</thead>
<volist name="list" id="m">
<tr><td>{pigcms{$m.name}</td><td class="norightborder"><if condition="$m['sub'] neq NULL && !intval($_GET['iskeyword'])"><a href="{pigcms{$m.sublink}">详情</a>&nbsp;&nbsp;&nbsp;</if><a href="###" onclick="returnHomepage('{pigcms{$m.linkcode}','{pigcms{$m.keyword}')">选中</a></td></tr>
</volist>
</table>
<div class="footactions" style="padding-left:10px">
  <div class="pages">{pigcms{$page}</div>
</div>
<script>
var domid=art.dialog.data('domid');
var domid_=art.dialog.data('domid')+'_code';
// 返回数据到主页面
function returnHomepage(code,name){
	var origin = artDialog.open.origin;
	var dom = origin.document.getElementById(domid);
	var dom_ = origin.document.getElementById(domid_);
	dom.value='优惠券';
	dom_.value=code;
	setTimeout("art.dialog.close()", 100 )
}
</script>
</body>
</html>