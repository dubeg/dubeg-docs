document.addEventListener("DOMContentLoaded", function(event) { 
	document.getElementById('menu-icon').addEventListener(
		"click",
		OnMenuIconClick,
		true
	);
	document.getElementById('meta-icon').addEventListener(
		"click",
		OnMetaIconClick,
		true
	);	
});


function OnMenuIconClick()
{
	var navContainer = document.getElementById('nav-container');
	navContainer.classList.toggle('nodisplay');
}
function OnMetaIconClick()
{
	var navContainer = document.getElementById('metabar');
	navContainer.classList.toggle('nodisplay');
}
