function getQueryStringRegExp(value,name)
		{
		    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");  
		    if (reg.test(value)) return unescape(RegExp.$2.replace(/\+/g, " ")); return "";
		};
		
function OpenFile()
{
	//http://public.ecidi.com/Catalog/Public_ViewFilesframe.asp?htmlurl=../PublicArticls/2014/2014-5/187620.html&ID=187620&StrFolder=QYTZ&strCataName=%E5%85%A8%E9%99%A2%E9%80%9A%E7%9F%A5&X1=mKlMlL5KeM9L&X2=nLhIiMkAnDpDnArBnBmEDTBRtDpCtAvBwD
	console.log('initial')
	if(window.document.location.pathname =="/Catalog/Public_ViewFilesframe.asp") //页面过滤
	{
		var url = 	window.frames['main'].document.getElementById('PdfFileArea').src; //查找文件地址
		//"http://public.ecidi.com/Catalog/FoxitToolView.asp?fileurl=http%3A//public.e…di.com/odworking/7DE51D_11181F0_2C2.pdf&engfilename=7DE51D_11181F0_2C2.pdf";
		console.log(url);
		var fileurl =getQueryStringRegExp(url,'fileurl');
		console.log(fileurl);
		if(fileurl)
			window.location.assign(fileurl); 
	}
}

// document.addEventListener('DOMContentLoaded', function () {
//   OpenFile();
// });
window.onload = OpenFile;