function isBetween(x, min, max) {
	return x >= min && x <= max;
}

function includes(a, b, x, y) {
	return a <= x && b >= y;
}

// ==================================
// TableOfContent Viewport Indicator
// ==================================
var tocViewport = {
	_isTicking : false,
	_isHooked : false,
	_toc : null,
	_indicator : null,
	Init: function() {
		this._toc = document.getElementById("toc");
		if (this._toc == null) return false;

		this._indicator = document.createElement("div");
		this._indicator.className = "toc-viewport";
		this._toc.appendChild(this._indicator);

		this.updateViewportIndicator();
		this._handlerOnScroll = this.onScroll.bind(this);
		this._handlerOnResize = this.onResize.bind(this);
		return true;
	},
	Start: function() {
		if (!this._isHooked) {
			document.addEventListener("scroll", this._handlerOnScroll, false);
			window.addEventListener("resize", this._handlerOnResize, false);
			this._isHooked = true;
		}
	},
	Stop: function() {
		if(this._isHooked) {
			document.removeEventListener("scroll", this._handlerOnScroll, false);
			window.removeEventListener("resize", this._handlerOnResize, false);
			this._isHooked = false;
		}
	},
	onScroll: function() {
		this.requestTick();
	},
	onResize : function() {
		this.requestTick();
	},
	requestTick: function() {
		if (this._isTicking == false) {
			this._isTicking = true;
			window.requestAnimationFrame(this.onTick.bind(this));
		}
	},
	onTick: function() {
		this.updateViewportIndicator();
		this._isTicking = false;
	},
	getPositionsOfTocItems: function() {
		let positions = [];
		let parentRect = this._toc.getBoundingClientRect();
		for(const item of this._toc.querySelectorAll(".toc-item > a")) {
			let rect = item.getBoundingClientRect();
			positions.push({
				id: item.getAttribute("hId"),
				top: rect.top - parentRect.top,
				bottom: rect.bottom - parentRect.top,
			});
		}
		return positions;
	},
    getSectionsInView: function() {
    	let parent = document.querySelector("article");
        let items = [...parent.querySelectorAll("h1,h2,h3,h4,h5,h6")]
        	.map(x => {
        		let rect = x.getBoundingClientRect();
        		return {
        			id: x.id,
        			top: rect.top + window.scrollY,
        			bottom: rect.bottom + window.scrollY
        		};
    	});
		let vTop = window.scrollY;
		let vBottom = vTop + window.innerHeight;
		// console.group();
		// console.log(`Viewport: ${vTop} -> ${vBottom}`);
		let body = document.body;
	    let html = document.documentElement;
		let documentHeight = Math.max(
			body.scrollHeight,
			body.offsetHeight, 
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );
        let results = [];
		for(let i = 0; i < items.length; i++) {
			let item = items[i];
			let top = item.top;
			let bottom = documentHeight;
			let nextId = i + 1;
			if (nextId < items.length) 
				bottom = items[nextId].top;
			// console.log(`${i}: ${top} -> ${bottom}`);
			let inView = isBetween(top, vTop, vBottom) 
				|| isBetween(bottom, vTop, vBottom)
				|| includes(top, bottom, vTop, vBottom);
			if (inView) {
				results.push(item);
			}
		}
		// console.groupEnd();
		return results;
    },
	updateViewportIndicator: function() {
		let tocItems = this.getPositionsOfTocItems();
		let postItems = this.getSectionsInView();
		let top = 0;
		let bottom = 0;
		if (postItems.length > 0) {
			let first = postItems[0];
			let last = postItems[postItems.length - 1];
			top = tocItems.find(x => x.id === first.id).top;
			bottom = tocItems.find(x => x.id === last.id).bottom;
		}
		this._indicator.style.top = top + "px";
		this._indicator.style.height = (bottom - top) + "px";
	}
}