<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>{pigcms{$thisCard.cardname}说明</title>
<meta name="viewport" content="width=device-width,height=device-height,inital-scale=1.0,maximum-scale=1.0,user-scalable=no;">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="format-detection" content="telephone=no">
<link href="{pigcms{$static_path}card/style/style.css" rel="stylesheet" type="text/css">
<script src="/ststic/js/jquery.min.js" type="text/javascript"></script>
<script src="{pigcms{$static_path}card/js/accordian.pack.js" type="text/javascript"></script>
</head>

<body id="cardnews" onLoad="new Accordian('basic-accordian',5,'header_highlight');" class="mode_webapp">

<div class="qiandaobanner">  <a   href="javascript:history.go(-1);"><img src="{pigcms{$thisCard.membermsg}" > </a></div>

<div id="basic-accordian">
<div id="test-header" class="accordion_headings header_highlight">
<div class="tab cardinfo">
<span class="title">会员卡使用说明</span>
</div>
<div id="test-content" style="display: block; overflow: hidden; opacity: 1;">
<div class="accordion_child">
<?php echo html_entity_decode($thisCard['info']);?>
</div>
</div>
</div>
<div id="test1-header" class="accordion_headings">
<div class="tab integral_info">
<span class="title">会员{pigcms{$config['score_name']}说明</span>
</div>
<div id="test1-content" style="display: none; overflow: hidden;">
<div class="accordion_child">
<?php echo html_entity_decode($data['cardinfo2']);?>
</div>
</div>
</div>
<div id="test2-header" class="accordion_headings">
<div class="tab businesses_info">
<span class="title">商家介绍</span>
</div>
<div id="test2-content" style="display: none; overflow: hidden;">
<div class="accordion_child">
<p class="xiangqing"><?php echo html_entity_decode($thisCompany['intro']);?></p>
</div>
</div>
</div>
</div>
<include file="Card:cardFooter"/>
<include file="Card:share"/>
</body>
</html>