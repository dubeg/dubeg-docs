// --------------------------------------
// Create breadcrumbs bar below header.
// --------------------------------------
function InitTrail() {
	var location = window.location;
	var uriOrigin = location.origin;
	var uriPath = location.pathname;
	var classOnInsert = "visible";

	var elemtTrail = document.getElementById("site-trail-placeholder");
	trailUtil.Init(uriOrigin, uriPath, elemtTrail, classOnInsert);
	trailUtil.UpdateUI();
}

// --------------------------------------
// Create T.o.C. next to article.
// --------------------------------------
function InitTableOfContent() {
	let postID = "post";
	let tocID = "toc";
	if (tocBuilder.Build(postID, tocID)) {
		// Animate viewport indicator in T.o.C.
		if (tocViewport.Init())
			tocViewport.Start();
	}
}


// ------------------------
// Initialize scripts.
// ------------------------
function main() {
	// --
	// Sticky
	// --
	// stickySizer.Init("page-nav");
	// --
	// Expanded-collapsed state.
	// --
	menuUtil.Run();
	InitTrail();
	InitTableOfContent();
	InitTables();
}


// Event DOMContentLoaded fires once HTML is loaded.
// document.addEventListener('DOMContentLoaded', earlyInit);
// Event Window.load fires when DOM, CSSOM, images are loaded.
window.addEventListener('load', main);