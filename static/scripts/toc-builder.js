// ==================================
// Generating Table of content
// ==================================
var tocBuilder = {
	_headingSelectors : "h2,h3,h4,h5,h6",
	_minimumSections : 1,
	Build: function(srcID, destID) {
		let elSrc = document.getElementById(srcID);
		let elDest = document.getElementById(destID);
		if (elSrc === null ) return false; 
		if (elDest === null) return false;
		let headings = elSrc.querySelectorAll(this._headingSelectors);
		if(headings.length < this._minimumSections) return false;
		
		let titleNode = this.BuildItem("", "Sections", 0, "div");
		let listNode = document.createElement("ol");
		listNode.setAttribute("class", "toc-list");

		let parent = listNode;
		let prevNode = null;
		let prevNo = 2;

		for(const heading of headings) {
			let no = Number.parseInt(heading.nodeName[1]);
			if (no > prevNo) {
				parent = document.createElement("ol");
				prevNode.appendChild(parent);
			}
			else {
				for(let j = prevNo; j > no; --j) 
					parent = parent.parentNode.parentNode;
			}
			let node = this.BuildItem(heading.id, heading.textContent, no);
			parent.appendChild(node);
			prevNode = node;
			prevNo = no;
		}
		elDest.appendChild(titleNode);
		elDest.appendChild(listNode);
		return true;
	},
	BuildItem : function(id, label, no, tagName = "li") {
		var item = document.createElement(tagName);
		item.classList.add("toc-item");
		item.classList.add(`toc-h${no}`);
		
		var anchor = document.createElement("a");
		anchor.setAttribute("href", "#" + id.toLowerCase());
		anchor.setAttribute("hId", id.toLowerCase());
		anchor.textContent = label;
		item.appendChild(anchor);

		return item;
	}
};


