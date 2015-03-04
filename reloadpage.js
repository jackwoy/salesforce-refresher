function checkPage(){
	// Check that we're on the right view, first.
	var dropdown = document.getElementsByName('fcf')[0];
	if (dropdown.options[dropdown.selectedIndex].value != "00B700000070X6F")
	{
		// If we're not on the right page...
		// Set a timer to recheck, in case the dropdown is changed.
		console.log("Not on the queue page. Sleeping for 60 seconds...")
		setTimeout("checkPage();", 60000);
		// And stop.
		return;
	}

	console.log("Checking for Salesforce cases div.")
	if (isSalesforceDivLoaded()){
		console.log("Div has loaded, checking cases.")
		checkForCases();
	}
	else{
		console.log("Div not loaded yet, will check again in 3 seconds.")
		setTimeout("checkPage();", 3000);
	}
}

function isSalesforceDivLoaded()
{
	var loadingDiv = document.getElementsByClassName('bottomNav');
	if (loadingDiv.length == 0){
		return false;
	}
	else if (loadingDiv.length > 0 && loadingDiv[0].innerHTML == "Loading..."){
		return false;
	}
	else{
		return true;
	}
	// if div 00B700000070X6F_bottomNav contains Loading...
	// Not loaded. Set timeout to run this function again
	// And return false.
	// Otherwise...
	// Check for cases
}

function checkForCases()
{
	// If the number of divs with class x-grid-empty is 0
	if (document.getElementsByClassName('x-grid-empty').length == 0)
	{
		// We have a case! Raise the alarm!
		console.log("Case found!");
		//alert("Uh oh!");
		var alertAudioPath = chrome.extension.getURL('icq.mp3');
		console.log("Audio file path is: " + alertAudioPath);
		var audio = new Audio(alertAudioPath);
		audio.play();
	}
	// Set a timeout to refresh the page in 60 seconds.
	setTimeout("reloadPage();", 60000);
}

function reloadPage()
{
	// Check whether the dropdown is still on the unassigned tickets value.
	var dropdown = document.getElementsByName('fcf')[0];
	if (dropdown.options[dropdown.selectedIndex].value == "00B700000070X6F")
	{
		window.location.href = "https://na5.salesforce.com/500?fcf=00B700000070X6F";
	}
	else
	{
		// We're not on the right page any more, so go back to checkPage.
		checkPage();
	}
}

checkPage();