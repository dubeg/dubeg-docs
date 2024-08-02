// =====================================================
// Trail / Breadcrumbs
// =====================================================
var trailUtil = {
	_urlPathSep : "/",
	_crumbSep : " / ",
	_rootName : "",
	_rootLabel: "Docs",
	_pagedName : "Page",
	_urlOrigin : null,
	_urlPath : null,

	_crumbs : null,
	_crumbLabelClass : null,
	_crumbLinkClass  : null,
	_containerOnInsertClass : null,

	_containerElement : null,

	// ----------------------------------
	// Init
	// ----------------------------------	
	Init: function(urlOrigin, urlPath, containerElement, onInsertClass)
	{
		this._urlOrigin = urlOrigin;
		this._urlPath = urlPath;
		this._containerElement = containerElement;

		this._crumbs = this.CreateCrumbs(urlOrigin, urlPath);
		this._containerOnInsertClass = onInsertClass;
	},

	// ----------------------------------
	// Create Crumbs
	// ----------------------------------
	CreateCrumbs: function(urlOrigin, urlPath)
	{
		var pathParts = urlPath.split(this._urlPathSep);
		var results = [];

		var iFirst = 0;
		var iEnd = 0;
		
		var crumbLabel = "";
		var crumbURL = "";

		if (pathParts[0] == "")
			iFirst = 1;
		if (pathParts[pathParts.length - 1] == "")
			iEnd = pathParts.length - 2;

		crumbLabel = this._rootLabel;
		crumbURL = urlOrigin;
		
		results.push(this.NewCrumbLink(crumbURL, crumbLabel));

		for (var i = iFirst; i <= iEnd; i += 1)
		{
			crumbURL += '/' + pathParts[i];
			crumbLabel = pathParts[i];
			crumbLabel = crumbLabel.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join('');

			results.push(this._crumbSep);
			results.push(this.NewCrumbLink(crumbURL, crumbLabel));
		}

		if (iFirst > iEnd)
			results.push(this._crumbSep);

		return results;
	},

	// ----------------------------------
	// New Link
	// ----------------------------------
	NewCrumbLink: function(url, label)
	{
		return "<a href='"+ url + "' >"+ label + "</a>";
	},

	// ----------------------------------
	// New Label
	// ----------------------------------
	NewCrumbLabel: function(label)
	{
		return "<span>" + label + "</span>";
	},

	// ----------------------------------
	// Update UI
	// ----------------------------------
	UpdateUI: function()
	{
		if( this._containerElement !== null )
		{
			this._containerElement.innerHTML = this._crumbs.join("");// Reflow, repaint
			this._containerElement.classList.toggle(this._containerOnInsertClass);// Repaint
		}
	}
}