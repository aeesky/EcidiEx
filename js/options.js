var Options =
{
    "autoopen": ["checked", true],
};
function close()
{
	window.self.close();
}


function save_options()
{
	changeIcon();
	for (key in Options)
    {
        if (Options[key][0] == "checked")
        {
            Options[key][1] = document.getElementById(key).checked;
        }
    }
	localStorage["ColorOptions"] = JSON.stringify(Options);
}

function initIcon()
{
	var localOptions = JSON.parse(localStorage["ColorOptions"]);
	if(localOptions['autoopen'][1] == true) {
		chrome.browserAction.setIcon({
			path: "on.png"
		})
	}
}
function changeIcon()
{
	if (document.getElementById('autoopen').checked) {
		chrome.browserAction.setIcon({
			path: "on.png"
		})
	}
	else {
		
		chrome.browserAction.setIcon({
			path: "onff.png"
		})
	}
}

function restore_options()
{
    var localOptions = JSON.parse(localStorage["ColorOptions"]);
    
    for (key in localOptions)
    {
        optionValue = localOptions[key];
        if (!optionValue) return;
        var element = document.getElementById(key);
        if (element)
        {
            element.value = localOptions[key][1];
            element.checked = element.value
        }
    }
}

function goFeedback()
{
	window.open("http://tiny.sinaapp.com/");
}
