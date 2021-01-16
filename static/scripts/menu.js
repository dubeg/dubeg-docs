"use strict";

var menuUtil = {
	// --------------------
	_storageKey: "expandedMenuItems",
	// --------------------
	_navContainerClass: ".page-nav",
	_sectionHeaderClass: ".nav-section-header",
	_linksContainerID: ".nav-section-links",
	// --------------------
	_expandedClass: "expand",
	_attrMenuID: "menuid",
	// --------------------
	_expandedMenuItems: new Set(),
	// --------------------
	LoadListFromStorage: function() { 
		let str = window.localStorage.getItem(this._storageKey) || "";
		if (str !== "") {
			let items = str.split(",")
			for (let i = 0; i < items.length; i += 1) {
				let item = items[i]
				if (item === "") continue;
				if (!this._expandedMenuItems.has(item))
					this._expandedMenuItems.add(item);
			}
		}
	},
	SaveStateInList: function(menuId) {
		if (this._expandedMenuItems.has(menuId))
			this._expandedMenuItems.delete(menuId);
		else
			this._expandedMenuItems.add(menuId);
	},
	SaveListToStorage: function() {
		let str = "";
		for (let item of this._expandedMenuItems) {
			str += item.toString() + ","
		}
		window.localStorage.setItem(this._storageKey, str);
	},
	ToggleExpand: function(element) {
		// Parent => nav-section
		let parent = element.parentElement;
		parent.classList.toggle(this._expandedClass);
	},
	OnHeaderClick: function(event) {
		let element = event.target;
		let menuId = element.getAttribute(this._attrMenuID)
		this.ToggleExpand(element);
		this.SaveStateInList(menuId);
		this.SaveListToStorage();
	},
	Run: function() {
		this.LoadListFromStorage()
		// ---------------------------------
		// Restore state & hook on click.
		// ---------------------------------
		let container = document.querySelector(this._navContainerClass);
		let elements = container.querySelectorAll(this._sectionHeaderClass);
		for (let i = 0; i < elements.length; i += 1) {
			let element = elements[i];
			let menuId = element.getAttribute(this._attrMenuID)
			if (this._expandedMenuItems.has(menuId)) {
				this.ToggleExpand(element);
			}
			element.addEventListener("click", this.OnHeaderClick.bind(this));
			// Prevent selecting text on double click.
			element.addEventListener('mousedown', function(e){ e.preventDefault(); }, false);
		}
	}
};