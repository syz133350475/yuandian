<?php if (!defined('THINK_PATH')) exit(); if(!defined('PigCms_VERSION')){ exit('deny access!');} ?>
<!DOCTYPE html>
<html lang="zh-CN">
	<head>
		<meta charset="utf-8" />
		<title><?php echo (($config["shop_alias_name"])?($config["shop_alias_name"]):"快店"); ?></title>
		<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, width=device-width"/>
		<meta name="apple-mobile-web-app-capable" content="yes"/>
		<meta name='apple-touch-fullscreen' content='yes'/>
		<meta name="apple-mobile-web-app-status-bar-style" content="black"/>
		<meta name="format-detection" content="telephone=no"/>
		<meta name="format-detection" content="address=no"/>
		<link rel="stylesheet" type="text/css" href="<?php echo ($static_path); ?>shop/css/shopBase.css?t=<?php echo ($_SERVER["REQUEST_TIME"]); ?>"/>
		<script type="text/javascript" src="<?php echo C('JQUERY_FILE_190');?>" charset="utf-8"></script>
		<script type="text/javascript" src="<?php echo ($static_path); ?>js/iscroll.js?220" charset="utf-8"></script>
		<script type="text/javascript" src="<?php echo ($static_path); ?>js/idangerous.swiper.min.js" charset="utf-8"></script>
		<script type="text/javascript" src="<?php echo ($static_path); ?>js/fastclick.js" charset="utf-8"></script>
		<script type="text/javascript" src="<?php echo ($static_path); ?>layer/layer.m.js" charset="utf-8"></script>
		<script type="text/javascript" src="<?php echo ($_SERVER["REQUEST_SCHEME"]); ?>://api.map.baidu.com/api?ak=4c1bb2055e24296bbaef36574877b4e2&v=2.0&s=1" charset="utf-8"></script>		
		<script type="text/javascript" src="<?php echo ($static_path); ?>js/common.js?220" charset="utf-8"></script>
		<script type="text/javascript">
			var locationClassicHash = 'good-<?php echo ($_GET["shop_id"]); ?>-<?php echo ($_GET["good_id"]); ?>';
			
			var user_long = '0',user_lat  = '0';
			var user_address='';
			var ajax_url_root = "<?php echo ($config["site_url"]); ?>/wap.php?c=Shop&a=";
			var check_cart_url = "<?php echo ($config["site_url"]); ?>/wap.php?c=Shop&a=confirm_order";
			var ajax_map_url = "<?php echo ($config["site_url"]); ?>/index.php?g=Index&c=Map&a=suggestion&city_id=<?php echo ($config["now_city"]); ?>";
			var get_route_url = "<?php echo U('Group/get_route');?>";
			var baiduToGcj02Url = "<?php echo U('Userlonglat/baiduToGcj02');?>";
			var city_id="<?php echo ($config["now_city"]); ?>";
			var cat_url="",sort_url="",type_url="", deliverExtraPrice = 0;
			var noAnimate= true;
			var userOpenid="<?php echo ($_SESSION["openid"]); ?>";
			var storeUrl = "<?php echo ($config["site_url"]); echo U('Shop/classic_shop',array('shop_id'=>$_GET['shop_id']));?>";
			var goodShareUrl = "<?php echo ($config["site_url"]); echo U('Shop/classic_good',array('openid'=>$_SESSION['openid'],'shop_id'=>$_GET['shop_id'],'good_id'=>$_GET['good_id']));?>";
            var nowIndex = '<?php echo ($nowIndex); ?>', cartid = '<?php echo ($cartid); ?>', spellfrm = '<?php echo ($_GET["frm"]); ?>';
            var spell_add_cart = '<?php echo ($config["site_url"]); ?>/wap.php?c=Shop&a=addNew', spell_cart_url = '<?php echo ($config["site_url"]); ?>/wap.php?c=Shop&a=';
			var ajax_cart_url = "<?php echo ($config["site_url"]); ?>/wap.php?c=Shop&a=ajax_cart";
			var ajax_cart_save_url = "<?php echo ($config["site_url"]); ?>/wap.php?c=Shop&a=ajax_cart_save";
            var ajax_basic_price = "<?php echo ($config["site_url"]); ?>/wap.php?c=Shop&a=ajax_basic_price";
		</script>
		<script type="text/javascript" src="<?php echo ($static_path); ?>shop/js/shopClassicBaseNew.js?t=<?php echo ($_SERVER["REQUEST_TIME"]); ?>" charset="utf-8"></script>
	</head>
	<body>
		<div id="pageList" class="pageDiv" <?php if($config['shop_show_footer']): ?>style="padding-bottom:56px;"<?php endif; ?>>
			<section id="listHeader" class="roundBg">
				<div id="listBackBtn" class="listBackBtn hide"><div></div></div>
				<div id="locationBtn" class="page-link" data-url="address" data-url-type="openRightFloatWindow">
					<span class="location"></span>
					<span id="locationText">正在定位</span>
					<span class="go"></span>
				</div>
				<div id="searchBtn" class="listSearchBtn page-link" data-url="shopsearch"><div></div></div>
			</section>
			<section id="listBanner" class="banner">
				<div class="swiper-container swiper-container1">
					<div class="swiper-wrapper"></div>
					<div class="swiper-pagination swiper-pagination1"></div>
				</div>
			</section>
			<section id="listSlider" class="slider">
				<div class="swiper-container swiper-container2" style="height:178px;">
					<div class="swiper-wrapper"></div>
					<div class="swiper-pagination swiper-pagination2"></div>
				</div>
			</section>
			<section id="listRecommend" class="recommend"></section>
			<section id="listNavBox" class="navBox">
				<ul>
					<li class="dropdown-toggle caret category" data-nav="category">
						<span class="nav-head-name">店铺分类</span>
					</li>
					<li class="dropdown-toggle caret sort" data-nav="sort">
						<span class="nav-head-name">智能排序</span>
					</li>
					<li class="dropdown-toggle caret type subway" data-nav="type">
						<span class="nav-head-name">类型</span>
					</li>
				</ul>
				<div class="dropdown-wrapper category">
					<div class="dropdown-module">
						<div class="scroller-wrapper">
							<div id="dropdown_scroller" class="dropdown-scroller">
								<div>
									<ul>
										<li class="category-wrapper" style="min-height:200px;">
											<ul class="dropdown-list"></ul>
										</li>
										<li class="sort-wrapper">
											<ul class="dropdown-list"></ul>
										</li>
										<li class="type-wrapper">
											<ul class="dropdown-list"></ul>
										</li>
									</ul>
								</div>
							</div>
							<div id="dropdown_sub_scroller" class="dropdown-sub-scroller"><div></div></div>
						</div>
					</div>
				</div>
			</section>
			<section id="listNavPlaceHolderBox">
			</section>
			<section id="storeList">
				<dl class="dealcard"></dl>
				<div id="storeListLoadTip">正在加载中...</div>
			</section>
			<section class="shade"></section>
			<?php if(!$config['shop_show_footer']){$no_footer = true;$no_small_footer = true;} ?>
			<?php if(empty($no_footer)): ?><footer class="footerMenu <?php if(!$is_wexin_browser || $home_menu_list): ?>wap<?php endif; ?>">
    <?php if($home_menu_list): ?><ul>
            <?php if(is_array($home_menu_list)): $i = 0; $__LIST__ = $home_menu_list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li>
                    <a href="<?php echo ($vo['url']); ?>" <?php if(stripos($vo["url"],"c=".MODULE_NAME)): ?>class="active"<?php endif; ?>><em></em><p><?php echo ($vo["name"]); ?></p></a>
                </li>
                 <style type="text/css">
                    .footerMenu ul li:nth-of-type(<?php echo ($key+1); ?>) a em{background:url(<?php echo ($config["site_url"]); ?>/upload/slider/<?php echo ($vo["pic_path"]); ?>) no-repeat center left; background-size:22px 20px}
                    .footerMenu ul li:nth-of-type(<?php echo ($key+1); ?>) a.active em{ background:url(<?php echo ($config["site_url"]); ?>/upload/slider/<?php echo ($vo["hover_pic_path"]); ?>) no-repeat center left; background-size:22px 20px}
                </style><?php endforeach; endif; else: echo "" ;endif; ?>
		</ul>
    <?php else: ?>
        <ul>
			<li>
				<a <?php if(MODULE_NAME == 'Home'){ echo 'class="active"'; }?> href="<?php echo U('Home/index');?>"><em class="home"></em><p>首页</p></a>
			</li>
			<li>
				<a <?php if(MODULE_NAME == 'Group'){ echo 'class="hover"'; }?> href="<?php echo U('Group/index');?>"><em class="group"></em><p><?php echo ($config["group_alias_name"]); ?></p></a>
			</li>
			<li class="voiceBox">
				<a href="<?php echo U('Search/voice');?>" class="voiceBtn" data-nobtn="true"></a>
			</li>
			<li>
				<a <?php if(in_array(MODULE_NAME,array('Shop'))){ echo 'class="hover"';}?> href="<?php echo U('Shop/index');?>"><em class="store"></em><p><?php echo ($config["shop_alias_name"]); ?></p></a>
			</li>
			<li>
				<a <?php if(in_array(MODULE_NAME,array('My','Login'))){ echo 'class="active"'; }?> href="<?php echo U('My/index');?>"><em class="my"></em><p>我的</p></a>
			</li>
		</ul><?php endif; ?>
	</footer>
<?php elseif(!$is_app_browser && empty($no_small_footer) && $merchant_link_showOther): ?>
	<div class="wx_aside more_active" id="quckArea">
		<a id="quckIco2" class="btn_more"><img style="width:40px;height:40px;" src="tpl/Wap/pure/static/img/more.png" />更多</a>
		<div class="wx_aside_item" id="quckMenu" style="display:none">
			<div id="footer_home" class="item_gwq"><img src="tpl/Wap/pure/static/img/footer_home.png" /><a> 首页</a></div>
			<div id="footer_group" class="item_gwq"><img src="tpl/Wap/pure/static/img/footer_group.png" /><a> <?php echo ($config["group_alias_name"]); ?></a></div>
			<div id="footer_store" class="item_gwq"><img src="tpl/Wap/pure/static/img/footer_foodshop.png" /><a> <?php echo ($config["meal_alias_name"]); ?></a></div>
			<div id="footer_shop" class="item_gwq"><img src="tpl/Wap/pure/static/img/footer_shop.png" /><a> <?php echo ($config["merchant_alias_name"]); ?></a></div>
			<div id="footer_my" class="item_gwq"><img src="tpl/Wap/pure/static/img/footer_my.png" /><a> 我的</a></div>
			<div id="footer_refresh" class="item_gwq"><img src="tpl/Wap/pure/static/img/footer_refresh.png" /><a> 刷新</a></div>
		</div>
	</div>
	<script>
		$("#quckIco2").on('click',function(){
			$("#quckMenu").toggle();
		});
		$("#footer_home").on('click',function(){
			location.href = "<?php echo U('wap/Home/index');?>";
		});
		$("#footer_group").on('click',function(){
			location.href = "<?php echo U('wap/Group/index');?>";
		});
		$("#footer_store").on('click',function(){
			location.href = "<?php echo U('wap/Meal_list/index');?>";
		});
		$("#footer_shop").on('click',function(){
			location.href = "<?php echo U('wap/Merchant/store_list');?>";
		});
		$("#footer_my").on('click',function(){
			location.href = "<?php echo U('wap/My/index');?>";
		});
		$("#footer_refresh").on('click',function(){
			location.reload();
		});
	</script><?php endif; ?>
<div style="display:none;"><?php echo ($config["wap_site_footer"]); ?></div>
		</div>
		<div id="pageShop" class="pageDiv">
			<section id="shopHeader">
				<div id="backBtn" class="backBtn"></div>
				<div id="shopTitle"></div>
				<!--div id="searchBtn" class="searchBtn"><div></div></div-->
			</section>
			<section id="shopBanner">
				<div class="leftIco">
					<div id="shopIcon"></div>
				</div>
				<div class="text">
					<div id="deliveryText"></div>
					<div id="shopNoticeText"></div>
				</div>
				<div class="discount">
					<div class="noticeBox"><div class="notice"><div></div></div></div>
					<span id="shopCouponText"></span>
				</div>
			</section>
			<section id="shopMenuBar">
				<ul>
					<li class="caret product active" data-nav="product">商品</li>
					<li class="caret reply" data-nav="reply">评价</li>
					<li class="caret merchant" data-nav="merchant">商家</li>
				</ul>
			</section>
			<section id="shopCatBar" style="display:none;">	
				<div class="title">
					全部分类
				</div>
				<div class="content">
					<ul></ul>
				</div>
			</section>
			<section id="shopContentBar">
				<div id="shopProductBox">
					<div id="shopProductBottomBar"><ul class="clearfix"></ul><div id="shopProductBottomLine"></div></div>
					<div id="shopProductLeftBar"><dl></dl></div>
					<div id="shopProductRightBar"><dl></dl></div>
					<div id="shopProductCartShade"></div>
					<div id="top_fei" style="position: fixed;background-color: white;width: 100%;bottom: 50px;z-index: 126;overflow-y:auto; display: none;">
						<div class="top_header" style="background: rgba(6, 193, 174, 0.31);text-align:center;color: #393A3A;width: 100%;height: 30px;line-height: 30px;">加<span style="color:#CB0003;" class="header_data">3</span>元就能配送 <span style="color:#CB0003;">[确认加钱]</span></div>
						<div id="shopProductCartBox"></div>
					</div>
					<div id="shopProductCart">
						<div id="cartInfo" class="cartLeft" style="display:none;">
							<div class="cart">
								<div id="cartNumber">0</div>
							</div>
							<div class="price"><dl><dt>共￥<span id="cartMoney">0</span></dt><dd style="font-size: 12px;color: #979796;">另需起送价附加费<span id="additional">3</span>元</dd></dl></div>
						</div>
						<div id="emptyCart">
							<div class="cart"></div>购物车是空的
						</div>
						<div id="checkCart" style="display:none;">选好了</div>
						<div id="checkCartEmpty">￥0起送价</div>
					</div>
				</div>
				<div id="shopReplyBox" style="display:none">
					<div id="shopReplyDiv">
						<ul class="clearfix">
							<li class="active" data-tab="">全部(<em>0</em>)</li>
							<li data-tab="good">满意(<em>0</em>)</li>
							<li data-tab="wrong">不满意(<em>0</em>)</li>
						</ul>
						<dl></dl>
						<div id="noReply">暂无评价</div>
						<div id="showMoreReply">加载更多</div>
					</div>
				</div>
				<div id="shopMerchantBox">
					<dl id="shopMerchantDescBox">
						<dd class="phone more">店铺电话</dd>
						<dd class="address more page-link"><span></span>店铺地址</dd>
						<dd class="openTime">营业时间</dd>
						<dd class="deliveryType">配送服务</dd>
						<dd class="merchantNotice">店铺公告</dd>
					</dl>
					<?php if(!$merchant_link_showOther): ?><dl id="shopMerchantLinkBox">
							<dd class="more link-url" data-url="<?php echo U('My/shop_order_list');?>"><span></span>我的<?php echo ($config["shop_alias_name"]); ?>订单</dd>
						</dl><?php endif; ?>
					<dl id="shopMerchantCouponBox">
						<dd>配送服务</dd>
						<dd>配送时间</dd>
					</dl>
				</div>
				<div id="shopPageShade"></div>
				<div id="shopPageCatShade"></div>
				<div id="shopDetailPage" style="display:none;">
					<div class-s="scrollerBox">
						<div id="shopDetailpageClose" class="closeBtn"><div></div></div>
						<div id="shopDetailPageImgbox" class="swiper-container swiper-container-productImg">
							<div class="swiper-wrapper"></div>
							<div class="swiper-pagination swiper-pagination-productImg"></div>
						</div>
						<div id="shopDetailPageTitle">
							<div class="title">商品名称</div>
							<div class="desc">商品描述</div>
						</div>
						<div id="shopDetailPageFormat">商品库存</div>
						<div id="shopDetailPageBar" class="clearfix">
							<div class="fl" id="shopDetailPagePrice">价格</div>
							<div class="fr">
								<div id="shopDetailPageBuy">加入购物车</div>
								<div id="shopDetailPageNumber" style="display:none;">
									<div class="product_btn plus"></div>
									<div class="product_btn number">0</div>
									<div class="product_btn min"></div>
								</div>
							</div>
						</div>
						<div id="shopDetailPageLabel">
							<div class="tip">我要备注<div class="question"></div></div>
							<div id="shopDetailPageLabelBox"></div>
						</div>
						<div id="shopDetailPageContent">
							<div class="title">商品描述</div>
							<div class="content">商品描述内容</div>
						</div>
					</div>
				</div>
			</section>
		</div>
		<div id="pageMap" class="pageDiv">
			<div id="shopDetailMapClose" class="closeBtn"><div></div></div>
			<div id="shopDetailMapBiz"></div>
			<div id="shopDetailMapBar">
				<span id="shopDetailMapAddress">地址</span>
				<a class="btn right" id="shopDetailMapAddressGo">查看路线</a>
			</div>
		</div>
		<div id="pageCat" class="pageDiv">
			<section id="catHeader">
				<div id="catBackBtn" class="backBtn"></div>
				<span id="catTitle">分类</span>
				<div id="catSearchBtn" class="listSearchBtn page-link" data-url="shopSearch"><div></div></div>
			</section>
			<div id="pageCatNav"></div>
			<section class="shade"></section>
			<section id="storeList">
				<dl class="dealcard"></dl>
				<div id="storeListLoadTip">正在加载中...</div>
			</section>
		</div>
		<div id="pageLoadTipShade" class="pageLoadTipBg">
			<div id="pageLoadTipBox" class="pageLoadTipBox">
				<div class="pageLoadTipLoader">
					<div style="background-image:url(<?php echo ($config["shop_load_bg"]); ?>);"><!--img src="<?php echo ($static_path); ?>shop/images/pageTipImg.png"/--></div>
				</div>
			</div>
		</div>
		<div id="pageAddress" class="pageDiv">
			<div id="pageAddressHeader" class="searchHeader">
				<div id="pageAddressBackBtn" class="searhBackBtn"></div>
				<div id="pageAddressSearch" class="searchBox">
					<div class="searchIco"></div>
					<input type="text" id="pageAddressSearchTxt" class="searchTxt" placeholder="请输入收货地址" autocomplete="off"/>
					<div class="delIco" id="pageAddressSearchDel"><div></div></div>
				</div>
				<div id="pageAddressSearchBtn" class="searchBtn">搜索</div>
			</div>
			<div id="pageAddressContent" class="searchAddressList">
				<div id="pageAddressLocationList">
					<div class="title">当前地址</div>
					<dl class="content">
						<dd data-long="" data-lat="" data-name="">
							<div class="name"></div>
						</dd>
					</dl>
				</div>
				<div id="pageAddressUserList">
					<div class="title">我的收货地址</div>
					<dl class="content"></dl>
				</div>
			</div>
			<div id="pageAddressSearchContent" class="searchAddressList" style="display:none;">
				<dl class="content"></dl>
			</div>
		</div>
		<div id="pageShopSearch" class="pageDiv">
			<div id="pageShopSearchHeader" class="searchHeader">
				<div id="pageShopSearchBackBtn" class="searhBackBtn"></div>
				<div id="pageShopSearchBox" class="searchBox">
					<div class="searchIco"></div>
					<input type="text" id="pageShopSearchTxt" class="searchTxt" placeholder="请输入店铺名称" autocomplete="off"/>
					<div class="delIco" id="pageShopSearchDel"><div></div></div>
				</div>
				<div id="pageShopSearchBtn" class="searchBtn">搜索</div>
			</div>
			<div id="storeList" style="display:none;">
				<dl class="dealcard"></dl>
				<div id="storeListLoadTip">正在加载中...</div>
			</div>
		</div>
		<?php if(!defined('PigCms_VERSION')){ exit('deny access!');} ?>
<script id="listBannerSwiperTpl" type="text/html">
	{{# for(var i = 0, len = d.length; i < len; i++){ }}
		<div class="swiper-slide">
			<a href="{{ d[i].url }}">
				<img src="{{ d[i].pic }}" alt="{{ d[i].name }}"/>
			</a>
		</div>
	{{# } }}
</script>
<script id="listSliderSwiperTpl" type="text/html">
	{{# for(var i = 0, len = d.length; i < len; i++){ }}
		{{# if(i%8 == 0){ }}
			<div class="swiper-slide">
				<ul class="icon-list">
		{{# } }}
					<li class="icon">
						<a href="{{ d[i].url }}">
							<span class="icon-circle">
								<img src="{{ d[i].pic }}">
							</span>
							<span class="icon-desc">{{ d[i].name }}</span>
						</a>
					</li>
		{{# if(i != 0 && ((i+1)%8 == 0 || i+1 == len)){ }}		
				</ul>
			</div>
		{{# } }}
	{{# } }}
</script>
<script id="listRecommendTpl" type="text/html">
	<div class="recommendBox">
		{{# if(d[0]){ }}
			<div class="recommendLeft link-url" data-url="{{ d[0].url }}">
				<img src="{{ d[0].pic }}" alt="{{ d[0].name }}"/>
			</div>
		{{# } }}
		<div class="recommendRight">
			{{# if(d[1]){ }}
				<div class="recommendRightTop link-url" data-url="{{ d[1].url }}">
					<img src="{{ d[1].pic }}" alt="{{ d[1].name }}"/>
				</div>
			{{# } }}
			{{# if(d[2]){ }}
				<div class="recommendRightBottom link-url" data-url="{{ d[2].url }}">
					<img src="{{ d[2].pic }}" alt="{{ d[2].name }}">
				</div>
			{{# } }}
		</div>
	</div>
</script>
<script id="listShopTpl" type="text/html">
	{{# for(var i = 0, len = d.length; i < len; i++){ }}
		<dd class="page-link" data-url="shop&shop_id={{ d[i].id }}" data-url-type="openRightFloatWindow" {{# if(d[i].is_close){ }}style="opacity:0.6;"{{# } }}>
			<div class="dealcard-img imgbox">
				{{# if(d[i].isverify == 1){ }}
					<img src="./static/images/kd_rec.png" style="width: 41px;height: 15px;position: absolute;z-index: 15;margin: 2px 0 0 0;">
				{{# } }}
				<img src="{{ d[i].image }}" alt="{{ d[i].name }}">
				{{# if(d[i].is_close){ }}<div class="closeTip">休息中</div>{{# } }}
			</div>
			<div class="dealcard-block-right">
				<div class="brand">{{ d[i].name }}<em class="location-right">{{# if(user_long != '0'){ }}{{ d[i].range }}{{# } }}</em></div>
				<div class="title {{# if(!d[i].delivery){ }}pick{{# } }}">
					<span class="star"><i class="full"></i><i class="full"></i><i class="full"></i><i class="half"></i><i></i></span><span>已售{{ d[i].month_sale_count }}单</span>
					{{# if(d[i].delivery){ }}
                        {{# if(d[i].deliver_type != 5){ }}
						<em class="location-right">{{ d[i].delivery_time }}分钟</em>
                        {{# } }}
					{{# }else{ }}
						<em class="location-right ziti">门店自提</em>
					{{# } }}
				</div>
				{{# if(d[i].delivery){ }}
					<div class="price">
						<span>起送价 ￥{{ d[i].delivery_price }}</span><span class="delivery">配送费 ￥{{ d[i].delivery_money }}</span>
						{{# if(d[i].delivery_system){ }}
							<em class="location-right">{{ deliverName }}</em>
						{{# }else{ }}
                            {{# if(d[i].deliver_type == 5){ }}
							<em class="location-right merchant_send">快递配送</em>
                            {{# }else{ }}
							<em class="location-right merchant_send">商家配送</em>
						    {{# } }}
						{{# } }}
					</div>
				{{# } }}
			</div>
				{{# if(d[i].coupon_count > 0){ }}
					<div class="coupon {{# if(d[i].coupon_count > 2){ }}hasMore{{# } }}">
						<ul>
							{{# var tmpCouponList = parseCoupon(d[i].coupon_list,'array');  }}
							{{# if(tmpCouponList['invoice']){ }}
								<li><em class="merchant_invoice"></em>{{ tmpCouponList['invoice'] }}</li>
							{{# } }}
							{{# if(tmpCouponList['discount']){ }}
								<li><em class="merchant_discount"></em>{{ tmpCouponList['discount'] }}</li>
							{{# } }}
							{{# if(tmpCouponList['minus']){ }}
								<li><em class="merchant_minus"></em>{{ tmpCouponList['minus'] }}</li>
							{{# } }}
							{{# if(tmpCouponList['newuser']){ }}
								<li><em class="newuser"></em>{{ tmpCouponList['newuser'] }}</li>
							{{# } }}
							{{# if(tmpCouponList['delivery']){ }}
								<li><em class="delivery"></em>{{ tmpCouponList['delivery'] }}</li>
							{{# } }}
							{{# if(tmpCouponList['system_minus']){ }}
							<li><em class="system_minus"></em>{{ tmpCouponList['system_minus'] }}</li>
							{{# } }}
							{{# if(tmpCouponList['system_newuser']){ }}
								<li><em class="system_newuser"></em>{{ tmpCouponList['system_newuser'] }}</li>
							{{# } }}
							{{# if(tmpCouponList['isDiscountGoods']){ }}
								<li><em class="isDiscountGoods"></em>{{ tmpCouponList['isDiscountGoods'] }}</li>
							{{# } }}
							{{# if(tmpCouponList['isdiscountsort']){ }}
								<li><em class="merchant_discount"></em>{{ tmpCouponList['isdiscountsort'] }}</li>
							{{# } }}
						</ul>
						{{# if(d[i].coupon_count > 2){ }}
							<div class="more">{{ d[i].coupon_count }}个活动</div>
						{{# } }}
					</div>
				{{# } }}
		</dd>
	{{# } }}
</script>
<!-- <script id="shopProductLeftBarTpl" type="text/html">
	{{# for(var i = 0, len = d.length; i < len; i++){ }}
		<dd id="shopProductLeftBar-{{ d[i].cat_id }}" data-cat_id="{{ d[i].cat_id }}" {{# if(i==0){ }}class="active"{{# } }}>{{ d[i].cat_name }}</dd>
	{{# } }}
</script> -->

<!-- <script id="shopProductRightBarTpl" type="text/html">
	{{# for(var i = 0, len = d.length; i < len; i++){ }}
		{{# if(d[i].product_list.length > 0){ }}
			<dd id="shopProductRightBar-{{ d[i].cat_id }}" data-cat_id="{{ d[i].cat_id }}">
				<div class="cat_name">{{ d[i].cat_name }}　{{# if(d[i].sort_discount){ }}<div class="cat_discount">{{ d[i].sort_discount }}折</div><div class="cat_discount bred">折扣不同享</div>{{# } }}</div>
				<ul>
					{{# for(var j = 0, jlen = d[i].product_list.length; j < jlen; j++){ }}
						<li class="product_{{ d[i].product_list[j].product_id }}" data-product_id="{{ d[i].product_list[j].product_id }}" data-product_price="{{ d[i].product_list[j].product_price }}" data-product_name="{{ d[i].product_list[j].product_name }}" data-stock="{{ d[i].product_list[j].stock }}">
							<div class="position_img">
								<img src="{{ d[i].product_list[j].product_image }}"/>
							</div>
							<div class="product_text">
								<div class="title">{{ d[i].product_list[j].product_name }}</div>
								<div class="sale">已售{{ d[i].product_list[j].product_sale }} 好评{{ d[i].product_list[j].product_reply }}</div>
								{{# if(d[i].product_list[j].has_format){ }}
									<div class="price">￥{{ d[i].product_list[j].product_price }} 起</div>
								{{# }else{ }}
									<div class="price">￥{{ d[i].product_list[j].product_price }}{{# if(d[i].product_list[j].is_seckill_price){ }}<span>￥{{ d[i].product_list[j].o_price }}</span>{{# } }}</div>
								{{# } }}
								{{# if(d[i].product_list[j].is_seckill_price){ }}
									<div class="skill_discount" style="margin-top: 5px;">限时优惠</div>
								{{# } }}
							</div>
							{{# if(d[i].product_list[j].has_format){ }}
								<div class="product_btn">
									可选规格
								</div>
							{{# }else{ }}
								<div class="product_btn plus"></div>
								<div class="bgPlusBack"></div>
								<div class="bgMinBack"></div>
							{{# } }}
						</li>
					{{# } }}
				</ul>
			</dd>
		{{# } }}
	{{# } }}
</script> -->

<script id="shopProductLeftBarTpl" type="text/html">
    {{# var loop_num = 0; }}
	{{# for(var i in d){ }}
		<dd id="shopProductLeftBar2-{{ d[i].cat_id }}" data-cat_id="{{ d[i].cat_id }}" {{# if(loop_num == 0){ }}class="active"{{# } }}>
			<span data-sort_id="{{d[i].cat_id}}">{{ d[i].cat_name }}</span>
			{{# if (d[i].son_list != undefined) { }}
			<ul>
                {{# var loop_num2 = 0; }}
                {{# for (var ii in d[i].son_list) { }}
				<li {{# if(loop_num == 0 && loop_num2 == 0){ }}class="active"{{# } }}>
					<em data-sort_id="{{d[i].son_list[ii].cat_id}}">{{d[i].son_list[ii].cat_name}}</em>
                    {{# if (d[i].son_list != undefined) { }}
					<div class="p" {{# if(loop_num == 0 && loop_num2 == 0){ }}style="display:block"{{# } }}>
                        {{# var loop_num3 = 0; }}
                        {{# for (var iii in d[i].son_list[ii].son_list) { }}
						<p data-sort_id="{{d[i].son_list[ii].son_list[iii].cat_id}}" {{# if(loop_num == 0 && loop_num2 == 0 && loop_num3 == 0){ }}class="active"{{# } }}>{{d[i].son_list[ii].son_list[iii].cat_name}}</p>
                            {{# loop_num3 ++; }}
                        {{# } }}
					</div>
                    {{# } }}
				</li>
                    {{# loop_num2 ++; }}
                {{# } }}
			</ul>
            {{# } }}
		</dd>
        {{# loop_num ++; }}
	{{# } }}
</script>

<script id="shopProductRightBarTpl" type="text/html">
{{# var loop = 0; }}
	{{# for(var i in d){ }}
		{{# if(d[i].product_list.length > 0){ }}
			<dd id="shopProductRightBar2-{{ d[i].cat_id }}" data-cat_id="{{ d[i].cat_id }}">
				<div class="cat_name">{{ d[i].cat_name }}　{{# if(d[i].sort_discount){ }}<div class="cat_discount">{{ d[i].sort_discount }}折</div><div class="cat_discount bred">折扣不同享</div>{{# } }}</div>
				<ul>
					{{# for(var j = 0, jlen = d[i].product_list.length; j < jlen; j++){ }}
                        {{# loop++; }}
						<li class="product_{{ d[i].product_list[j].product_id }}" data-unit="{{ d[i].product_list[j].unit }}" data-product_id="{{ d[i].product_list[j].product_id }}" data-product_price="{{ d[i].product_list[j].product_price }}" data-packing_charge="{{ d[i].product_list[j].packing_charge }}" data-product_name="{{ d[i].product_list[j].product_name }}" data-stock="{{ d[i].product_list[j].stock }}" data-max_num="{{ d[i].product_list[j].max_num }}" data-min_num="{{ d[i].product_list[j].min_num }}" data-o_price="{{ d[i].product_list[j].o_price }}" data-is_seckill="{{ d[i].product_list[j].is_seckill_price }}" data-limit_type="{{ d[i].product_list[j].limit_type }}" data-user_buy_num="{{ d[i].product_list[j].user_buy_num }}">
							<div class="position_img {{# if(storeTheme == 1) { }}mall{{# } }}">
								{{# if(loop > 10){ }}
									<img src="<?php echo ($static_public); ?>images/blank.gif" data-original="{{ d[i].product_list[j].product_image }}" class="lazy" {{# if(nowShop.store.store_theme == 1){ }}style="width:60px;"{{# } }}/>
								{{# }else{ }}
									<img src="{{ d[i].product_list[j].product_image }}" {{# if(nowShop.store.store_theme == 1){ }}style="width:60px;"{{# } }}/>
								{{# } }}
							</div>
							<div class="product_text">
								<div class="title">{{ d[i].product_list[j].product_name }}</div>
								{{# if (d[i].product_list[j].product_sale > 0) { }}
								<div class="sale">已售{{ d[i].product_list[j].product_sale }}{{ d[i].product_list[j].unit }} 好评{{ d[i].product_list[j].product_reply }}</div>
								{{# } else if (d[i].product_list[j].is_new) { }}
								<div class="sale">新品上市 好评{{ d[i].product_list[j].product_reply }}</div>
								{{# } else { }}
								<div class="sale"> 好评{{ d[i].product_list[j].product_reply }}</div>
								{{# } }}
								{{# if(d[i].product_list[j].has_format){ }}
									<div class="price">￥{{ d[i].product_list[j].product_price }} {{# if(d[i].product_list[j].spec_value){ }}起{{# } }}</div>
								{{# }else{ }}
									<div class="price">￥{{ d[i].product_list[j].product_price }}{{# if(d[i].product_list[j].is_seckill_price){ }}<span>￥{{ d[i].product_list[j].o_price }}</span>{{# } }}</div>
								{{# } }}
								{{# if(d[i].product_list[j].is_seckill_price && d[i].product_list[j].limit_type == 0){ }}
									<div class="skill_discount" style="margin-top: 5px;">限时优惠{{# if(d[i].product_list[j].max_num > 0){ }},限{{ d[i].product_list[j].max_num }}{{ d[i].product_list[j].unit }}优惠{{# } }}</div>
								{{# } else if (d[i].product_list[j].max_num > 0) { }}
                                    <div class="skill_discount" style="margin-top: 5px;">限购{{ d[i].product_list[j].max_num }}{{ d[i].product_list[j].unit }}</div>
                                {{# } }}
							</div>
							{{# if(d[i].product_list[j].has_format){ }}
								<div class="product_btn">
									可选规格
								</div>
							{{# }else{ }}
								<div class="product_btn plus"></div>
								<div class="bgPlusBack"></div>
								<div class="bgMinBack"></div>
							{{# } }}
						</li>
					{{# } }}
				</ul>
			</dd>
		{{# } }}
	{{# } }}
</script>





<script id="shopProductTopBarTpl" type="text/html">
		<li data-cat_id="0" class="active">全部分类</li>
	{{# for(var i = 0, len = d.length; i < len; i++){ }}
		<li data-cat_id="{{ d[i].cat_id }}">{{ d[i].cat_name }}{{# if(d[i].sort_discount){ }}<span>({{ d[i].sort_discount }}折优惠)</span>{{# } }}</li>
	{{# } }}
</script>
<script id="shopProductBottomBarTpl" type="text/html">
	{{# for(var i = 0, len = d.length; i < len; i++){ }}
		{{# if(d[i].product_list.length > 0){ }}
			{{# for(var j = 0, jlen = d[i].product_list.length; j < jlen; j++){ }}
				<li class="product_{{ d[i].product_list[j].product_id }} product_cat_{{ d[i].cat_id }}" data-unit="{{ d[i].product_list[j].unit }}" data-product_id="{{ d[i].product_list[j].product_id }}" data-packing_charge="{{ d[i].product_list[j].packing_charge }}" data-product_price="{{ d[i].product_list[j].product_price }}" data-product_name="{{ d[i].product_list[j].product_name }}" data-stock="{{ d[i].product_list[j].stock }}" data-limit_type="{{ d[i].product_list[j].limit_type }}"  data-user_buy_num="{{ d[i].product_list[j].user_buy_num }}">
					<div class="position_img">
						<img src="{{ d[i].product_list[j].product_image }}"/>
					</div>
					<div class="product_text">
						<div class="title">{{ d[i].product_list[j].product_name }}</div>
								{{# if(d[i].product_list[j].is_seckill_price && d[i].product_list[j].limit_type == 0){ }}
									<div class="skill_discount" style="margin-top: 5px;">限时优惠{{# if(d[i].product_list[j].max_num > 0){ }},限{{ d[i].product_list[j].max_num }}{{ d[i].product_list[j].unit }}优惠{{# } }}</div>
								{{# } else if (d[i].product_list[j].max_num > 0) { }}
                                    <div class="skill_discount" style="margin-top: 5px;">限购{{ d[i].product_list[j].max_num }}{{ d[i].product_list[j].unit }}</div>
                                {{# } }}
						<div class="sale">已售{{ d[i].product_list[j].product_sale }}{{ d[i].product_list[j].unit }} 好评{{ d[i].product_list[j].product_reply }}</div>
						{{# if(d[i].product_list[j].has_format){ }}
							<div class="price">￥{{ d[i].product_list[j].product_price }}  {{# if(d[i].product_list[j].spec_value){ }}起{{# } }}</div>
						{{# }else{ }}
							<div class="price">￥{{ d[i].product_list[j].product_price }}{{# if(d[i].product_list[j].is_seckill_price){ }}<span>￥{{ d[i].product_list[j].o_price }}</span>{{# } }}</div>
						{{# } }}
					</div>
					{{# if(d[i].product_list[j].has_format){ }}
						<div class="product_btn">
							可选规格
						</div>
					{{# }else{ }}
						<div class="product_btn plus"></div>
					{{# } }}
				</li>
			{{# } }}
		{{# } }}
	{{# } }}
</script>
<script id="listCategoryListTpl" type="text/html">
	{{# for(var i = 0, len = d.length; i < len; i++){ }}
		<li data-cat_id="{{ d[i].cat_id }}" data-cat_url="{{ d[i].cat_url }}" {{# if(d[i].son_list && d[i].son_list.length > 0){ }}data-has-sub="true"{{# }else{ }} onclick="list_location($(this));return false;" {{# } }} class="listCat-{{ d[i].cat_url }} {{# if(d[i].son_list && d[i].son_list.length > 0){ }}right-arrow-point-right{{# } }} {{# if(i == 0){ }}active{{# } }}">
			<span data-name="{{ d[i].cat_name }}">{{ d[i].cat_name }}</span>
			{{# if(d[i].son_list && d[i].son_list.length > 0){ }}
				<span class="quantity"><b></b></span>		
				<div class="sub_cat hide">
					<ul class="dropdown-list sub-list">
						<li class="listCat-{{ d[i].cat_url }} isSon" data-cat_id="{{ d[i].cat_id }}" data-cat_url="{{ d[i].cat_url }}" onclick="list_location($(this));return false;"><div><span class="sub-name" data-name="{{ d[i].cat_name }}">全部</span></div></li>
						{{# for(var j = 0, jlen = d[i].son_list.length; j < jlen; j++){ }}
							<li class="listCat-{{ d[i].son_list[j].cat_url }} isSon" data-cat_id="{{ d[i].son_list[j].cat_id }}" data-cat_url="{{ d[i].son_list[j].cat_url }}" onclick="list_location($(this));return false;"><div><span class="sub-name" data-name="{{ d[i].son_list[j].cat_name }}">{{ d[i].son_list[j].cat_name }}</span></div></li>
						{{# } }}
					</ul>
				</div>
			{{# } }}
		</li>
	{{# } }}
</script>
<script id="listSortListTpl" type="text/html">
	{{# for(var i = 0, len = d.length; i < len; i++){ }}
		<li data-sort_url="{{ d[i].sort_url }}" {{# if(i == 0){ }}class="active"{{# } }} onclick="list_location($(this));return false;"><span data-name="{{ d[i].name }}">{{ d[i].name }}</span><em></em></li>
	{{# } }}
</script>
<script id="listTypeListTpl" type="text/html">
	{{# for(var i = 0, len = d.length; i < len; i++){ }}
		<li data-type_url="{{ d[i].type_url }}" {{# if(i == 0){ }}class="active"{{# } }} onclick="list_location($(this));return false;"><span data-name="{{ d[i].name }}">{{ d[i].name }}</span><em></em></li>
	{{# } }}
</script>
<script id="listAddressListTpl" type="text/html">
	{{# for(var i = 0, len = d.length; i < len; i++){ }}
		<dd data-long="{{ d[i].long }}" data-lat="{{ d[i].lat }}" data-name="{{ d[i].street }}" data-id="{{ d[i].id }}">
			<div class="name">{{ d[i].street }} {{ d[i].house }}</div>
			<div class="desc">{{ d[i].name }} {{ d[i].phone }}</div>
		</dd>
	{{# } }}
</script>
<script id="productFormatTpl" type="text/html">
	{{# for(var i in d){ }}
		<div class="row clearfix">
			<div class="left">{{ d[i].name }}</div>
			<div class="right fl">
				<ul>
					{{# var k = 0; for(var j in d[i].list){ }}
						<li class="fl {{# if(k == 0){ }}active{{# } }}" data-spec_list_id="{{ d[i].list[j].id }}"  data-spec_id="{{ d[i].list[j].sid}}">{{ d[i].list[j].name }}</li>
					{{#  k++; } }}
				</ul>
			</div>
		</div>
	{{# } }}
</script>
<script id="productPropertiesTpl" type="text/html">
	{{# for(var i in d){ }}
		<div class="row clearfix productProperties_{{ d[i].id }}" data-label_name="{{ d[i].name }}" data-num="{{ d[i].num }}">
			<div class="left">{{ d[i].name }}</div>
			<div class="right fl">
				<ul>
					{{# var k = 0; for(var j in d[i].val){ }}
						<li class="fl {{# if(k == 0 && d[i].num == 1){ }}active{{# } }}" data-label_list_id="{{ i }}" data-label_id="{{ j }}">{{ d[i].val[j] }}</li>
					{{#  k++; } }}
				</ul>
			</div>
		</div>
	{{# } }}
</script>
<script id="productSwiperTpl" type="text/html">
	{{# for(var i = 0, len = d.length; i < len; i++){ }}
		<div class="swiper-slide">
			<img src="{{ d[i].url }}"/>
		</div>
	{{# } }}
</script>
<script id="productCartBoxTpl" type="text/html">
	<dl>
		<dt class="clearfix">购物车<div id="shopProductCartDel">清空</div></dt>
		{{#
			var packCharge = 0;
			for(var i in d){
				packCharge += d[i].productPackCharge*d[i].count;
		}}
			<dd class="clearfix cartDD" data-unit="{{ d[i].unit }}" data-product_id="{{ d[i].productId }}" data-packing_charge="{{ d[i].productPackCharge }}" data-product_price="{{ d[i].productPrice }}" data-product_name="{{ d[i].productName }}" data-stock="{{ d[i].productStock }}" data-max_num="{{ d[i].maxNum }}"  data-min_num="{{ d[i].minNum }}" data-o_price="{{ d[i].oldPrice }}" data-is_seckill="{{ d[i].isSeckill }}" data-limit_type="{{ d[i].limit_type }}">
				<div class="cartLeft {{# if(d[i].productParam.length > 0){ }}hasSpec{{# } }}">
					<div class="name">{{ d[i].productName }}</div>
					{{# if(d[i].productParam.length > 0){ }}
						{{# 
							var tmpParam = [];
							for(var j in d[i].productParam){
								if(d[i].productParam[j].type == 'spec'){
									tmpParam.push(d[i].productParam[j].name);
								}else{
									for(var k in d[i].productParam[j].data){
										tmpParam.push(d[i].productParam[j].data[k].name);
									}
								}
							}
							var tmpParamStr = tmpParam.join(' ');
						}}
						<div class="spec" data-product_id="{{ i }}">{{ tmpParamStr }}</div>
					{{# } }}
				</div>
				<div class="cartRight">
					<div class="product_btn plus cart"></div>
					<div class="product_btn number cart productNum-{{ i }}">{{ d[i].count }}</div>
					<div class="product_btn min cart"></div>
					<div class="price">￥{{ d[i].productPrice }}</div>
				</div>
			</dd>
		{{# 
			}
			if(packCharge > 0){
		}}
			<dd>{{ nowShop.store.pack_alias }}&nbsp;<font color="red">￥<span id="packChargeCount">{{ packCharge }}</span></font></dd>
		{{#		
			}
		}}
        <dd id="spell_tip"><a href="javasript:void(0);">商品如需要分开打包，请使用多人点单</a></dd>
	</dl>
</script>
<script id="shopReplyTpl" type="text/html">
	{{# for(var i = 0, len = d.length; i < len; i++){ }}
		<dd>
			<div class="avatar">
				<img src="{{# if(d[i].avatar!= ''){}}{{ d[i].avatar }}{{# }else{ }}/static/images/portrait.jpg{{# } }}"/>
			</div>
			<div class="right">
				<div class="nickname">{{ d[i].nickname }}<div class="time">{{ d[i].add_time_hi }}</div></div>
				<div class="star">
					店铺&nbsp;&nbsp;{{# for(var j=1;j<=5;j++){ }}{{# if(d[i].score >= j){ }}<i class="full"></i>{{# }else{ }}<i></i>{{# } }}{{# } }}{{# if (d[i].deliver_score > 0) { }}配送{{ d[i].deliver_score }}星{{# } }}
				</div>
				<div class="content">{{ d[i].comment }}</div>
				{{# if(d[i].goods){ }}
					{{# var tmpGoods = d[i].goods; }}
					<div class="recommend clearfix">
						{{# for(var k in tmpGoods){ }}
							<div>{{ tmpGoods[k] }}</div>
						{{# } }}
					</div>
				{{# } }}
				{{# if(d[i].merchant_reply_time != '0'){ }}
					<div class="reply">
						<div class="title">店铺回复:<div class="time">{{ d[i].merchant_reply_time_hi }}</div></div>
						<div class="reply_content">{{ d[i].merchant_reply_content }}</div>
					</div>
				{{# } }}
			</div>
		</dd>
	{{# } }}
</script>
        <script src="<?php echo ($static_public); ?>js/jquery.qrcode.min.js"></script>
<script src="<?php echo ($static_path); ?>layer/layer.m.js"></script>
<div id="enter_im_div" style="-webkit-transition:opacity 200ms ease; transition:opacity 200ms ease;opacity:1;display:none;cursor:move;z-index:10000;width:94px;">
	<a id="enter_im" data-url="<?php echo ($kf_url); ?>">
	<div id="to_user_list">
	<div id="to_user_list_icon_div" class="rel left">
	<em class="to_user_list_icon_em_a abs">&nbsp;</em>
	<em class="to_user_list_icon_em_b abs">&nbsp;</em>
	<em class="to_user_list_icon_em_c abs">&nbsp;</em>
	<em class="to_user_list_icon_em_d abs">&nbsp;</em>
	<em id="to_user_list_icon_em_num" class="hide abs">0</em>
	</div>
	<p id="to_user_list_txt" class="left" style="font-size:12px">联系客服</p>
	</div>
	</a>
</div>
<script type="text/javascript">
	$(function(){
		var mousex = 0, mousey = 0;
		var divLeft = 0, divTop = 0, left = 0, top = 0;
		document.getElementById("enter_im_div").addEventListener('touchstart', function(e){
			e.preventDefault();
			var offset = $(this).offset();
			divLeft = parseInt(offset.left,10);
			divTop = parseInt(offset.top,10);
			mousey = e.touches[0].pageY;
			mousex = e.touches[0].pageX;
			return false;
		});
		document.getElementById("enter_im_div").addEventListener('touchmove', function(event){
			event.preventDefault();
			left = event.touches[0].pageX-(mousex-divLeft);
			top = event.touches[0].pageY-(mousey-divTop)-$(window).scrollTop();
			if(top < 1){
				top = 1;
			}
			if(top > $(window).height()-(50+$(this).height())){
				top = $(window).height()-(50+$(this).height());
			}
			if(left + $(this).width() > $(window).width()-5){
				left = $(window).width()-$(this).width()-5;
			}
			if(left < 1){
				left = 1;
			}
			$(this).css({'top':top + 'px', 'left':left + 'px', 'position':'fixed'});
			return false;
		});
		document.getElementById("enter_im_div").addEventListener('touchend', function(event){
			if ((divLeft == left && divTop == top) || (top == 0 && left == 0)) {
				var url = $('#enter_im').attr('data-url');
				if (url == '' || url == null) {
					alert('商家暂时还没有设置客服');
				} else {
					location.href=$('#enter_im').attr('data-url');
				}
			}
			return false;
		});

		$('#enter_im_div').click(function(){
			var url = $('#enter_im').attr('data-url');
			if (url == '' || url == null) {
				alert('商家暂时还没有设置客服');
			} else {
				location.href=$('#enter_im').attr('data-url');
			}
		});
	});
</script>

		<script type="text/javascript">
			window.shareData = {
				"moduleName":"Shop",
				"moduleID":"0",
				"imgUrl": "<?php if($config['wechat_share_img']): echo ($config["wechat_share_img"]); else: echo ($config["site_logo"]); endif; ?>", 
				"sendFriendLink": "<?php echo ($config["site_url"]); echo U('Shop/index');?>",
				"tTitle": "<?php echo (($config["shop_alias_name"])?($config["shop_alias_name"]):"快店"); ?> - <?php echo ($config["site_name"]); ?>",
				"tContent": "<?php echo ($config["seo_description"]); ?>"
			};
		</script>
		<?php echo ($shareScript); ?>
	</body>
</html>