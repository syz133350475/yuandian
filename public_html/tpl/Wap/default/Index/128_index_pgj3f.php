<!DOCTYPE html>
<html>    <head>
       <if condition="$zd['status'] eq 1">
            {pigcms{$zd['code']}
        </if>
         <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>{pigcms{$tpl.wxname}</title>
        <base href="." />
        <meta name="viewport" content="width=device-width,height=device-height,inital-scale=1.0,maximum-scale=1.0,user-scalable=no;" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="format-detection" content="telephone=no" />
<link href="{pigcms{$static_path}css/allcss/cate28_{pigcms{$tpl.color_id}.css" rel="stylesheet" type="text/css" />
 
<link rel="stylesheet" type="text/css" href="{pigcms{$static_path}css/128/reset.css" media="all">
<!-- <link rel="stylesheet" type="text/css" href="{pigcms{$static_path}css/128/home-29.css" media="all"> -->
<script type="text/javascript" src="{pigcms{$static_path}css/128/maivl.js"></script>
<script type="text/javascript" src="{pigcms{$static_path}css/116/jQuery.js"></script>
<script type="text/javascript" src="{pigcms{$static_path}css/128/swipe.js"></script>
<script type="text/javascript" src="{pigcms{$static_path}css/128/zepto.js"></script>

        
<link rel="stylesheet" type="text/css" href="{pigcms{$static_path}css/128/font-awesome.css" media="all">
</head>
    <body onselectstart="return true;" ondragstart="return false;">
<!--背景音乐-->
<if condition="$homeInfo['musicurl'] neq false">
<include file="Index:music"/>
</if>
<div class="body">
        <!--
    幻灯片管理
    -->
    <div style="-webkit-transform:translate3d(0,0,0);">
        <div id="banner_box" class="box_swipe" style="visibility: visible;">
            <ul style="list-style: none; transition: 0ms; -webkit-transition: 0ms; -webkit-transform: translate3d(0, 0, 0);">
            <volist name="flash" id="so">
                <li style="vertical-align: top;">
                    <a href="{pigcms{$so.url}">
                        <img src="{pigcms{$so.img}" style="width:100%;">
                    </a>
                </li>
            </volist>                       
            </ul>
            <ol>
                <volist name="flash" id="so">
                    <li <if condition="$i eq 1">class="on"</if>></li>
                </volist>
            </ol>
        </div>
    </div>
        <script>
        $(function(){
            new Swipe(document.getElementById('banner_box'), {
                speed:500,
                auto:3000,
                callback: function(){
                    var lis = $(this.element).next("ol").children();
                    lis.removeClass("on").eq(this.index).addClass("on");
                }
            });
        });
    </script>
<br><header>
        <div class="snower">
            <script type="text/javascript"></script>
        </div>
    </header>               <!--
        用户分类管理
        -->
        <section>
            <ul class="list_ul">
            <volist name="info" id="vo">
                <li>
                    <a href="<if condition="$vo['url'] eq ''">{pigcms{:U('Wap/Index/lists',array('classid'=>$vo['id'],'token'=>$vo['token']))}<else/>{pigcms{$vo.url|htmlspecialchars_decode}</if>">
                    <figure>
                        <div style="background-image:url({pigcms{$vo.img});">&nbsp;</div>
                    </figure>
                    </a>
                </li>
            </volist>                       

            </ul>
        </section>
<if condition="$homeInfo['copyright']">
<div class="copyright" style="text-align:center;padding:10px 0">{pigcms{$homeInfo.copyright}</div> 
</if>
    </div>
    
<include file="Index:styleInclude"/>
<include file="$cateMenuFileName"/>    
<!-- share -->
<include file="Index:share" />
</body></html>