var nowPage='';
var window_width = $(window).width();
var window_height = $(window).height();
var categoryList=null,sortList=null,typeList=null,choosePage='list';
$(function(){
	FastClick.attach(document.body);
	
	$('body').width(window_width);
	$('body,.pageDiv').css({width:window_width,'min-height':window_height});
	
	hash_handle();
	
	$(window).bind('hashchange',function(){
		hash_handle();
	});
	
	$(document).on('click','#shopMerchantDescBox .link-url',function(){
		if(motify.checkLifeApp() && motify.checkIos()){
			$('body').append('<iframe src="pigcmso2o://hideWebViewHeader/true" style="display:none;"></iframe>');
		}
	});
	
	$(document).on('click','.hasMore',function(){
		$(this).toggleClass('showMore');
		return false;
	});
	
	/*页面点击事件*/
	$(document).on('click','.page-link',function(){
		redirectPage($(this).attr('data-url'),$(this).attr('data-url-type'));
		return false;
	});

	$(document).on('click','.storelive',function(){
		$('.video').show();
		return false;
	});
	$(document).on('click','.bg_style',function(){
		$('.video').hide();
		return false;
	});
	
	$(window).resize(function(){
		if($(window).width() != window_width){
			location.reload();
		}
	});
	//changeTitle('快店列表');
});

//webview改变窗口大小调用方法
function changeWebviewWindow(){
	window_width = $(window).width();
	window_height = $(window).height();
	if(nowPage == 'shop'){
		$('#shopContentBar').height(window_height-88);
		$('#shopContentBar>div').css({width:window_width});
		
		$('#shopContentBar #shopProductBox').css('left','0px');
		$('#shopContentBar #shopReplyBox').css('left',window_width+'px');
		$('#shopContentBar #shopMerchantBox').css('left',window_width*2+'px');
		
		$('#shopProductLeftBar,#shopProductRightBar,#shopProductBottomBar').css('height',window_height-88-50);
		$('#shopMerchantBox,#shopReplyBox').css({height:window_height-88,'overflow-y':'auto'});
		$('#shopProductRightBar').width(window_width-100);
	}
}

function redirectPage(url,type){
	var animateCss = {},animateAfterCss = {},nowPageCss = {},orderPage = 1;
	if(!type){
		type = 'openRightWindow';
	}
	switch(type){
		case 'openRightWindow':
			animateCss = {'left':'-'+window_width+'px'};
			animateAfterCss = {'left':'0px'};
			nowPageCss = {'left':window_width+'px','display':'block'};
			break;
		case 'openLeftWindow':
			animateCss = {'left':window_width+'px'};
			animateAfterCss = {'left':'0px'};
			nowPageCss = {'left':'-'+window_width+'px','display':'block'};
			orderPage = 2;
			break;
		case 'openRightFloatWindow':
			animateAfterCss = {'left':'0px'};
			nowPageCss = {'left':window_width+'px','display':'block','z-index':'9001','height':$('.nowPage').height()};
			orderPage = 3;
			break;
		case 'openLeftFloatWindow':
			animateAfterCss = {'left':window_width+'px'};
			nowPageCss = {'left':'0px','display':'block'};
			orderPage = 4;
			break;
	}
	
	var locationHash = url.replace("#","");
	var locationHashParam = locationHash.split('-');
	var locationHashItem = locationHashParam[0];
	nowPage = locationHashItem;
	var loadPage = '';
	switch(locationHashItem){
		case 'shop':
			loadPage = 'pageShop';
			break;
		case 'cat':
			loadPage = 'pageCat';
			break;
		case 'address':
			loadPage = 'pageAddress';
			break;
		case 'shopSearch':
			loadPage = 'pageShopSearch';
			break;
		case 'map':
			loadPage = 'pageMap';
			break;
		default:
			nowPage = 'list';
			loadPage = 'pageList';
	}
	$('#'+loadPage).css(nowPageCss);
	if(orderPage == 1){
		$('.pageDiv.nowPage').animate(animateCss,200);
		$('#'+loadPage).animate(animateAfterCss,200,function(){
			location.hash = locationHash;
			$('#'+loadPage).addClass('nowPage').css('z-index','0').siblings('.pageDiv').removeClass('nowPage').css({'left':'0px','display':'none','z-index':'0'});
		});
	}else if(orderPage == 3){
		$('#'+loadPage).animate(animateAfterCss,300,function(){
            if (loadPage == 'pageShop') {
                location.href = "wap.php?g=Wap&c=Shop&a=index#" + locationHash;
            } else {
                location.hash = locationHash;
            }
			$('#'+loadPage).addClass('nowPage').css({'z-index':'0','height':'auto'}).siblings('.pageDiv').removeClass('nowPage').css({'left':'0px','display':'none','z-index':'0'});
		});
	}else if(orderPage == 4){
		$('.pageDiv.nowPage').css({'left':'0px','z-index':'1','height':$('#'+loadPage).height()});
		$('.pageDiv.nowPage').animate(animateAfterCss,300,function(){
			location.hash = locationHash;
			$('#'+loadPage).addClass('nowPage').css({'z-index':'0','height':'auto'}).siblings('.pageDiv').removeClass('nowPage').css({'left':'0px','display':'none','z-index':'0'});
		});
	}else{
		$('#'+loadPage).animate(animateAfterCss,200);
		$('.pageDiv.nowPage').animate(animateCss,200,function(){
			location.hash = locationHash;
			$('#'+loadPage).addClass('nowPage').css('z-index','0').siblings('.pageDiv').removeClass('nowPage').css({'left':'0px','display':'none','z-index':'0'});
		});
	}
}

function resetBodyHeight(){
	// console.log($('.nowPage'));
	// $('body').height($('.nowPage').height());
}

function hash_handle(){
	
	$('#shopDetailPage,#shopContentBar,#shopBanner').hide();
	$('#shopTitle').empty();
	$('body').css('overflow-y','auto');
	$('#shopDetailPage,#pageCat').removeClass('sliderLeft');
	
	var locationHash = location.hash.replace("#","");
	var locationHashParam = locationHash.split('-');
	var locationHashItem = locationHashParam[0];
	if(locationHashItem != 'shop' && locationHashItem != 'good'){
		changeWechatShare('plat');
	}
	switch(locationHashItem){
		case 'shop':
			if(locationHashParam.length == 1 || isNaN(parseInt(locationHashParam[1])) || parseInt(locationHashParam[1]) == 0){
				location.hash = 'list';
			}else{
				showShop(locationHashParam[1]);
			}
			break;
		case 'cat':
			var tmpParam = locationHashParam[1];
			tmpCatName = tmpParam.split('&');
			showCategory(tmpCatName[0]);
			break;
		case 'address':
			showAddress();
			break;
		case 'shopSearch':
			showShopSearch();
			break;
		case 'map':
			showMap(locationHashParam[1],locationHashParam[2],locationHashParam[3],locationHashParam[4],locationHashParam[5]);
			break;
		case 'good':
			showGood(locationHashParam[1],locationHashParam[2]);
			break;
		default:
			showList();
	}
	if(motify.checkLifeApp() && motify.getLifeAppVersion() >= 50 && motify.getLifeAppVersion() < 70 && motify.checkIos()){
		$('body').append('<iframe src="pigcmso2o://pageLoaded" style="display:none;"></iframe>');
	}
} 

//显示分类
var isShowCat = false,comeInShop = false,isCatListShow=false;
function showCategory(tmpCatUrl){
	if(comeInShop == false){
		pageLoadTips();
	}
	$('#pageCat').addClass('nowPage '+((nowPage=='' || nowPage=='list') ? 'sliderLeft' : '')).show().siblings('.pageDiv').removeClass('nowPage').hide();
	if(nowPage=='' || nowPage=='list'){
		setTimeout(function(){
			$('#pageCat').removeClass('sliderLeft').show();
		},600);
	}
	nowPage = 'cat';
	close_dropdown();
	
	if(comeInShop == false){
		$('#listNavBox').after('<div id="listNavBoxPlace"></div>');
		$('#pageCatNav')[0].appendChild($('#listNavBox')[0]);
	}
	choosePage = 'cat';
	
	if(isShowCat == false){
		$('#catBackBtn').click(function(){
			goBackPage();
		});
		$(document).on('click','#pageCat #storeList dd',function(){
			comeInShop = true;
		});
		/*防止重复初始化JS*/
		if(motify.checkIos()){
			$('body').on('touchmove',function(){
				if(isShowShade == false){
					scrollListEvent('ios');
				}
			});
			$(window).scroll(function(){
				$('body').trigger('touchmove');
			});
		}else{
			$(window).scroll(function(){
				scrollListEvent('android');
			});
		}
		function scrollListEvent(phoneType){	
			if(nowPage == 'cat'){
				if(isShowShade == true){
					close_dropdown();
					return false;
				}
				if(isCatListShow == false && catHasMorePage == true && $(document).scrollTop() >= $(document).height() - $(window).height() - 50){
					//showCatShopList();
				}
			}
		}
		
		if(user_long == '0' || user_lat == '0'){	
			if(motify.checkLifeApp() && motify.getLifeAppVersion() >= 50 && (motify.checkIos() || motify.checkAndroid())){
				if(motify.checkAndroid()){
					var locations = window.lifepasslogin.getLocation(false);
					var locationArr = locations.split(',');
					user_long = $.trim(locationArr[0]);
					user_lat = $.trim(locationArr[1]);
				}else{
					$('body').append('<iframe src="pigcmso2o://getLocation/false" style="display:none;"></iframe>');
				}	
			}else if($.cookie('userLocationLong') && $.cookie('userLocationLat')){
				user_long = $.cookie('userLocationLong');
				user_lat = $.cookie('userLocationLat');
			}else{
				user_long = last_user_long;
				user_lat = last_user_lat;
			}
		}
		
		isShowCat = true;
	}
	
	cat_url = tmpCatUrl ? tmpCatUrl : 'all';
	if(categoryList == null || sortList == null || typeList == null){
		$.getJSON(ajax_url_root+'ajax_category',function(result){
			/*可选分类*/
			if(result.category_list){
				categoryList = result.category_list;
			}
			/*可选排序*/
			if(result.sort_list){
				sortList = result.sort_list;
				sort_url = sortList[0].sort_url;
			}
			/*可选类别*/
			if(result.type_list){
				typeList = result.type_list;
				type_url = typeList[0].type_url;
			}
			
			laytpl($('#listCategoryListTpl').html()).render(categoryList, function(html){
				$('#dropdown_scroller .category-wrapper ul').html(html);
			});
			laytpl($('#listSortListTpl').html()).render(sortList, function(html){
				$('#dropdown_scroller .sort-wrapper ul').html(html);
			});
			laytpl($('#listTypeListTpl').html()).render(typeList, function(html){
				$('#dropdown_scroller .type-wrapper ul').html(html);
			});
			
			
			var tmpCatDom = $('#listNavBox .category-wrapper .listCat-'+cat_url);
			if(tmpCatDom.size() == 0){
				tmpCatDom = $('#listNavBox .category-wrapper .listCat-all');
			}
			if(tmpCatDom.size() == 1){
				list_location($('#listNavBox .category-wrapper .listCat-'+cat_url));
			}else if(tmpCatDom.size() == 2){
				$('#listNavBox .category-wrapper .listCat-'+cat_url+':eq(0)').trigger('click');
				list_location($('#listNavBox .category-wrapper .listCat-'+cat_url+':eq(1)'));
			}else{
				alert(cat_url+',此分类标记被使用次数过多，请在后台进行更改。');
			}
		});
	}else{
		if(comeInShop == false){
			$('.dropdown-toggle.sort span').html(categoryList[0].cat_name);
			laytpl($('#listCategoryListTpl').html()).render(categoryList, function(html){
				$('#dropdown_scroller .category-wrapper ul').html(html);
			});
			
			sort_url = sortList[0].sort_url;
			$('.dropdown-toggle.sort span').html(sortList[0].name);
			laytpl($('#listSortListTpl').html()).render(sortList, function(html){
				$('#dropdown_scroller .sort-wrapper ul').html(html);
			});
			
			type_url = typeList[0].type_url;
			$('.dropdown-toggle.type span').html(typeList[0].name);
			laytpl($('#listTypeListTpl').html()).render(typeList, function(html){
				$('#dropdown_scroller .type-wrapper ul').html(html);
			});
				
			var tmpCatDom = $('#listNavBox .category-wrapper .listCat-'+cat_url);
			if(tmpCatDom.size() == 0){
				tmpCatDom = $('#listNavBox .category-wrapper .listCat-all');
			}
			if(tmpCatDom.size() == 1){
				list_location($('#listNavBox .category-wrapper .listCat-'+cat_url));
			}else if(tmpCatDom.size() == 2){
				$('#listNavBox .category-wrapper .listCat-'+cat_url+':eq(0)').trigger('click');
				list_location($('#listNavBox .category-wrapper .listCat-'+cat_url+':eq(1)'));
			}
		}else{
			comeInShop = false;
		}
	}
}

//显示地图
var hasLoadMap=false;
function showMap(shopId,lng,lat,shopName,address){
	pageLoadTips();
	nowPage = 'map';
	$('#pageMap').addClass('nowPage').show().siblings('.pageDiv').removeClass('nowPage').hide();
	if(hasLoadMap == false){
		$('#shopDetailMapBiz').height(window_height-60);
		$('#shopDetailMapClose').click(function(){
			$(this).hide();
			goBackPage();
		});
		$('#shopDetailMapAddressGo').click(function(){
			if(motify.checkLifeApp() && motify.getLifeAppVersion() >= 50){
				window.lifepasslogin.startToNavigation(lng,lat,shopName);
			}else if(typeof(wxSdkLoad) != "undefined"){
				pageLoadTips();
				$.getJSON(baiduToGcj02Url+"&baidu_lat="+lat+"&baidu_lng="+lng,function(result){
					pageLoadHides();
					if(result['status'] == 1){
						wx.ready(function (){
							wx.openLocation({
								latitude: result['info']['lat'],
								longitude: result['info']['lng'],
								name: decodeURIComponent(shopName), // 位置名
								address: decodeURIComponent(address), // 地址详情说明
								scale: 18, // 地图缩放级别,整形值,范围从1~28。默认为最大
								infoUrl: window.location.href // 在查看位置界面底部显示的超链接,可点击跳转
							});
						});
					}else{
						window.location.href = get_route_url+'&store_id='+shopId;
					}
				})
			}else{
				window.location.href = get_route_url+'&store_id='+shopId;
			}
		});
		

		
		hasLoadMap = true;
	}
	$('#shopDetailMapClose').show();
	$('#shopDetailMapAddress').html(decodeURIComponent(address));
	
	var map = new BMap.Map("shopDetailMapBiz",{enableMapClick:false});
	map.centerAndZoom(new BMap.Point(lng,lat), 16);
	
	//map.addControl(new BMap.ZoomControl());  //添加地图缩放控件
	var marker1 = new BMap.Marker(new BMap.Point(lng,lat));  //创建标注
	map.addOverlay(marker1);                 // 将标注添加到地图中
	//创建信息窗口
	var infoWindow1 = new BMap.InfoWindow(decodeURIComponent(shopName));
	marker1.openInfoWindow(infoWindow1);
	marker1.addEventListener("click", function(){this.openInfoWindow(infoWindow1);});


	pageLoadHides();
}

var listShopList=[],listNavBarTop=0,isShowShade = false,mustShowShopList=false,isListShow = false,isFirstShowList = true;
//显示列表
function showList(){
	pageLoadTips();
	// if(nowPage == 'shop' || nowPage == 'address' || nowPage == 'shopSearch'){
		// redirectPage('list','openLeftFloatWindow');
	// }else{
		$('#pageList').addClass('nowPage').show().siblings('.pageDiv').removeClass('nowPage').hide();
	// }
	nowPage = 'list';
	if($('#listNavBoxPlace').size() > 0){
		$('#pageList')[0].insertBefore($('#listNavBox')[0],$('#listNavBoxPlace')[0]);
		close_dropdown();
		$('#listNavBoxPlace').remove();
		choosePage = 'list';
	}
	/*强制去除悬浮事件*/
	$('#listNavBox').removeClass('fixed');
	$('#listNavPlaceHolderBox').hide();
	
	resetBodyHeight();
	
	/*滚动条事件*/
	if(isFirstShowList == true){
		var listHeaderColor = $('#listHeader').css('background-color').match(/\(.*\)/);
		var listHeaderColor = listHeaderColor[0].replace('(','').replace(')','');
		$('#listHeader').css('background-color','rgba('+listHeaderColor+',0)');
		
		listNavBarTop = $('#listNavBox').offset().top - 50;
		/*防止重复初始化JS*/
		if(motify.checkIos()){
			$('body').on('touchmove',function(){
				if(isShowShade == false){
					scrollListEvent('ios');
				}
			});
			$(window).scroll(function(){
				$('body').trigger('touchmove');
			});
		}else{
			$(window).scroll(function(){
				scrollListEvent('android');
			});
		}
		function scrollListEvent(phoneType){	
			if(nowPage == 'list'){
				if(isShowShade == true){
					close_dropdown();
					return false;
				}
				var scrollTop = $(window).scrollTop();
				if(scrollTop > 50){
					$('#listHeader').removeClass('roundBg');
				}else{
					$('#listHeader').addClass('roundBg');
				}
				if(scrollTop > 150){
					$('#listHeader').css('background-color','rgb('+listHeaderColor+')');
				}else{
					$('#listHeader').css('background-color','rgba('+listHeaderColor+','+(scrollTop/100)+')');
				}
				if(scrollTop >= listNavBarTop){
					$('#listNavBox').addClass('fixed');
					$('#listNavPlaceHolderBox').show();
				}else{
					$('#listNavBox').removeClass('fixed');
					$('#listNavPlaceHolderBox').hide();
				}
				
				if(isListShow == false && listHasMorePage == true && $(document).scrollTop() >= $(document).height() - $(window).height() - 50){
					showShopList();
				}
			}
		}
		if(motify.checkLifeApp() && motify.getLifeAppVersion() >= 50 && (motify.checkIos() || motify.checkAndroid())){
			if(motify.checkAndroid()){
				var locations = window.lifepasslogin.getLocation(false);
				var locationArr = locations.split(',');
				user_long = $.trim(locationArr[0]);
				user_lat = $.trim(locationArr[1]);
				$('#locationText').html($.trim(locationArr[2]));
				pageLoadHides();
				showShopList(true);
				$('#listBackBtn').removeClass('hide').click(function(){
					window.lifepasslogin.webViewGoBack();
				});
			}else{
				$('body').append('<iframe src="pigcmso2o://getLocation/false" style="display:none;"></iframe>');
				$('#listBackBtn').removeClass('hide').click(function(){
					$('body').append('<iframe src="pigcmso2o://webViewGoBack" style="display:none;"></iframe>'); 
				});
			}
			
			
		}else if($.cookie('userLocationName') && $.cookie('userLocationLong') && $.cookie('userLocationLat')){
			user_long = $.cookie('userLocationLong');
			user_lat = $.cookie('userLocationLat');
			$('#locationText').html($.cookie('userLocationName'));
			pageLoadHides();
			showShopList(true);
		}else{
			getUserLocation({useHistory:false,okFunction:'getListGeocoderbefore',okFunctionParam:[true],errorFunction:'getListGeocoderError',errorFunctionParam:[false]});
		}
		showListData();
		isFirstShowList = false;
	}else{
		if(user_long == '0'){
			getListGeocoderError();
		}else if(mustShowShopList == true){
			mustShowShopList = false;
			showShopList(true);
		}
		pageLoadHides();
	}
}

function callbackLocation(locations){
	var locationArr = locations.split(',');
	user_long = $.trim(locationArr[0]);
	user_lat = $.trim(locationArr[1]);
	$('#locationText').html($.trim(locationArr[2]));
	pageLoadHides();
	showShopList(true);
}

function getListGeocoderError(){
	pageLoadHides();
	var addressTipLayer = layer.open({
		content: '未获取到您的位置，请先确认收货地址！',
		btn: ['OK'],
		end: function(){
			$('#pageAddressHeader').addClass('mustHideBack');
			layer.close(addressTipLayer);
			location.hash = 'address';
		}
	});
}
/*店铺搜索*/
var isShowShopSearch = false,loadShopSearchTimer=null,isSearchListShow=true;
function showShopSearch(){
	pageLoadTips({showBg:false});
	nowPage = 'shopSearch';
	$('#pageShopSearch').addClass('nowPage').show().siblings('.pageDiv').removeClass('nowPage').hide();
	
	if(isShowShopSearch == false){
		$('#pageShopSearchTxt').width(window_width-124-32);
		
		$('#pageShopSearchBackBtn').click(function(){
			goBackPage();
		});
		
		$("#pageShopSearchTxt").bind('input', function(e){
			var address = $.trim($(this).val());
			if(address.length > 0){
				$('#pageShopSearchDel').show();
				$('#pageShopSearchBtn').addClass('so');
			}else{
				$('#pageShopSearchDel').hide();
				$('#pageShopSearchBtn').removeClass('so');
			}
		});
		$('#pageShopSearchBtn').click(function(){
			var address = $.trim($("#pageShopSearchTxt").val());
			if(address == ''){
				motify.log('请您输入店铺名称');
			}else{
				isSearchListShow = false;
				if(user_long == '0'){
					getUserLocation({okFunction:'getListGeocoderbefore',okFunctionParam:[true],errorFunction:'getListGeocoderError',errorFunctionParam:[false]});
				}else{
					showShopSearchList(true);
				}
			}
		});
		
		$('#pageShopSearchDel').click(function(){
			$('#pageShopSearchTxt').val('').trigger('input');
		});
		
		/*防止重复初始化JS*/
		if(motify.checkIos()){
			$('body').on('touchmove',function(){
				if(isShowShade == false){
					scrollSearchListEvent('ios');
				}
			});
			$(window).scroll(function(){
				$('body').trigger('touchmove');
			});
		}else{
			$(window).scroll(function(){
				scrollSearchListEvent('android');
			});
		}
		function scrollSearchListEvent(phoneType){	
			if(nowPage == 'shopSearch'){				
				if(isSearchListShow == false && shopSearchListHasMorePage == true && $(document).scrollTop() >= $(document).height() - $(window).height() - 50){
					showShopSearchList();
				}
			}
		}
		
		isShowShopSearch = true;
	}
	
	pageLoadHides();
}

/*收货地址*/
var hasLoadAddress=false,loadAddressTimer=null,addressGeocoder = false;
function showAddress(){
	pageLoadTips({showBg:false});
	
	nowPage = 'address';
	$('#pageAddress').addClass('nowPage').show().siblings('.pageDiv').removeClass('nowPage').hide();
	
	if(user_long == "0" || $('#pageAddressHeader').hasClass('mustHideBack')){
		$('#pageAddressHeader').addClass('hideBack');
		$('#pageAddressSearchTxt').width(window_width-74-32-6);
		$('#pageAddressHeader').removeClass('mustHideBack');
	}else{
		$('#pageAddressHeader').removeClass('hideBack');
		$('#pageAddressSearchTxt').width(window_width-124-32);
	}
	addressGeocoder = true;
	$('#pageAddressLocationList dl').html('<div style="height:40px;line-height:40px;background:white;padding-left:12px;">正在定位</div>');
	getUserLocation({'useHistory':false,okFunction:'getListGeocoderbefore',okFunctionParam:[true],errorFunction:'getAddressGeocoderError',errorFunctionParam:[false]});
	if(hasLoadAddress == false){
		$('#pageAddressBackBtn').click(function(){
			$('#pageAddressSearchDel').trigger('click');
			goBackPage();
		});
		
		
		
		$("#pageAddressSearchTxt").bind('input', function(e){
			var address = $.trim($(this).val());
			if(address.length > 0){
				$('#pageAddressSearchDel,#pageAddressSearchContent').show();
				$('#pageAddressContent').hide();
				
				clearTimeout(loadAddressTimer);
				loadAddressTimer = setTimeout("searchAddress('"+address+"')", 500);
				$('#pageAddressSearchBtn').addClass('so');
			}else{
				$('#pageAddressSearchDel').hide();
				$('#pageAddressSearchBtn').removeClass('so');
				
				$('#pageAddressContent').show();
				$('#pageAddressSearchContent').hide();
			}
		});
		$('#pageAddressSearchBtn').click(function(){
			var address = $.trim($("#pageAddressSearchTxt").val());
			searchAddress(address);
		});
		
		$('#pageAddressSearchDel').click(function(){
			$('#pageAddressSearchTxt').val('').trigger('input');
			/* $('#pageAddressSearchDel').hide(); */
		});
		
		$(document).on('click','.searchAddressList dd',function(){
			$('#pageAddressSearchDel').trigger('click');
			user_long = $(this).data('long');
			user_lat = $(this).data('lat');
			$('#locationText').html($(this).data('name'));
			
			$.cookie('userLocation',user_long+','+user_lat,{expires:700,path:'/'});
			$.cookie('userLocationLong',user_long,{expires:700,path:'/'});
			$.cookie('userLocationLat',user_lat,{expires:700,path:'/'});
			$.cookie('userLocationName',$(this).data('name'),{expires:700,path:'/'});
			if($(this).data('id')){
				$.cookie('userLocationId',$(this).data('id'),{expires:700,path:'/'});
			}
					
			mustShowShopList = true;
			location.hash = 'list';
			return false;
		});
		
		$.getJSON(ajax_url_root+'ajax_address',function(result){
			if(result.length > 0){
				laytpl($('#listAddressListTpl').html()).render(result, function(html){
					$('#pageAddressUserList .content').html(html);
				});
			}else{
				$('#pageAddressUserList').hide();
			}
			pageLoadHides();
		});
		
		hasLoadAddress = true;
	}else{
		pageLoadHides();
	}
}

function getAddressGeocoderError(){
	$('#pageAddressLocationList dl').html('<div style="height:40px;line-height:40px;background:white;padding-left:12px;">未获取到定位</div>');
}

function searchAddress(address){
	$.get(ajax_map_url, {query:address}, function(data){
		if(data.status == 1){
			$('#pageAddressSearchContent dl').empty();
			var result = data.result;
			var addressHtml = '';
			for(var i=0;i<result.length;i++){
				if(result[i]['long']){
					addressHtml += '<dd data-long="'+result[i]['long']+'" data-lat="'+result[i]['lat']+'" data-name="'+result[i]['name']+'">';
					addressHtml += '<div class="name">'+result[i]['name']+'</div>';
					addressHtml += '<div class="desc">'+result[i]['address']+'</div>';
					addressHtml += '</dd>';
				}
			}
			$('#pageAddressSearchContent dl').html(addressHtml);
		}
	});
}

var isShowGood = false;
function showGood(shop_id,product_id){
	if(nowPage != 'shop'){
		location.hash = 'shop-'+shop_id;
		return false;
	}
	pageLoadTips();
	$('body').css('overflow','hidden');
	$('#shopDetailPage').height(window_height-50);
	
	if(nowShop.store.store_theme == '0'){
		$('#shopDetailPageImgbox').css({height:window_width*500/900,width:window_width});
	}else if(nowShop.store.store_theme == '1'){
		$('#shopDetailPageImgbox').css({height:window_width,width:window_width});
	}
	
	if(product_id == nowProduct.goods_id){
		$('#shopContentBar').show();
		$('#shopDetailPage').show().scrollTop(0).addClass('sliderLeft');	
		pageLoadHides();
	}else{
		$.getJSON(ajax_url_root+'ajax_goods',{goods_id:product_id},function(result){
			nowProduct = result;
			productPicList = [];
			for(var i in result.pic_arr){
				productPicList.push(result.pic_arr[i].url);
			}
			laytpl($('#productSwiperTpl').html()).render(result.pic_arr, function(html){
				$('#shopDetailPageImgbox .swiper-wrapper').removeAttr('style').html(html);
				if(productSwiper != null){
					productSwiper.reInit();
					productSwiper.swipeTo(0);
				}
				if(productSwiper == null && result.pic_arr.length > 1){
					productSwiper = $('#shopDetailPageImgbox').swiper({
						pagination:'#shopDetailPageImgbox .swiper-pagination-productImg',
						loop:true,
						grabCursor: true,
						paginationClickable: true,
						autoplay:3000,
						autoplayDisableOnInteraction:false,
						simulateTouch:false
					});
				}
			});
			$('#shopDetailPageTitle .title').html(result.name);
			$('#shopDetailPageTitle .desc').html('月售'+result.sell_count+'份 好评'+result.reply_count+'');
			$('#shopDetailPageFormat').empty();
			if(result.des != ''){
				$('#shopDetailPageContent .content').html(result.des).show();
				$('#shopDetailPageContent').show();
			}else if(nowShop.store.delivery){
				$('#shopDetailPageContent .content').html('温馨提示：图片仅供参考，请以实物为准；高峰时段及恶劣天气，请提前下单。').show();
				$('#shopDetailPageContent').show();
			}else{
				$('#shopDetailPageContent').hide();
			}
			$('#shopDetailPagePrice').html('￥'+result.price+(result.extra_pay_price>0?'+'+result.extra_pay_price+result.extra_pay_price_name:'')+'<span class="unit"><em>/ </em>'+result.unit+'</span>'+(result.stock_num != -1 ? '<span data-stock="'+result.stock_num+'">还剩'+result.stock_num+result.unit+'</span>' : '<span data-stock="-1"></span'));
			if(result.properties_list){
				laytpl($('#productPropertiesTpl').html()).render(result.properties_list, function(html){
					$('#shopDetailPageLabelBox').html(html);
				});
				$('#shopDetailPageLabel').show();
			}else{
				$('#shopDetailPageLabel').hide();
			}		
			if(result.spec_list){
				laytpl($('#productFormatTpl').html()).render(result.spec_list, function(html){
					$('#shopDetailPageFormat').html(html);
				});
			}
			$('#shopDetailPageNumber .number').addClass('productNum-'+result.goods_id);
			
			changeProductSpec();
			
			// shopDetailPageIscroll = new IScroll('#shopDetailPage', { probeType: 1,disableMouse:true,disablePointer:true,mouseWheel: false,scrollX: false, scrollY:true,click:false});
			$('#shopContentBar').show();
			$('#shopDetailPage').show().scrollTop(0).addClass('sliderLeft');
			pageLoadHides();
		});
	}
}


var nowShop = {},isShowShop = false,tmpDomObj={},flyer = $('<div class="shopCartFly"></div>'),shopDetailPageIscroll = null,nowProduct = {},firstMenuClick = false,productSwiper = null,productPicList = [];
function showShop(shopId){
	pageLoadTips({showBg:false});
	/* var mt_rand = parseInt(10*Math.random());
	var color = "";
	if(mt_rand < 3){
		color = '#59A95F';
	}else if(mt_rand < 5){
		color = '#A9AD34';
	}else if(mt_rand < 7){
		color = '#E05150';
	}else if(mt_rand < 8){
		color = '#E09132';
	}
	if(color){
		$('#shopHeader,#shopBanner').css({background:color});
	} */
	$(window).scrollTop(0);
	if(nowPage == 'map'){
		redirectPage('shop-'+shopId,'openLeftFloatWindow');
	}else{
		$('#pageShop').addClass('nowPage').show().siblings('.pageDiv').removeClass('nowPage').hide();
		$('#pageShop').css('min-height','');
		$('#pageShop').css('height',$(window).height());
		$('#shopPageShade').hide();
	}
	nowPage = 'shop';
	
	if(isShowShop == false){
		$('#shopContentBar').height(window_height-152);
		$('#shopContentBar>div').css({width:window_width});
		
		$('#shopContentBar #shopProductBox').css('left','0px');
		$('#shopContentBar #shopReplyBox').css('left',window_width+'px');
		$('#shopContentBar #shopMerchantBox').css('left',window_width*2+'px');
		
		$('#shopProductLeftBar,#shopProductRightBar,#shopProductBottomBar').css('height',window_height-152-50);
		$('#shopMerchantBox,#shopReplyBox').css({height:window_height-152,'overflow-y':'auto'});
		$('#shopProductRightBar').width(window_width-100);
		
		if(motify.checkIos()){
			$('#shopProductLeftBar,#shopProductRightBar,#shopProductBottomBar,#shopMerchantBox,#shopReplyBox').css({'-webkit-overflow-scrolling':'touch'});
		}
		
		$('#shopMenuBar li').click(function(){
			if(firstMenuClick == false){
				$('html,body').animate({scrollTop: $('#shopMenuBar').offset().top-50});
			}
			var tmpIndex = $(this).index();
			var tmpNav = $(this).data('nav');
			$(this).addClass('active').siblings().removeClass('active');
			pageLoadTips({showBg:false});
			$('#shopContentBar').animate({'margin-left':'-'+tmpIndex*window_width+'px'},function(){
				showShopContent(tmpNav);
			});
		});
		
		$('#shopCatBar .title,#shopPageCatShade').click(function(){
			if($('#shopCatBar .title').hasClass('show')){
				$('#shopCatBar .title').removeClass('show');
				$('#shopCatBar .content').hide();
				$('#shopPageCatShade').hide();
			}else{
				$('#shopCatBar .title').addClass('show');
				$('#shopCatBar .content').show();
				$('#shopPageCatShade').show();
			}
		});
		$(document).on('click','#shopCatBar .content li',function(){
			$(this).addClass('active').siblings().removeClass('active');
			$('#shopCatBar .title').removeClass('show');
			$('#shopCatBar .content').hide();
			$('#shopPageCatShade').hide();
			// alert('#shopProductBottomBar li.product_cat_'+$(this).data('cat_id'));
			var discount = parseFloat($(this).data('discount'));
			if (parseFloat($(this).data('discount')) > 0) {
				$('#shopCatBar .title').html($(this).data('name') + ' <span class="cat_discount">' + parseFloat($(this).data('discount')) + '折</span><span class="cat_discount bred">折扣不同享</span>');
			} else {
				$('#shopCatBar .title').html($(this).data('name'));
			}
//			$('#shopCatBar .title').html($(this).html());
			if($(this).data('cat_id') == '0'){
				$('#shopProductBottomBar li').show();
			}else{
				$('#shopProductBottomBar li').hide();
				$('#shopProductBottomBar li.product_cat_'+$(this).data('cat_id')).show();
			}
		});
		
		$('#pageShop #backBtn').click(function(){
			goBackPage();
		});
		$(document).on('click','#shopProductCartDel',function(){
			layer.open({
				content: '您确定要清空购物车吗？',
				btn: ['确认', '取消'],
				shadeClose: false,
				yes: function(){
					$('#shopProductRightBar .product_btn.min,#shopProductRightBar .product_btn.number,#shopProductBottomBar .product_btn.min,#shopProductBottomBar .product_btn.number').remove();
					$('#shopDetailPageBuy').show();
					$('#shopDetailPageNumber').hide();
					productCart = [];
					productCartNumber = 0;
					productCartMoney = 0;
					cartFunction('count');
					layer.closeAll();
					$('#shopProductCartShade').trigger('click');
				}, no: function(){
					
				}
			});
		});
		
		$('#shopPageShade').click(function(){
			$('html,body').animate({scrollTop: $('#shopMenuBar').css('display') == 'none' ? $('#shopCatBar').offset().top-50 : $('#shopMenuBar').offset().top-50});
			$('#shopPageShade').hide();
		});
		
		$('#shopBanner').click(function(){
			$('#shopMenuBar li.merchant').trigger('click');
			$('#shopPageShade').trigger('click');
		});
		
		$('#cartInfo').click(function(){
			if(!$(this).hasClass('isShow')){
				$(this).addClass('isShow');
				$('#shopProductCartShade').show();
				$('#shopProductCartBox').css('max-height',(window_height-50)/3*2+'px');
				console.log(productCart);
				laytpl($('#productCartBoxTpl').html()).render(productCart, function(html){
					$('#shopProductCartBox').html(html);
					$('body').css('overflow-y','hidden');
				});
			}else{
				$('#shopProductCartShade').trigger('click');
			}
			// $('#shopPageShade').trigger('click');
		});
		
		$('#shopProductCartShade').click(function(){
			$(this).hide();
			$('#shopProductCartBox').empty();
			$('#cartInfo').removeClass('isShow');
			$('body').css('overflow-y','auto');
		});
		
		$(document).on('click','#shopProductLeftBar dd',function(){
			$(this).addClass('active').siblings().removeClass('active');
			$('#shopProductRightBar').scrollTop($('#shopProductRightBar-'+$(this).data('cat_id')).offset().top-$('#shopProductRightBar').offset().top+$('#shopProductRightBar').scrollTop());
		});
		
		$('#shopDetailPageImgbox').click(function(){
			if(motify.checkWeixin()){
				wx.previewImage({
					current:productPicList[0],
					urls:productPicList
				});
			}
		});
		
		$(document).on('click','#shopProductRightBar li,#shopProductBottomBar li',function(event){
			location.hash = 'good-'+shopId+'-'+$(this).data('product_id');
		});
		
		$(document).on('click','#shopDetailPageFormat li',function(event){
			$(this).addClass('active').siblings('li').removeClass('active');
			changeProductSpec();
		});
		
		$(document).on('click','#shopDetailPageLabel li',function(event){
			var maxSize = $(this).closest('.row').data('num');
			if(maxSize == 1){
				$(this).addClass('active').siblings('li').removeClass('active');
			}else if(!$(this).hasClass('active')){
				var tmpActiveSize = $(this).closest('ul').find('.active').size();
				if(tmpActiveSize >= maxSize){
					motify.log($(this).closest('.row').data('label_name')+' 您最多能选择 '+maxSize+' 个');
				}else{
					/* if(tmpActiveSize == maxSize-1){
						motify.log('您最多能选择 '+maxSize+' 个，现在已经选择满了');
					} */
					$(this).addClass('active');
				}
			}else{
				$(this).removeClass('active');
			}
			changeProductSpec();
		});
		
		$(document).on('click','#shopDetailPageNumber .product_btn.plus,#shopDetailPageBuy',function(event){
			if(nowShop.store.is_close == 1){
				motify.log('店铺休息中');
				return false;
			}
			var intStock = parseInt($('#shopDetailPagePrice span').data('stock'));
			if(intStock != -1 && (intStock == 0 || intStock - parseInt($('#shopDetailPageNumber .number').html()) <= 0)){
				motify.log('没有库存了');
				return false;
			}
			tmpDomObj = $(this);
			if(!(motify.checkApp() && motify.checkAndroid())){
				flyer.fly({
					start: {
						left: event.pageX-10,
						top: event.pageY-120
					},
					end: {
						left: 20,
						top: window_height-50,
						width: 20,
						height: 20
					},
					onEnd:function(){
						cartFunction('plus',tmpDomObj,'productPage');
						flyer.remove();
					}
				});
			}else{
				cartFunction('plus',tmpDomObj,'productPage');
			}
			return false;
		});
		$(document).on('click','#shopDetailPageNumber .product_btn.min',function(event){
			tmpDomObj = $(this);
			cartFunction('min',tmpDomObj,'productPage');
			return false;
		});
		
		$('#shopDetailpageClose').click(function(){
			$('.cd-top').removeClass('cd-is-visible cd-fade-out');
			$('#shopDetailPage').removeClass('sliderLeft');
			$('body').css('overflow-y','auto');
			goBackPage();
		});
		
		$(document).on('click','#shopProductCartBox .product_btn.plus',function(event){
			if(nowShop.store.is_close == 1){
				motify.log('店铺休息中');
				return false;
			}
			tmpDomObj = $(this);
			cartFunction('plus',tmpDomObj,tmpDomObj.closest('dd'));
		});
		
		$(document).on('click','#shopProductRightBar .bgPlusBack',function(event){
			if(nowShop.store.is_close == 1){
				motify.log('店铺休息中');
				return false;
			}
			tmpDomObj = $(this);

			var intStock = parseInt(tmpDomObj.closest('li').data('stock'));
			if(intStock != -1 && (intStock == 0 || intStock - parseInt(tmpDomObj.siblings('.number').html()) <= 0)){
				motify.log('没有库存了');
				return false;
			}
			if(!(motify.checkApp() && motify.checkAndroid())){
				flyer.fly({
					start: {
						left: event.pageX-10,
						top: event.pageY-120
					},
					end: {
						left: 20,
						top: window_height-50,
						width: 20,
						height: 20
					},
					onEnd:function(){
						// alert(111122);
						cartFunction('plus',tmpDomObj,tmpDomObj.closest('li'));
						flyer.remove();
					}
				});
			}else{
				cartFunction('plus',tmpDomObj,tmpDomObj.closest('li'));
			}
			return false;
		});
		
		$(document).on('click','#shopProductRightBar .product_btn.plus,#shopProductBottomBar .product_btn.plus',function(event){
			// alert(1111);
			if(nowShop.store.is_close == 1){
				motify.log('店铺休息中');
				return false;
			}
			tmpDomObj = $(this);

			var intStock = parseInt(tmpDomObj.closest('li').data('stock'));
			if(intStock != -1 && (intStock == 0 || intStock - parseInt(tmpDomObj.siblings('.number').html()) <= 0)){
				motify.log('没有库存了');
				return false;
			}
			if(!(motify.checkApp() && motify.checkAndroid())){
				flyer.fly({
					start: {
						left: event.pageX-10,
						top: event.pageY-120
					},
					end: {
						left: 20,
						top: window_height-50,
						width: 20,
						height: 20
					},
					onEnd:function(){
						// alert(111122);
						cartFunction('plus',tmpDomObj,tmpDomObj.closest('li'));
						flyer.remove();
					}
				});
			}else{
				cartFunction('plus',tmpDomObj,tmpDomObj.closest('li'));
			}
			return false;
		});
		$(document).on('click','#shopProductRightBar .bgMinBack',function(event){
			tmpDomObj = $(this).siblings('.product_btn.min');
			cartFunction('min',tmpDomObj,tmpDomObj.hasClass('cart') ? tmpDomObj.closest('dd') : tmpDomObj.closest('li'));
			return false;
		});
		$(document).on('click','#shopProductRightBar .product_btn.min,#shopProductCartBox .product_btn.min',function(event){
			tmpDomObj = $(this);
			cartFunction('min',tmpDomObj,tmpDomObj.hasClass('cart') ? tmpDomObj.closest('dd') : tmpDomObj.closest('li'));
			return false;
		});
		
		$('#checkCart').click(function(){
			window.location.href = check_cart_url+'&store_id='+nowShop.store.id;
		});
		
		$('#shopReplyBox ul li').click(function(){
			if($(this).hasClass('active')){
				return false;
			}
			$(this).addClass('active').siblings().removeClass('active');
			
			$('#shopReplyBox dl').empty();
			$('#showMoreReply').hide();
			pageLoadTips({showBg:false});
			$.post(shopReplyUrl+nowShop.store.id,{tab:$(this).data('tab')},function(result){
				result = $.parseJSON(result);	
				if(result){
					laytpl($('#shopReplyTpl').html()).render(result.list, function(html){
						$('#shopReplyBox dl').html(html);
					});
				}
				$('#showMoreReply').data('page','2');
				if(result.total > result.now){
					$('#showMoreReply').show();
				}else{
					$('#showMoreReply').hide();
				}
				pageLoadHides();
			});
		});
		
		$('#showMoreReply').click(function(){
			pageLoadTips({showBg:false});
			var nowPage = parseInt($(this).data('page'));
			$.post(shopReplyUrl+nowShop.store.id,{tab:$('#shopReplyBox ul li.active').data('tab'),page:nowPage},function(result){
				result = $.parseJSON(result);	
				laytpl($('#shopReplyTpl').html()).render(result.list, function(html){
					$('#shopReplyBox dl').append(html);
				});

				$('#showMoreReply').data('page',(nowPage+1));
				
				if(result.total < result.now){
					$('#showMoreReply').show();
				}else{
					$('#showMoreReply').hide();
				}
				
				pageLoadHides();
			});
		});
		
		/*window滚动条*/
		if(motify.checkIos()){
			$('body').on('touchmove',function(){
				scrollShopEvent('ios');
			});
			$(window).scroll(function(){
				$('body').trigger('touchmove');
			});
		}else{
			$(window).scroll(function(){
				scrollShopEvent('android');
			});
		}
		function scrollShopEvent(phoneType){
			var scrollTop = $(window).scrollTop();
			if(nowPage == 'shop'){
				var shopMenuBarTop = $('#shopMenuBar').css('display') == 'none' ? $('#shopCatBar').offset().top : $('#shopMenuBar').offset().top;
				if(motify.checkLifeApp() && motify.getLifeAppVersion() >= 50){
					if(motify.checkIos()){
						// alert(window_height);
					}
				}
				if(scrollTop >= shopMenuBarTop-50){
					$('#shopPageShade').hide();
				}else{
					$('#shopPageShade').show();
				}
			}
		}
		/*Right滚动条*/
		/*if(motify.checkIos()){
			$('#shopProductRightBar').on('touchmove',function(){
				scrollProductEvent('ios');
			});
			$('#shopProductRightBar').scroll(function(){
				$('#shopProductRightBar').trigger('touchmove');
			});
		}else{
			$('#shopProductRightBar').scroll(function(){
				scrollProductEvent('android');
			});
		}
		function scrollProductEvent(phoneType){
			var scrollRightTop = $('#shopProductRightBar').scrollTop();
			$.each($('#shopProductRightBar dd'),function(i,item){
				if(scrollRightTop > $(item).offset().top-$('#shopProductRightBar').offset().top){
					$('#shopProductLeftBar-'+$(item).data('cat_id')).addClass('active').siblings().removeClass('active');
					// return false;
				}
			});
			$('#shopProductLeftBar').scrollTop($('#shopProductLeftBar .active').position().top);
		}*/
		isShowShop = true;
	}
	
	if(nowShop.store && shopId == nowShop.store.id){
		$('#shopTitle').html(nowShop.store.name);
		firstMenuClick = true;
		// $('#shopMenuBar .product').trigger('click');
		// showShopContent('product');
		pageLoadHides();
		changeWechatShare('shop',{title:nowShop.store.name,desc:nowShop.store.txt_info,imgUrl:nowShop.store.image,link:shopShareUrl+nowShop.store.id});
	}else{
		productCart=[];
		productCartNumber = 0;
		productCartMoney  = 0;
		$('#shopProductCart #cartNumber').html(productCartNumber);
		$('#shopProductCart #cartMoney').html(productCartMoney.toFixed(2));
		$('#shopProductCart #cartInfo').hide();
		$('#shopProductCart #emptyCart').show();
		$('#shopProductLeftBar dl,#shopProductRightBar dl').empty();
		$('#shopProductBottomBar ul,#shopCatBar .content ul').empty();
		$.getJSON(ajax_url_root+'ajax_shop',{store_id:shopId},function(result){
			$('#shopTitle').html(result.store.name);
			$('#shopIcon').css('background-image','url('+result.store.image+')');
			if(result.store.delivery){
				$('#deliveryText').html('起送 ￥ '+result.store.delivery_price+' | 配送 ￥ '+result.store.delivery_money+' | 送达 '+result.store.delivery_time+'分钟');
			}else{
				$('#deliveryText').html('本店铺仅支持门店自提');
			}
			$('#shopNoticeText').html(result.store.store_notice);
			// $('#shopCouponText').html(parseCoupon(result.store.coupon_list,'text')+';'+result.store.store_notice);
			$('#shopCouponText').html(parseCoupon(result.store.coupon_list,'text'));
			if(result.store.is_close == 1){
				$('#checkCartEmpty').html('店铺休息中');
			}else if(result.store.delivery){
				$('#checkCartEmpty').html(result.store.delivery_price.toFixed(2)+'元起送');
			}
			
			nowShop = result;
			
			$('#shopProductBox,#shopMerchantBox,#shopReplyBox').data('isShow','0');
			$('#shopReplyBox').hide();
			// showShopContent('product');
			firstMenuClick = true;
			$('#shopMenuBar .product').trigger('click');
			
			changeWechatShare('shop',{title:nowShop.store.name,desc:nowShop.store.txt_info,imgUrl:nowShop.store.image,link:shopShareUrl+nowShop.store.id});
		});
	}
	$('#shopContentBar,#shopBanner').show();
	
	// setTimeout(function(){
		// pageLoadHides();
	// },1500);
}

function changeProductSpec(){
	$('#shopDetailPageNumber .number').html('0');
	if(nowProduct.spec_list){
		var productSpecId = [];
		$.each($('#shopDetailPageFormat .row'),function(i,item){
			productSpecId.push($(item).find('li.active').data('spec_list_id'));
		});
		var productSpecStr = productSpecId.join('_');
		var nowProductSpect = nowProduct.list[productSpecStr];
		$('#shopDetailPagePrice').html('￥'+((nowProduct.is_seckill_price && nowProductSpect.seckill_price) ? nowProductSpect.seckill_price : nowProductSpect.price)+(nowProduct.extra_pay_price>0?'+'+nowProduct.extra_pay_price+nowProduct.extra_pay_price_name:'')+'<span class="unit"><em>/ </em>'+nowProduct.unit+'</span>'+(nowProductSpect.stock_num != -1 ? '<span data-stock="'+nowProductSpect.stock_num+'">剩下'+nowProductSpect.stock_num+nowProduct.unit+'</span>' : '<span data-stock="-1"></span>'));
		
		if(nowProduct.properties_list){
			for(var i in nowProductSpect.properties){
				$('.productProperties_'+nowProductSpect.properties[i].id).data('num',nowProductSpect.properties[i].num);
			}
		}
		var nowProductCartLabel = nowProduct.goods_id + '_' + productSpecStr;
	}else{
		var nowProductCartLabel = nowProduct.goods_id;
	}
	if(nowProduct.properties_list){
		$.each($('#shopDetailPageLabelBox .row'),function(i,item){
			var tmpProductProperties = [];
			$.each($(item).find('li.active'),function(j,jtem){
				nowProductCartLabel = nowProductCartLabel+'_'+$(jtem).data('label_list_id')+'_'+$(jtem).data('label_id');
			});
		});
	}
	$('#shopDetailPageNumber .number').attr('class','product_btn number');
	$('#shopDetailPageNumber .number').addClass('productNum-'+nowProductCartLabel);
	if(productCart[nowProductCartLabel]){
		$('#shopDetailPageNumber').show();
		$('#shopDetailPageNumber .number').html(productCart[nowProductCartLabel].count);
		$('#shopDetailPageBuy').hide();
	}else{
		$('#shopDetailPageNumber').hide();
		$('#shopDetailPageBuy').show();
	}
}

var productCart = [],productCartNumber = 0,productCartMoney=0;
function cartFunction(type,obj,dataObj){
	console.log(type)
	console.log(productCart)
	var productExtraPrice ;
	var productExtraPriceName ;
	if(dataObj == 'productPage'){

		var productId = nowProduct.goods_id;
		var productName = nowProduct.name;
		var productExtraPrice = nowProduct.extra_pay_price;
		var productExtraPriceName = nowProduct.extra_pay_price_name;
		if(nowProduct.spec_list){
			var productSpecListId = [],productSpecId = [],productSpecText = [];
			$.each($('#shopDetailPageFormat .row'),function(i,item){
				productSpecListId.push($(item).find('li.active').data('spec_list_id'));
				productSpecId.push($(item).find('li.active').data('spec_id'));
				productSpecText.push($(item).find('li.active').html());
			});
			var productSpecStr = productSpecListId.join('_');

			var productKey = productId + '_' + productSpecStr;
			var nowProductSpect = nowProduct.list[productSpecStr];
			var productPrice = (nowProduct.is_seckill_price && nowProductSpect.seckill_price) ? parseFloat(nowProductSpect.seckill_price) : parseFloat(nowProductSpect.price);
			var productStock = nowProductSpect.stock_num;
			
			var productParam = [];
			for(var i in productSpecListId){
				productParam.push({'type':'spec','spec_id':productSpecId[i],'id':productSpecListId[i],'name':productSpecText[i]});
			}
		}else{
			var productKey = productId;
			var productPrice = nowProduct.price;
			var productParam = [];
			var productStock = nowProduct.stock_num;
		}
		if(nowProduct.properties_list){
			$.each($('#shopDetailPageLabelBox .row'),function(i,item){
				var tmpProductProperties = [];
				$.each($(item).find('li.active'),function(j,jtem){
					productKey = productKey+'_'+$(jtem).data('label_list_id')+'_'+$(jtem).data('label_id');
					tmpProductProperties.push({'id':$(jtem).data('label_id'),'list_id':$(jtem).data('label_list_id'),'name':$(jtem).html()});
				});
				productParam.push({'type':'properties','data':tmpProductProperties});
			});
		}
		var productPackCharge = nowProduct.packing_charge;
	}else if(type != 'count'){
		if(dataObj.hasClass('cartDD') && dataObj.find('.cartLeft').hasClass('hasSpec')){
			var productKey = dataObj.find('.spec').data('product_id');
			var productStock = dataObj.find('.spec').data('stock');
		}else{
			var productKey = dataObj.data('product_id');
			var productStock = dataObj.data('stock');
			
		}
		var productPackCharge = dataObj.data('packing_charge');
		var productId = dataObj.data('product_id');
		var productName = dataObj.data('product_name');
		var productPrice = parseFloat(dataObj.data('product_price'));
		productExtraPrice =  dataObj.data('extra_price');
		productExtraPriceName =  dataObj.data('extra_price_name');
		var productParam = [];
	}


	//productExtraPrice =  dataObj.data('extra_price');
	//productExtraPriceName =  dataObj.data('extra_price_name');
	

	if(type == 'plus'){
		if(dataObj != 'productPage' && dataObj.hasClass('cartDD')){
			var tmpStock = parseInt(dataObj.data('stock'));
			if(tmpStock != -1 && productCart[productKey] && productCart[productKey]['count'] >= tmpStock){
				motify.log('没有库存了');
				return false;
			}
		}
		$('#shopProductCart .cart').addClass('bound');
		setTimeout(function(){
			$('#shopProductCart .cart').removeClass('bound');
		},500);
		if(productCart[productKey]){
			productCart[productKey]['count']++;
			$('.productNum-'+productKey).html(productCart[productKey]['count']);
		}else{
			if(dataObj == 'productPage'){
				$('#shopDetailPageBuy').hide();
				$('#shopDetailPageNumber').show();
				$('#shopDetailPageNumber .number').html('1');
				
				$('.product_'+productId+' .plus').after('<div class="product_btn number productNum-'+productId+'">1</div>').after('<div class="product_btn min"></div>');
				
			}else{
				obj.after('<div class="product_btn number productNum-'+productId+'">1</div>');
				obj.after('<div class="product_btn min"></div>');
			}
			productCart[productKey] = {
				'productId':productId,
				'productName':productName,
				'productPrice':productPrice,
				'productStock':productStock,
				'productParam':productParam,
				'productExtraPrice':productExtraPrice,
				'productExtraPriceName':productExtraPriceName,
				'productPackCharge':productPackCharge,
				'count':1,
			};
		}
		productCartNumber++;
		productCartMoney = productCartMoney+productPrice+productPackCharge;
		if(productPackCharge > 0 && dataObj != 'productPage' && dataObj.hasClass('cartDD')){
			$('#packChargeCount').html(parseFloat($('#packChargeCount').html())+productPackCharge);
		}
	}else if(type == 'min'){
		$('#shopProductCart .cart').addClass('bound');
		setTimeout(function(){
			$('#shopProductCart .cart').removeClass('bound');
		},500);
		if(productCart[productKey].count == 1){
			if(dataObj == 'productPage'){
				$('#shopDetailPageBuy').show();
				$('#shopDetailPageNumber').hide();
				$('#shopDetailPageNumber .number').html('0');
			}else{
				obj.siblings('.number').remove();
				obj.remove();
				if(dataObj.hasClass('cartDD')){
					dataObj.remove();
					$('#shopProductRightBar .productNum-'+productKey).siblings('.min').remove();
					$('#shopProductRightBar .productNum-'+productKey).remove();
					$('#shopProductBottomBar .productNum-'+productKey).siblings('.min').remove();
					$('#shopProductBottomBar .productNum-'+productKey).remove();
					$('#shopDetailPageBuy').show();
					$('#shopDetailPageNumber').hide();
					$('#shopDetailPageNumber .number').html('0');
					if(productPackCharge > 0){
						$('#packChargeCount').html(parseFloat($('#packChargeCount').html())-productPackCharge);
					}
				}
			}
			delete productCart[productKey];
		}else{
			productCart[productKey]['count']--;
			$('.productNum-'+productKey).html(productCart[productKey]['count']);
			if(productPackCharge > 0 && dataObj != 'productPage' && dataObj.hasClass('cartDD')){
				$('#packChargeCount').html(parseFloat($('#packChargeCount').html())-productPackCharge);
			}
		}
		productCartNumber--;
		productCartMoney = productCartMoney - productPrice - productPackCharge;
	}

		var productCartExtraPrice='';
	if(open_extra_price==1){
		
		var tmp_productExtraPrice =0;
		var tmp_productExtraPriceName='';
		for(var i in productCart){
			if(productCart[i].productExtraPrice!=undefined&&productCart[i].productExtraPrice>0){
				tmp_productExtraPrice+=productCart[i].productExtraPrice*productCart[i].count;
				tmp_productExtraPriceName=productCart[i].productExtraPriceName;
			}
		}
		if(tmp_productExtraPrice>0){
			productCartExtraPrice ='+'+ tmp_productExtraPrice+tmp_productExtraPriceName;
		}
	}
	
	

	$('#shopProductCart #cartNumber').html(productCartNumber);
	$('#shopProductCart #cartMoney').html(parseFloat(productCartMoney.toFixed(2))+productCartExtraPrice);
	
	
	if(productCartNumber == 0){
		$('#checkCartEmpty').removeClass('noEmpty').show().html((nowShop.store.delivery_price).toFixed(2)+'元起送');
		$('#checkCart').removeClass('noEmpty').hide();	
	}else if(nowShop.store.pick == true){
		$('#checkCartEmpty').hide();
		$('#checkCart').show();	
	}else if(nowShop.store.delivery == true && parseFloat(productCartMoney.toFixed(2)) < nowShop.store.delivery_price){
		$('#checkCart').hide();
		$('#checkCartEmpty').addClass('noEmpty').show().html('还差￥'+(nowShop.store.delivery_price - parseFloat(productCartMoney.toFixed(2))).toFixed(2)+'起送');
	}else{
		$('#checkCartEmpty').hide();
		$('#checkCart').show();	
	}
	
	if(productCartNumber > 0){
		$('#shopProductCart #emptyCart').hide();
		$('#shopProductCart #cartInfo').show();
	}else{
		if($('#cartInfo').hasClass('isShow')){
			$('#shopProductCartShade').trigger('click');
		}
		$('#shopProductCart #cartInfo').hide();
		$('#shopProductCart #emptyCart').show();
	}

	stringifyCart();
	// console.log($.cookie('shop_cart_'+nowShop.store.id));
}

function stringifyCart(){
	$.cookie('shop_cart_'+nowShop.store.id,null);
	for(var i = 0;i<20;i++){
		$.cookie('shop_cart_'+nowShop.store.id+'_'+i,null);
	}
	var cookieProductCart = [];
	for(var i in productCart){
		cookieProductCart.push(productCart[i]);
	}
	if(cookieProductCart.length > 10){
		var cookieProductCartObj = {};
		for(var i in cookieProductCart){
			var k = Math.floor(i/10);
			if(!cookieProductCartObj[k]){
				cookieProductCartObj[k] = [];
			}
			cookieProductCartObj[k].push(cookieProductCart[i]);
		}
		for(var i in cookieProductCartObj){
			$.cookie('shop_cart_'+nowShop.store.id+'_'+i,JSON.stringify(cookieProductCartObj[i]),{expires:700,path:'/'});
		}
	}else{
	$.cookie('shop_cart_'+nowShop.store.id,JSON.stringify(cookieProductCart),{expires:700,path:'/'});
}
}
function parseCart(){
	
}

function parseCoupon(obj,type){
	var returnObj = {};
	for(var i in obj){
		if(typeof(obj[i]) == 'object'){
			returnObj[i] = [];
			for(var j in obj[i]){
				returnObj[i].push('满'+obj[i][j].money+'元减'+obj[i][j].minus+'元');
			}
		}else if(i=='invoice'){
			returnObj[i] = '满'+obj[i]+'元支持开发票，请在下单时填写发票抬头';
		}else if(i=='discount'){
			returnObj[i] = '店内全场'+obj[i]+'折';
		}
	}
	var textObj = [];
	for(var i in returnObj){
		if(typeof(returnObj[i]) == 'object'){
			switch(i){
				case 'system_newuser':
					textObj[i] = '平台首单'+returnObj[i].join(',');
					break;
				case 'system_minus':
					textObj[i] = '平台优惠'+returnObj[i].join(',');
					break;
				case 'newuser':
					textObj[i] = '店铺首单'+returnObj[i].join(',');
					break;
				case 'minus':
					textObj[i] = '店铺优惠'+returnObj[i].join(',');
					break;
				case 'system_minus':
					textObj[i] = '平台优惠'+returnObj[i].join(',');
					break;
				case 'delivery':
					textObj[i] = '配送费'+returnObj[i].join(',');
					break;
			}
		}else if(i=='invoice' || i=='discount'){
			textObj[i] = returnObj[i];
		}
	}
	if(type == 'text'){
		var tmpObj = [];
		for(var i in textObj){
			tmpObj.push(textObj[i]);
		}
		return tmpObj.join(';');
	}else{
		return textObj;
	}
}

function showShopContent(nav){
	if(nav == 'product'){
		if(nowShop.store.store_theme == '0'){
			$('#shopCatBar,#shopProductBottomBar').hide();
			$('#shopMenuBar').fadeIn('slow')
			$('#shopProductLeftBar,#shopProductRightBar').show();
		}else if(nowShop.store.store_theme == '1'){
			$('#shopMenuBar,#shopProductLeftBar,#shopProductRightBar').hide();
			$('#shopProductBottomBar').show();
			$('#shopCatBar').fadeIn('slow').find('.title').html('全部分类');
		}
		if($('#shopProductBox').data('isShow') != '1'){
			$('#shopProductLeftBar dl,#shopProductRightBar dl').empty();
			if(nowShop.product_list){
				if(nowShop.store.store_theme == '0'){
					laytpl($('#shopProductLeftBarTpl').html()).render(nowShop.product_list, function(html){
						$('#shopProductLeftBar dl').html(html);
					});
					laytpl($('#shopProductRightBarTpl').html()).render(nowShop.product_list, function(html){
						$('#shopProductRightBar dl').html(html);
						if(nowShop.product_list.length >= 3){
							$(".lazy").lazyload({effect:"fadeIn",threshold:200,failurelimit:8,container:$('#shopProductRightBar')});
							$('#shopProductRightBar').scrollTop(1);
						}
					});
				}else if(nowShop.store.store_theme == '1'){
					laytpl($('#shopProductTopBarTpl').html()).render(nowShop.product_list, function(html){
						$('#shopCatBar .content ul').html(html);
					});
					laytpl($('#shopProductBottomBarTpl').html()).render(nowShop.product_list, function(html){
						$('#shopProductBottomBar ul').html(html);
						if(nowShop.product_list.length >= 3){
							$(".lazy").lazyload({effect:"fadeIn",threshold:200,failurelimit:8,container:$('#shopProductBottomBar')});
						}
					});
					$('#shopProductBottomBar .position_img').height($('#shopProductBottomBar .position_img:eq(0)').width());
					$('#shopProductBottomBar').scrollTop(1);
					// $('#shopProductBottomBar li').css('margin-top',window_width*0.02);
					$('#shopProductBottomBar ul').css('margin-bottom',window_width*0.02);
				}
			}
			var nowShopCart = $.cookie('shop_cart_'+nowShop.store.id);
			var tmpShopCart = [];
			if($.cookie('shop_cart_'+nowShop.store.id+'_0')){
				for(var i = 0; i<20;i++){
					var tmp = $.cookie('shop_cart_'+nowShop.store.id+'_'+i);
					if(tmp){
						tmpShopCart = tmpShopCart.concat($.parseJSON(tmp));
					}else{
						break;
					}
				}
				nowShopCart = JSON.stringify(tmpShopCart);
			}
			if(nowShopCart){
				if(tmpShopCart.length > 0){
					nowShopCartArr = tmpShopCart;
				}else{
				nowShopCartArr = $.parseJSON(nowShopCart);
				}
				nowShopCartArr = $.parseJSON(nowShopCart);
				productCart=[];
				if(nowShopCartArr.length > 0){
					productCartNumber = productCartMoney = 0;
					for(var i in nowShopCartArr){
						var tmpSpec = [];
						var tmpObj = nowShopCartArr[i].productParam;
						if(tmpObj.length > 0){
							for(var j in tmpObj){
								if(tmpObj[j].type == 'spec'){
									tmpSpec.push(tmpObj[j].id);
								}else{
									for(var k in tmpObj[j].data){
										tmpSpec.push(tmpObj[j].data[k].list_id);
										tmpSpec.push(tmpObj[j].data[k].id);
									}
								}
							}
							if(tmpSpec.length > 0){
								var tmpSpecStr = nowShopCartArr[i].productId + '_' + tmpSpec.join('_');
								productCart[tmpSpecStr] = nowShopCartArr[i];
							}else{
								productCart[nowShopCartArr[i].productId] = nowShopCartArr[i];
							}
						}else{
							productCart[nowShopCartArr[i].productId] = nowShopCartArr[i];
							$('.product_'+nowShopCartArr[i].productId+' .plus').after('<div class="product_btn number productNum-'+nowShopCartArr[i].productId+'">'+nowShopCartArr[i].count+'</div>').after('<div class="product_btn min"></div>');
						}

						productCartNumber += nowShopCartArr[i].count;
						productCartMoney += nowShopCartArr[i].count * nowShopCartArr[i].productPrice;
						productCartMoney += nowShopCartArr[i].count * nowShopCartArr[i].productPackCharge;

						
					}
				
					//统计购物车功能
					cartFunction('count');
				}
				// console.log(productCart);
			}else{
				cartFunction('count');
			}
			$('#shopProductBox').data('isShow','1');
		}
		pageLoadHides();
	}else if(nav == 'merchant'){
		$('#shopCatBar').hide();
		$('#shopMenuBar').show();
		if($('#shopMerchantBox').data('isShow') != '1'){
			$('#shopMerchantDescBox .phone').attr('data-phone',nowShop.store.phone).html('店铺电话：'+nowShop.store.phone);
			$('#shopMerchantDescBox .merchant').attr('data-url', nowShop.store.home_url);
			$('#shopMerchantDescBox .address').attr('data-url','map-'+nowShop.store.id+'-'+nowShop.store.long+'-'+nowShop.store.lat+'-'+encodeURIComponent(nowShop.store.name)+'-'+encodeURIComponent(nowShop.store.adress)).html('<span></span>店铺地址：'+nowShop.store.adress);
			$('#shopMerchantDescBox .openTime').html('营业时间：'+nowShop.store.time);
			$('#shopMerchantDescBox .merchantNotice').html('店铺公告：'+nowShop.store.store_notice);
			if(nowShop.store.isverify==1){
				$('#shopMerchantDescBox').append('<dd class="merchantVerify">店铺认证：已认证</dd>');
			}
			if(nowShop.store.store_live_url!=''&& typeof(nowShop.store.store_live_url)!='undefined'){
				$('#shopMerchantDescBox').append('<dd class="storelive" >店铺直播</dd>');
				$('#video_url').attr('src',nowShop.store.store_live_url)
			}
			if(nowShop.store.delivery){
				$('#shopMerchantDescBox .deliveryType').html('配送服务：由 '+(nowShop.store.delivery_system ? '平台' : '店铺')+' 提供配送');
			}else{
				$('#shopMerchantDescBox .deliveryType').html('配送服务：本店铺仅支持门店自提');
			}
			var tmpCouponList = parseCoupon(nowShop.store.coupon_list,'array');
			var tmpCouponHtml = '';
			if(tmpCouponList['invoice']){
				tmpCouponHtml+= '<dd><em class="merchant_invoice"></em>'+tmpCouponList['invoice']+'</dd>';
			}
			if(tmpCouponList['discount']){
				tmpCouponHtml+= '<dd><em class="merchant_discount"></em>'+tmpCouponList['discount']+'</dd>';
			}
			if(tmpCouponList['minus']){
				tmpCouponHtml+= '<dd><em class="merchant_minus"></em>'+tmpCouponList['minus']+'</dd>';
			}
			if(tmpCouponList['newuser']){
				tmpCouponHtml+= '<dd><em class="newuser"></em>'+tmpCouponList['newuser']+'</dd>';
			}
			if(tmpCouponList['delivery']){
				tmpCouponHtml+= '<dd><em class="delivery"></em>'+tmpCouponList['delivery']+'</dd>';
			}
			if(tmpCouponList['system_minus']){
				tmpCouponHtml+= '<dd><em class="system_minus"></em>'+tmpCouponList['system_minus']+'</dd>';
			}
			if(tmpCouponList['system_newuser']){
				tmpCouponHtml+= '<dd><em class="system_newuser"></em>'+tmpCouponList['system_newuser']+'</dd>';
			}
			$('#shopMerchantCouponBox').html(tmpCouponHtml);
			var store_image = '';
			var im_i = 0;
			$.each(nowShop.store.images, function(i, image){
				im_i ++;
				store_image += '<li><img src="' + image + '" width="100%" height="100%"></li>';
			});
			if (im_i > 3) {
				store_image += '<li><span>更多</span></li>';
			}
			if (store_image == '') {
				$('.store_image').parents('.photo').remove();
			} else {
				$('.store_image').data('pics', nowShop.store.images_str).html(store_image);
			}
			
			var auth_files_image = '';
			var au_i = 0;
			$.each(nowShop.store.auth_files, function(i, file){
				au_i ++;
				auth_files_image += '<li><img src="' + file + '" width="100%" height="100%"></li>';
			});
			if (au_i > 3) {
				auth_files_image += '<li><span>更多</span></li>';
			}
			if (auth_files_image == '') {
				$('.auth_file_image').parents('.photo').remove();
			} else {
				$('.auth_file_image').data('pics', nowShop.store.auth_files_str).html(auth_files_image);
			}
			$('#shopMerchantBox').data('isShow','1');
		}
		pageLoadHides();
	}else if(nav == 'reply'){
		$('#shopCatBar').hide();
		$('#shopMenuBar').show();
		if($('#shopReplyBox').data('isShow') != '1'){
			$('#showMoreReply').data('page','2');
			$('#shopReplyBox ul li:eq(0)').addClass('active').siblings().removeClass('active');
			$('#shopReplyBox dl').empty();
			$.post(shopReplyUrl+nowShop.store.id,{showCount:1},function(result){
				$('#shopReplyBox').data('isShow','1').show();
				if(result == '0'){
					$('#noReply').show();
					$('#showMoreReply').hide();
					$('#shopReplyBox ul').hide();
				}else{	
					result = $.parseJSON(result);
					$('#shopReplyBox ul li:eq(0) em').html(result.all_count);
					$('#shopReplyBox ul li:eq(1) em').html(result.good_count);
					$('#shopReplyBox ul li:eq(2) em').html(result.wrong_count);
					$('#shopReplyBox ul').show();
					laytpl($('#shopReplyTpl').html()).render(result.list, function(html){
						$('#shopReplyBox dl').html(html);
					});
					
					if(result.total > result.now){
						$('#showMoreReply').show();
					}else{
						$('#showMoreReply').hide();
					}
					$('#noReply').hide();
				}
				
				pageLoadHides();
			});
		}else{
			pageLoadHides();
		}
	}
	// if(!$('#shopMenuBar li.'+nav).hasClass('active')){
		// $('#shopMenuBar li.'+nav).trigger('click');
	// }
	// setTimeout(function(){
		// pageLoadHides();
	// },1000);
}

function changeTitle(title){
	$(document).attr("title",title);
}

function close_swiper(){
	$('.albumContainer').remove();
}
function pageLoadTips(options){
	this.options = {
		showBg:true,
		top:'center',
		left:'center'
	}
	for (var i in options){
		this.options[i] = options[i];
	}
	options = this.options;
	//显示背景
	if(options.showBg){
		$('#pageLoadTipShade').removeClass('nobg');
	}else{
		$('#pageLoadTipShade').addClass('nobg');
	}
	//显示顶边
	if(options.top == 'center'){
		options.top = (window_height-120)/2;
	}
	//显示顶边
	if(options.left == 'center'){
		options.left = (window_width-120)/2;
	}
	$('#pageLoadTipBox').css({'top':options.top+'px','left':options.left+'px'});
	$('#pageLoadTipShade').css({'height':$(window).height(),'width':$(window).width()}).show();
}
function pageLoadHides(){
	$('#pageLoadTipShade').hide();
}









var myScroll2=null,myScroll3=null, mySwiper_big = null;
$(function(){
	$('.photo ul').click(function(){
		var album_more = $(this).data('pics');
		var album_array = album_more.split(',');
		if(motify.checkWeixin()){
			wx.previewImage({
				current:album_array[0],
				urls:album_array
			});
		}else{
			var album_html = '<div class="albumContainer" style="display:block;">';
			album_html += '<div class="swiper-container">';
			album_html += '<div class="swiper-wrapper">';
			$.each(album_array,function(i,item){
				album_html += '<div class="swiper-slide">';
				album_html += '<img src="'+item+'"/>';
				album_html += '</div>';
			});
			album_html += '</div>';
			album_html += '<div class="swiper-pagination"></div><div class="swiper-close" onclick="close_swiper()">X</div>';
			album_html += '</div>';
			album_html += '</div>';
			$('body').append(album_html);
			mySwiper_big = $('.albumContainer .swiper-container').swiper({
				pagination:'.albumContainer .swiper-pagination',
				loop:true,
				grabCursor: true,
				paginationClickable: true
			});
		}
	});
	$('.dropdown-toggle').click(function(){
		if(choosePage == 'list'){
			isListShow=true;
		}else{
			isCatListShow=true;
		}
		if($(this).hasClass('active')){
			close_dropdown();
			return false;
		}
		close_dropdown();
		
		$(this).addClass('active');
		var nav = $(this).attr('data-nav');
		
		
		$('.dropdown-wrapper').addClass(nav+' active');
		$('.'+nav+'-wrapper').addClass('active');
		
		$('#dropdown_scroller,.dropdown-module').height($('.'+nav+'-wrapper>ul>li').size()*41-1);
		
		if($('#dropdown_scroller').height() < ($(window).height() - 97)*0.5){
			// $('#dropdown_scroller,.dropdown-module').height(($(window).height() - 97)*0.5);
			$('#dropdown_scroller,.dropdown-module').height($('#dropdown_scroller div').height());
		}else if($('#dropdown_scroller').height() < ($(window).height() - 97)*0.8){
			$('#dropdown_scroller,.dropdown-module').height($('#dropdown_scroller').height());
		}else{
			$('#dropdown_scroller,.dropdown-module').height(($(window).height() - 97)*0.8);
			myScroll3 = new IScroll('#dropdown_scroller', { probeType: 1,disableMouse:true,disablePointer:true,mouseWheel: false,scrollX: false, scrollY:true,click:iScrollClick()});
		}
		
		if(!$('#listNavBox').hasClass('fixed')){
			if(choosePage == 'list'){
				if($('#pageList').height() < window_height + $('#listNavBox').offset().top){
					$('#pageList .shade').css('min-height',window_height + $('#listNavBox').offset().top).show();
				}
				$(window).scrollTop(listNavBarTop+5);
				setTimeout(function(){
					$('#listNavBox').addClass('fixed');
					$('#pageList .shade').height($('#pageList').height()+'px').show();
					isShowShade = true;
				},50);
			}else{
				$('#pageCat .shade').height($('#pageCat').height()+'px').show();
			}
		}else{
			$('#pageList .shade').height($('#pageList').height()+'px').show();
			// if($('#pageList').height() < window_height + $('#listNavBox').offset().top){
				// $('#pageList .shade').css('min-height',window_height + $('#listNavBox').offset().top);
			// }
			isShowShade = true;
		}
		
		if($('.'+nav+'-wrapper').find('.active').attr('data-has-sub')){
			$('#dropdown_sub_scroller').html('<div>'+$('.'+nav+'-wrapper').find('.active').find('.sub_cat').html()+'<div>').css('left','160px');
			$('#dropdown_scroller').width('160px');
		}
		myScroll2 = new IScroll('#dropdown_sub_scroller', { probeType: 1,disableMouse:true,disablePointer:true,mouseWheel: false,scrollX: false, scrollY:true,click:iScrollClick()});
	});
	$('#pageList .shade').click(function(){
		$('#listNavBox').removeClass('fixed');
		$('#listNavPlaceHolderBox').hide();
		close_dropdown();
	});
	$('#pageCat .shade').click(function(){
		close_dropdown();
	});
	
	$(document).on('click','.biz-wrapper ul>li, .category-wrapper ul>li',function(){
		$('#dropdown_sub_scroller').css({'overflow':'hide','overflow-y':''});
		$('.biz-wrapper ul>li, .category-wrapper ul>li').removeClass('active');	
		if($(this).attr('data-has-sub')){
			$(this).addClass('active');
			$('#dropdown_sub_scroller').html('<div>'+$(this).find('.sub_cat').html()+'<div>').css('left','160px');
			$('#dropdown_scroller').width('160px');
			if($('#dropdown_sub_scroller>div').height() > $('#dropdown_sub_scroller').height()){
				myScroll2 = new IScroll('#dropdown_sub_scroller', { probeType: 1,disableMouse:true,disablePointer:true,mouseWheel: false,scrollX: false, scrollY:true,click:iScrollClick()});
			}
		}
	});
	// $(document).on('click','.dropdown-list li',function(){
		// if(!$(this).attr('data-has-sub')){
			// alert(222);
			// list_location($(this));
		// }
	// });
});

function close_dropdown(){
	if(choosePage == 'list'){
		isListShow=false;
	}else{
		isCatListShow=false;
	}
	isShowShade = false;
	$('#dropdown_scroller,#dropdown_sub_scroller').css('width','');
	$('.dropdown-toggle').removeClass('active');
	$('.dropdown-wrapper').prop('class','dropdown-wrapper');
	$('#dropdown_scroller,.dropdown-module').css('height','');
	$('#pageList .shade,#pageCat .shade').hide();
	$('#dropdown_sub_scroller').css('left','100%');
	$('#dropdown_scroller>div>ul>li').removeClass('active');
	if(myScroll3){
		myScroll3.destroy();
		myScroll3 = null;
		$('#dropdown_scroller>div').removeAttr('style');
	}
	if(myScroll2){
		myScroll2.destroy();
		myScroll2 = null;
		$('#dropdown_sub_scroller>div').removeAttr('style');
	}
}

function getListGeocoderbefore(type){
	if(type == true){
		if(user_long != '0' && addressGeocoder == false){
			getListGeocoder();
		}else if($.cookie('userLocationName') && addressGeocoder == false){
			user_long = arguments[2];
			user_lat = arguments[3];
			getListGeocoder();
		}else{
			getGeoconv(arguments[2],arguments[3]);
		}
	}else{
		// alert('2222222226666666');
		pageLoadHides();
	}
}
function getGeoconv(lng,lat){
	$.getJSON('https://api.map.baidu.com/geoconv/v1/?coords='+lng+','+lat+'&from=1&to=5&ak=4c1bb2055e24296bbaef36574877b4e2&callback=getListGeoconvBack&jsoncallback=?');
}
function getListGeoconvBack(obj){
	// alert(JSON.stringify(obj.result));
	user_long = obj.result[0].x;
	user_lat = obj.result[0].y;
	getListGeocoder();
}
function getListGeocoder(){
	$.getJSON('https://api.map.baidu.com/geocoder/v2/?ak=4c1bb2055e24296bbaef36574877b4e2&callback=getListGeocoderBack&location='+user_lat+','+user_long+'&output=json&pois=1&jsoncallback=?');
}
function getListGeocoderBack(obj){
	if(addressGeocoder == false){
		if(obj.result.pois.length > 0){
			$('#locationText').html(obj.result.pois[0].name);
			$.cookie('userLocationName',obj.result.pois[0].name,{expires:700,path:'/'});
		}else{
			$('#locationText').html(obj.result.addressComponent.street);
			$.cookie('userLocationName',obj.result.addressComponent.street,{expires:700,path:'/'});
		}
		pageLoadHides();
		if(nowPage == 'list'){
			showShopList(true);
		}else if(nowPage == 'shopSearch'){
			showShopSearchList(true);
		}
	}else{
		var tmpName = obj.result.pois.length > 0 ? obj.result.pois[0].name : obj.result.addressComponent.street;
		$('#pageAddressLocationList').show().find('.content').html('<dd data-long="'+user_long+'" data-lat="'+user_lat+'" data-name="'+tmpName+'"><div class="name">'+tmpName+'</div></dd>');
		// $('#pageAddressLocationList').show().find('.content dd').data({'long':user_long,'lat':user_lat,'name':tmpName}).find('.name').html(tmpName);
		addressGeocoder = false;
	}
}

function showListData(){
	$.getJSON(ajax_url_root+'ajax_index',function(result){
		/*顶部轮播图*/
		if(result.banner_list){
			laytpl($('#listBannerSwiperTpl').html()).render(result.banner_list, function(html){
				$('#listBanner .swiper-wrapper').html(html);
				if(result.banner_list.length > 1){
					var mySwiper1 = $('#listBanner .swiper-container1').swiper({
						pagination:'#listBanner .swiper-pagination1',
						loop:true,
						grabCursor: true,
						paginationClickable: true,
						autoplay:3000,
						autoplayDisableOnInteraction:false,
						simulateTouch:false
					});
				}
				$('#listBanner').show();
			});
			$('#listBanner').height(parseInt(window_width*240/640)+'px');
		}else{
			$('#listHeader').addClass('fixedRoundBg');
			$('#pageList').css('padding-top','50px');
			$('#listBanner').hide();
		}
		
		/*九宫格*/
		if(result.slider_list){
			laytpl($('#listSliderSwiperTpl').html()).render(result.slider_list, function(html){
				$('#listSlider .swiper-wrapper').html(html);
				if(result.slider_list.length > 8){
					var mySwiper2 = $('.swiper-container2').swiper({
						pagination:'.swiper-pagination2',
						loop:true,
						grabCursor: true,
						paginationClickable: true,
						simulateTouch:false
					});
				}
				$('#listSlider').show();
			});
		}else{
			$('#listSlider').hide();
		}
		
		/*三格广告*/
		if(result.adver_list){
			laytpl($('#listRecommendTpl').html()).render(result.adver_list, function(html){
				$('#listRecommend').html(html);
				$('#listRecommend').show();
			});
			$('#listRecommend').height(parseInt(window_width*224/640)+'px');
			$('#listRecommend .recommendLeft').height(parseInt(window_width*224/640)-1+'px');
			$('#listRecommend .recommendRightTop,#listRecommend .recommendRightBottom').height(parseInt(parseInt(window_width*224/640-2)/2)+'px');
		}else{
			$('#listRecommend').hide();
		}
		
		/*可选分类*/
		if(result.category_list){
			categoryList = result.category_list;
			cat_url = categoryList[0].cat_url;
			laytpl($('#listCategoryListTpl').html()).render(result.category_list, function(html){
				$('#dropdown_scroller .category-wrapper ul').html(html);
			});
		}
		
		/*可选排序*/
		if(result.sort_list){
			sortList = result.sort_list;
			sort_url = categoryList[0].sort_url;
			laytpl($('#listSortListTpl').html()).render(result.sort_list, function(html){
				$('#dropdown_scroller .sort-wrapper ul').html(html);
			});
		}
		
		/*可选类别*/
		if(result.type_list){
			typeList = result.type_list;
			type_url = categoryList[0].type_url;
			laytpl($('#listTypeListTpl').html()).render(result.type_list, function(html){
				$('#dropdown_scroller .type-wrapper ul').html(html);
			});
		}
		listNavBarTop = $('#listNavBox').offset().top - 50;
	});
}

function list_location(obj){
	close_dropdown();
	if(obj.data('cat_url')){
		obj.addClass('red');
		$('.dropdown-toggle.category .nav-head-name').html(obj.find('span').data('name'));
		if(choosePage == 'cat'){
			$('#catTitle').html('周边'+shop_alias_name);
		}
		cat_url = obj.data('cat_url');
	}else if(obj.data('type_url')){
		obj.addClass('active').siblings('li').removeClass('active');
		$('.dropdown-toggle.type .nav-head-name').html(obj.find('span').data('name'));
		type_url = obj.data('type_url');
	}else if(obj.data('sort_url')){
		obj.addClass('active').siblings('li').removeClass('active');
		$('.dropdown-toggle.sort .nav-head-name').html(obj.find('span').data('name'));
		sort_url = obj.data('sort_url');
	}
	pageLoadTips({showBg:false});
	if(choosePage == 'list'){
		showShopList(true);
	}else{
		showCatShopList(true);
	}
}

var listShopSearchNowPage=0,shopSearchListHasMorePage = true;
function showShopSearchList(newPage){
	isSearchListShow = true;
	if(newPage || listShopSearchNowPage == 0){
		$('#pageShopSearch #storeListLoadTip').show();
		$('#pageShopSearch #storeList .dealcard').empty();

		listShopSearchNowPage = 1;
		shopSearchListHasMorePage = true;
		pageLoadTips({showBg:false});
	}else{
		listShopSearchNowPage++;
	}
	$.getJSON(ajax_url_root+'ajax_list',{user_lat:user_lat,user_long:user_long,page:listShopSearchNowPage,key:$('#pageShopSearchTxt').val()},function(result){
		if(result.store_list && result.store_list.length > 0){
			laytpl($('#listShopTpl').html()).render(result.store_list, function(html){
				if(newPage){
					$('#pageShopSearch #storeList .dealcard').html(html);
					$('#pageShopSearch #storeList').show();
				}else{
					$('#pageShopSearch #storeList .dealcard').append(html);
				}
			});
			if(result.has_more == false){
				shopSearchListHasMorePage = false;
				$('#pageShopSearch #storeListLoadTip').hide();
			}
		}else{
			shopSearchListHasMorePage = false;
			$('#pageShopSearch #storeListLoadTip').hide();
		}
		isSearchListShow = false;
		pageLoadHides();
	});
}

var listShopNowPage=0,listHasMorePage = true;
function showShopList(newPage){
	isListShow = true;
	if(newPage || listShopNowPage == 0){
		$('#pageList #storeListLoadTip').show();
		$('#pageList #storeList .dealcard').empty();

		listShopNowPage = 1;
		listHasMorePage = true;
		if(isFirstShowList == false){
			pageLoadTips();
		}
	}else{
		listShopNowPage++;
	}
	$.getJSON(ajax_url_root+'ajax_list',{cat_url:cat_url,sort_url:sort_url,type_url:type_url,user_lat:user_lat,user_long:user_long,page:listShopNowPage},function(result){
		// console.log(result);
		if(result.store_list && result.store_list.length > 0){
			laytpl($('#listShopTpl').html()).render(result.store_list, function(html){
				if(newPage){
					$('#pageList #storeList .dealcard').html(html);
				}else{
					$('#pageList #storeList .dealcard').append(html);
				}
			});
			if(result.has_more == false){
				listHasMorePage = false;
				$('#pageList #storeListLoadTip').hide();
			}
		}else{
			listHasMorePage = false;
			$('#pageList #storeListLoadTip').hide();
		}
		isListShow = false;
		pageLoadHides();
	});
}

var catShopNowPage=0,catHasMorePage = true;
function showCatShopList(newPage){
	isCatListShow = true;
	if(newPage || catShopNowPage == 0){
		$('#pageCat #storeListLoadTip').show();
		$('#pageCat #storeList .dealcard').empty();		
		catShopNowPage = 1;
		catHasMorePage = true;
		pageLoadTips();
	}else{
		catShopNowPage++;
	}
	
	$.getJSON(ajax_url_root+'ajax_list',{cat_url:cat_url,sort_url:sort_url,type_url:type_url,user_lat:user_lat,user_long:user_long,page:catShopNowPage,village_id:village_id},function(result){
		if(result.store_list && result.store_list.length > 0){
			laytpl($('#listShopTpl').html()).render(result.store_list, function(html){
				if(newPage){
					$('#pageCat #storeList .dealcard').html(html);
				}else{
					$('#pageCat #storeList .dealcard').append(html);
				}
			});
			/* if(result.has_more == false){
				catHasMorePage = false;
				$('#pageCat #storeListLoadTip').hide();
			} */
		}else{
			//catHasMorePage = false;
			//$('#pageCat #storeListLoadTip').hide();
		}
		isCatListShow = false;
		pageLoadHides();
	});
}

function goBackPage(){
	if(motify.checkLifeApp() && motify.getLifeAppVersion() >= 50){
		if(motify.checkIos()){
			$('body').append('<iframe src="pigcmso2o://webViewGoBack" style="display:none;"></iframe>');
			if(motify.getLifeAppVersion() < 70){
				window.history.go(-1);
			}
		}else{
			window.lifepasslogin.webViewGoBack();
		}
	}else{
		window.history.go(-1);
	}
}

function changeWechatShare(type,param){
	if(typeof(wxSdkLoad) == "undefined"){
		return false;
	}
	
	if(type == 'plat'){
		param = {
			title: window.shareData.tTitle,
			desc:  window.shareData.tContent,
			link:  window.shareData.sendFriendLink + '&openid=' + userOpenid,
			imgUrl: window.shareData.imgUrl,
		};
	}
	// console.log(param);
	wx.ready(function () {
		wx.onMenuShareAppMessage({
			title: param.title,
			desc: param.desc,
			link: param.link,
			imgUrl: param.imgUrl,
			type: '', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function () { 
				shareHandle('frined');
				//alert('分享朋友成功');
			},
			cancel: function () { 
				//alert('分享朋友失败');
			}
		});
		wx.onMenuShareTimeline({
			title: param.title,
			link: param.link,
			imgUrl: param.imgUrl,
			success: function () { 
				shareHandle('frineds');
				//alert('分享朋友圈成功');
			},
			cancel: function () { 
				//alert('分享朋友圈失败');
			}
		});
	});
}
jQuery(document).ready(function($){
	var offset = 0, offset_opacity = 0;
	$('#shopDetailPage').scroll(function(){
		($(this).scrollTop() > offset) ? $('.cd-top').addClass('cd-is-visible') : $('.cd-top').removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			//$('.cd-top').addClass('cd-fade-out');
		}
	});
	$('.cd-top').on('click', function(event){
		event.preventDefault();
		$('#shopDetailPage').animate({scrollTop: 0}, 500);
	});
});
/*! fly - v1.0.0 - 2014-12-22
 * https://github.com/amibug/fly
 * Copyright (c) 2014 wuyuedong; Licensed MIT */
!function (a) {
    a.fly = function (b, c) {
        var d = {
            version: "1.0.0",
            autoPlay: !0,
            vertex_Rtop: 20,
            speed: 1.2,
            start: {},
            end: {},
            onEnd: a.noop
        }, e = this, f = a(b);
        e.init = function (a) {
            this.setOptions(a), !!this.settings.autoPlay && this.play()
        }, e.setOptions = function (b) {
            this.settings = a.extend(!0, {}, d, b);
            var c = this.settings, e = c.start, g = c.end;
            f.css({
                marginTop: "0px",
                marginLeft: "0px",
                position: "fixed"
            }).appendTo("body"), null != g.width && null != g.height && a.extend(!0, e, {
                width: f.width(),
                height: f.height()
            });
            var h = Math.min(e.top, g.top) - Math.abs(e.left - g.left) / 3;
            h < c.vertex_Rtop && (h = Math.min(c.vertex_Rtop, Math.min(e.top, g.top)));
            var i = Math.sqrt(Math.pow(e.top - g.top, 2) + Math.pow(e.left - g.left, 2)), j = Math.ceil(Math.min(Math.max(Math.log(i) / .05 - 75, 30), 100) / c.speed), k = e.top == h ? 0 : -Math.sqrt((g.top - h) / (e.top - h)), l = (k * e.left - g.left) / (k - 1), m = g.left == l ? 0 : (g.top - h) / Math.pow(g.left - l, 2);
            a.extend(!0, c, {count: -1, steps: j, vertex_left: l, vertex_top: h, curvature: m})
        }, e.play = function () {
            this.move()
        }, e.move = function () {
            var b = this.settings, c = b.start, d = b.count, e = b.steps, g = b.end, h = c.left + (g.left - c.left) * d / e, i = 0 == b.curvature ? c.top + (g.top - c.top) * d / e : b.curvature * Math.pow(h - b.vertex_left, 2) + b.vertex_top;
            if (null != g.width && null != g.height) {
                var j = e / 2, k = g.width - (g.width - c.width) * Math.cos(j > d ? 0 : (d - j) / (e - j) * Math.PI / 2), l = g.height - (g.height - c.height) * Math.cos(j > d ? 0 : (d - j) / (e - j) * Math.PI / 2);
                f.css({width: k + "px", height: l + "px", "font-size": Math.min(k, l) + "px"})
            }
            f.css({left: h + "px", top: i + "px"}), b.count++;
            var m = window.requestAnimationFrame(a.proxy(this.move, this));
            d == e && (window.cancelAnimationFrame(m), b.onEnd.apply(this))
        }, e.destory = function () {
            f.remove()
        }, e.init(c)
    }, a.fn.fly = function (b) {
        return this.each(function () {
            void 0 == a(this).data("fly") && a(this).data("fly", new a.fly(this, b))
        })
    }
}(jQuery);