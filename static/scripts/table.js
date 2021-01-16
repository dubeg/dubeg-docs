function InitTables() {
    // Wraps table in divs
    // ---------------------------
    // Idea: create a button that toggles the class
    // on contain-table to set overflow:visible.
    let post = document.querySelector(".post-content");
    let postWidth = post.getBoundingClientRect().width;
    let nodes = post.childNodes

    for (let i = 0; i < nodes.length; i++) 
    {
        let node = nodes[i]
        if (node.tagName !== "TABLE") continue;
        let tableWidth = node.getBoundingClientRect().width;
        if (tableWidth < postWidth) continue;
        
        let wrapper = document.createElement('div');
        let scroll = document.createElement('div');
        let darkScreen = document.createElement('div');
        let btnContainer = document.createElement('div');
        let btnExpand = document.createElement('div');
        
        wrapper.classList.add('contain-table');
        darkScreen.classList.add('dark-screen');
        darkScreen.addEventListener('toggleExpand', ToggleExpand);
        darkScreen.addEventListener('click', OnClickTriggerExpand);
        btnContainer.classList.add("btn-container");
        btnExpand.classList.add("btn-expand");
        scroll.classList.add('contain-table-scroll');
        scroll.classList.add('dragscroll');

        darkScreen.appendChild(wrapper);
        wrapper.appendChild(btnContainer);
        wrapper.appendChild(scroll);
        btnContainer.appendChild(btnExpand);
        node.after(darkScreen);
        scroll.appendChild(node);
        
        dragscroll.reset()
    }
}

function findAncestor(el, cls) {
    let src = el;
    while (!src.classList.contains(cls)) {
        src = src.parentElement;
    }
    return src;
}

function OnClickTriggerExpand(clickEvent) {
    if (clickEvent.target.classList.contains("dark-screen")
        || clickEvent.target.classList.contains("btn-expand"))
    {
        clickEvent.stopPropagation();
        let expandEvent = new Event('toggleExpand');
        clickEvent.currentTarget.dispatchEvent(expandEvent);
    }
}

function ToggleExpand(event) {
    let currentTarget = event.currentTarget;
    if (currentTarget.classList.contains("dark-screen"))
    {
        currentTarget.classList.toggle("expanded");
        event.stopPropagation();
    }
}