/**
 * 查找url中指定参数的值
 * @param  {[type]} value url字符串
 * @param  {[type]} name 参数名称
 * @return {[type]} 参数值
 */
function getQueryStringRegExp(value, name) {
	var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
	if (reg.test(value)) return unescape(RegExp.$2.replace(/\+/g, " "));
	return "";
};

/**
 * 打开文件
 */
function OpenFile() {
	//http://public.ecidi.com/Catalog/Public_ViewFilesframe.asp?htmlurl=../PublicArticls/2014/2014-5/187620.html&ID=187620&StrFolder=QYTZ&strCataName=%E5%85%A8%E9%99%A2%E9%80%9A%E7%9F%A5&X1=mKlMlL5KeM9L&X2=nLhIiMkAnDpDnArBnBmEDTBRtDpCtAvBwD
	if (window.document.location.pathname == "/Catalog/Public_ViewFilesframe.asp") //页面过滤
	{
		var url = window.frames['main'].document.getElementById('PdfFileArea').src; //查找文件地址
		//"http://public.ecidi.com/Catalog/FoxitToolView.asp?fileurl=http%3A//public.e…di.com/odworking/7DE51D_11181F0_2C2.pdf&engfilename=7DE51D_11181F0_2C2.pdf";
		console.log(url);
		var fileurl = getQueryStringRegExp(url, 'fileurl');
		console.log(fileurl);
		if (fileurl) {
			//window.location.assign(fileurl); 
			window.frames['main'].document.getElementById('PdfFileArea').src = fileurl;
			//window.document.title=title;
		} else {
			var PdfFileArea = window.frames['main'].document.getElementById('downloadfileArea');
			if (PdfFileArea) {
				var a = PdfFileArea.contentDocument.getElementsByTagName('a')[0];
				//"FileView('http://public.ecidi.com/odworking/7DE6A_1113290_2C2.pdf','7DE6A_1113290_2C2.pdf')"
				fileurl = a.getAttribute('onclick').substring(10, a.getAttribute('onclick').indexOf(',') - 1);
				console.log(fileurl);
				//window.location.assign(fileurl); 
				window.frames['main'].document.getElementById('PdfFileArea').src = fileurl;
				//window.document.title =title;
			}
		}
		window.document.title = window.frames['main'].document.getElementById('main_content').innerText
	}
	//http://public.ecidi.com/PublicArticls/2014/2014-7/190482.html
	else if (window.document.location.host == "public.ecidi.com" && window.document.location.pathname.split('/')[1] == 'PublicArticls') {
		var url = window.document.getElementById('PdfFileArea').src; //查找文件地址
		//"http://public.ecidi.com/Catalog/FoxitToolView.asp?fileurl=http%3A//public.e…di.com/odworking/7DE51D_11181F0_2C2.pdf&engfilename=7DE51D_11181F0_2C2.pdf";
		console.log(url);
		var fileurl = getQueryStringRegExp(url, 'fileurl');
		console.log(fileurl);
		if (fileurl) {
			//window.location.assign(fileurl); 
			window.document.getElementById('PdfFileArea').src = fileurl;
			//window.document.title=title;
		} else {
			var PdfFileArea = window.document.getElementById('downloadfileArea');
			if (PdfFileArea) {
				var a = PdfFileArea.contentDocument.getElementsByTagName('a')[0];
				//"FileView('http://public.ecidi.com/odworking/7DE6A_1113290_2C2.pdf','7DE6A_1113290_2C2.pdf')"
				fileurl = a.getAttribute('onclick').substring(10, a.getAttribute('onclick').indexOf(',') - 1);
				console.log(fileurl);
				//window.location.assign(fileurl); 
				window.document.getElementById('PdfFileArea').src = fileurl;
				//window.document.title =title;
			}
		}
		window.document.title = window.document.getElementById('main_content').innerText
	}
	//Convert();
}

/**
 * 过滤URL，选择需要执行的操作
 */
function URLParse() {
	// $("body").click(function(e) {
	// 	//if ($(e.target).is('a') || $(e.target).is('input:button')) 
	// 	{
	// 		console.log("click");
	// 		window.setTimeout(function() {
	// 			var url = GetSelectedTabURL();
	// 			if (url != "")
	// 				Convert(url);
	// 		}, 1000);
	// 	}
	// });
	//Request URL:http://public.ecidi.com/Public/Public_Query.asp?PKID=20814&strCataName=%u516C%u53F8%u6587%u4EF6&strURI=jcgswj&X1=nLjKmI5KaIbJ&X2=mKiLmIlBpBnBpCmEpDoEAQwMsCrEyEoBmA&_t=280971&_winid=w8725
	if (window.document.location.pathname == "/Public/Public_Query.asp") {
		Convert(window.document.location.href);
		console.log(window.document.location.href);
	}
	//首页新闻通知
	if (window.document.location.pathname == "/Catalog/Public_ViewFilesframe.asp") {
		OpenFile();
		console.log(window.document.location.href);
	}

	//子页面文件
	if (window.document.location.host == "public.ecidi.com" && window.document.location.pathname.split('/')[1] == 'PublicArticls') {
		OpenFile();
		console.log(window.document.location.href);
	}
	
}

function bindevent(e){
	if ($(e.target).is('a') || $(e.target).is('input:button')) 
	{
		console.log("click");
	}
}
function load(){
	for (var i = 0; i < window.frames.length; i++) {
		window.frames[i].document.body.onclick=function(e){bindevent(e)};
	};
	$("a").click(function(e) {
		bindevent(e)
		// if ($(e.target).is('a') || $(e.target).is('input:button')) 
		// {
		// 	console.log("click");
		// }
	});
	window.setTimeout(function() {
				URLParse();
			}, 1000);
}	
window.onload = load();

/**
 * 将列表数据转为可视界面
 */
function Convert(url) {
	if (typeof(url) != "undefined") {
		var position = url.indexOf(".asp");
		if (position <= 0)
			return;
		url = url.substr(0, position) + "_xml" + url.substr(position);
		$.post(url + "&IsExec=True&RequestAction=queryload",
			function(xml) {
				var items = xml.getElementsByTagName("Item");
				var table = "<table border='1'>";
				for  (i  =  0; i  < items.length; i++) {
					table += "<tr>";
					//htmlurl='../PublicArticls / 2014 / 2014 - 7 / 190538.html ' 
					var url = "http://public.ecidi.com" + items[i].getAttribute("htmlurl").substring(2);
					table += "<td><a href=" + url + " target=\"_blank\">"
					table += items[i].getAttribute("contenttitle");
					table += "</a></td>"
					table += "<td>"
					table += "http://public.ecidi.com" + items[i].getAttribute("htmlurl");
					table += "</td>"
					table += "</tr>";
				}
				table += "</table>";
				xmlToView(table);
			}, 'xml');
	}
}

function xmlToView(xml) {
		console.log(xml);
		document.getElementById(tabid).innerHTML = xml;
	}
	/**
	 * 转换xml文件
	 * @param {[type]} xml
	 */
function Parse(xml) {
	try //Firefox, Mozilla, Opera, etc. 
	{
		parser = new DOMParser();
		xmlDoc = parser.parseFromString(xml, "text/xml");
		console.log(xmlDoc.getElementsByTagName("List"));
	} catch (e) {}
}
var tabid;
/**
 * 获取当前选中的tab页
 */
function GetSelectedTabURL() {
	var tabs = window.document.getElementsByClassName('mini-tabs-bodys')[0];
	for (var i = 1; i <= tabs.childElementCount; i++) {
		if (tabs.children[i].style.display != "none") {
			try {
				tabid = tabs.children[i].id;
				return document.getElementById(tabid).children[0].src;
			} catch (e) {
				console.log(tabid)
			}
		}
	};
	return "";
}