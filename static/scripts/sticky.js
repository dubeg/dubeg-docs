// ==================================
// Change height of sticky div 
// ==================================
var stickySizer = {
    _updating: false,
    _element: null,
    Init: function(elementClass) {
        let elements = document.getElementsByClassName(elementClass);
        if (elements.length < 1) return false;
        this._element = elements.item(0);
        this.update();
        document.addEventListener("scroll", this.requestUpdate.bind(this), false);
    },
    requestUpdate: function() {
        if (this._updating) return;
        this._updating = true;
        window.requestAnimationFrame(this.update.bind(this));
    },
    update: function() {
        let bounds = this._element.getBoundingClientRect();
        // Top bound:
        // Negative => above viewport top
        // Position => below viewport top
        if (bounds.top <= 0) {
            this._element.style.height = "100vh";
        }
        else {
            let topHeight = bounds.top;
            this._element.style.height = `calc(100vh - ${topHeight}px)`;
        }
        this._updating = false;
    }
};