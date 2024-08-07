// ==================================
// Element scroller
//
// Description:
// this mimics the behavior of position
// sticky for an element.
//
// Note:
// This should be reworked to be usable for other uses,
// but that won't happen until I need it for something else.
// ==================================
function Scroller()
{
	this._element = null; // static element
	this._elementParent = null; // static node containing element.
	this._isTicking = false;
	this._isHooked = false;
	this._handlerOnScroll = null;
	this._handlerOnResize = null;
	this._topOffset = 16; // in pixels

	this.Init = function(elementClass)
	{
		// Animating any property on a relatively postionned element isnt smooth.
		// Instead, lets put a hidden clone of the element so that the container keeps its dimensions, and fix the list on the viewport when the viewport is scrolled below the list's static position.

		this._handlerOnScroll = this.onScroll.bind(this);
		this._handlerOnResize = this.onResize.bind(this);

		let elements = document.getElementsByClassName(elementClass);
		if (elements.length < 1)
			return false;

		this._element = elements.item(0);
		this._elementParent = this._element.parentElement;
		if (this._elementParent == null)
			return false;

		let cloneElement = this._element.cloneNode(true);
		cloneElement.className += " clone";
		cloneElement.style.visibility = "hidden";
		this._elementParent.insertBefore(cloneElement, this._element.nextSibling);
		this._element.style.position = "fixed";
		// Update on page load, before any
		// scrolling/resizing can occur.
		this.requestTick();
		return true;
	};
	this.Start = function()
	{
		if (!this._isHooked)
		{
			document.addEventListener("scroll", this._handlerOnScroll, false);
			window.addEventListener("resize", this._handlerOnResize, false);
			this._isHooked = true;
		}
	};
	this.Stop = function()
	{
		if(this._isHooked)
		{
			document.removeEventListener("scroll", this._handlerOnScroll, false);
			window.removeEventListener("resize", this._handlerOnResize, false);
			this._isHooked = false;
		}
	};
	this.onScroll = function()
	{
		this.requestTick();
	};
	this.onResize = function()
	{
		this.requestTick();
	};
	this.requestTick = function()
	{
		if (this._isTicking == false)
		{
			this._isTicking = true;
			window.requestAnimationFrame(this.updateElement.bind(this));
		}
	};
	this.updateElement = function()
	{
		var bounds = this._elementParent.getBoundingClientRect();
		// Top bound:
		// Negative => above viewport top
		// Position => below viewport top
		let matchContainerPosition = !(bounds.top <= this._topOffset);

		let top = matchContainerPosition ? bounds.top : this._topOffset;
		this._element.style.top = top + "px";
		this._element.style.width = bounds.width + "px";
		this._element.style.left = bounds.left + "px";
		
		// ------------------------------
		// Hack: dynamically resize menu's height.
		// This piece of code should be refactored out of Scroller.
		// ------------------------------
		let bottomMargin = 30;
		let margin = matchContainerPosition ? 
			bounds.top + bottomMargin:
			this._topOffset + bottomMargin;
		let heightValue = "calc(100vh - " + margin + "px)";
		this._element.style.height = heightValue;
		// ------------------------------

		this._isTicking = false;
	}
}