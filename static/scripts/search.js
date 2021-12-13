var summaryInclude = 60 * 3; // Chars to include per result.
var fuse = null;
var fuseOptions = {
    tokenize: true,
    shouldSort: true,
    includeMatches: true,
    threshold: 1,
    location: 0,
    distance: 100,
    ignoreLocation: true,
    ignoreFieldNorm: true,
    minMatchCharLength: 3,
    keys: [
        {name: "title", weight: 0.8},
        {name: "contents", weight: 0.5}
        // {name: "tags", weight: 0.3},
        // {name: "categories", weight: 0.3}
    ]
};
let domParser = new DOMParser();
let tbSearchID = "search-query";
let tbSearch = document.getElementById(tbSearchID);
let searchResultsID = 'search-results';
let searchResults = document.getElementById(searchResultsID);
let templateEmpty = document.getElementById("search-result-empty");
let templateSearchResult = document.getElementById("search-result");

function init() {
    if (!tbSearch) {
        console.log(`Input '${tbSearchID}' not found.`);
        return;
    }
    if (!searchResults) {
        console.log(`Panel '${searchResultsID}' not found.`);
        return;
    }
    onKeyDown = debounce(async (event) => {
            // console.log('Searching')
            if (event.key === "Escape") {
                tbSearch.value = "";
                toggleResultBox(open = false);
                return;
            }
            else if (event.key === "Enter") 
                return;
            
            let query = tbSearch.value;
            if (!query) toggleResultBox(open = false);
            resultNodes = await search(query);
            searchResults.replaceChildren(...resultNodes);
            toggleResultBox(true);
    });
    tbSearch.addEventListener('keydown', onKeyDown);
    // --
    var onBlur = (event) => {
        if (isTargetRelevant(event.target)) return;
        toggleResultBox(false);
    };
    // DUBEG: unneeded.
    // tbSearch.addEventListener('blur', onBlur);
    // searchResults.addEventListener('blur', onBlur);
    document.addEventListener('click', onBlur);
}

function isTargetRelevant(target) {
    return target === tbSearch
        || target === searchResults
        || searchResults.contains(target);
}


function toggleResultBox(open) {
    if (open) { searchResults.classList.remove("close"); }
    else { searchResults.classList.add("close"); }
}

async function search(query) {
    try {
        if (fuse == null) {
            // console.log('Fetching search index');
            // Note: 
            // Fetch() raises an error to be caught in try/catch
            // if there's a network error.
            response = await fetch('/index.json');
            if (!response.ok) {
                console.log(`Couldnt fetch the search index (HttpStatusCode: ${response.status})`);
                return;
            }
            pages = await response.json(); 
            fuse = new Fuse(pages, fuseOptions);
        }
        let results = await fuse.search(query);
        let nodes = [];
        for(const x of results) {
            // ---------------
            // x.item.categories
            // x.item.contents
            // x.item.tags
            // x.item.permalink
            // x.item.title
            // x.refIndex
            // x.matches = [ {indices:[[startIdx,endIdx]], key:"<itemProperty>", value:"<queryTerm>" ]
            // ---------------
            let item = x.item;
            let itemEx = {
                title: item.title,
                link: item.permalink,
                // DUBEG: not sure it's a good idea to use the domParser.
                snippet: domParser.parseFromString(
                    item.contents.substring(0, summaryInclude),
                    'text/html'
                ).body.innerText
            };
            let rootNode = templateSearchResult.content.firstElementChild.cloneNode(true);
            let stack = [];
            stack.push(rootNode);
            while (stack.length > 0) {
                let node = stack.pop();
                if (node.nodeType === Node.TEXT_NODE) {
                    node.nodeValue = formatString(node.nodeValue, itemEx);
                }
                if (node.attributes && node.attributes.length) {
                    for (let i = 0; i < node.attributes.length; i += 1) {
                        let attr = node.attributes[i];
                        if (attr.specified) {
                            attr.value = formatString(attr.value, itemEx);
                        }
                    }
                }
                if (node.childNodes && node.childNodes.length) {
                    for (let i = 0; i < node.childNodes.length; i += 1) {
                        stack.push(node.childNodes[i]);
                    }
                }
            }
            nodes.push(rootNode);
        }
        if (nodes.length === 0)
            nodes.push(templateEmpty.content.firstElementChild.cloneNode(true));
        return nodes;
    }
    catch(error) {
        console.log(error);
    }
}

function formatString(str, item) {
    str = str.replace("{title}", item.title);
    str = str.replace("{snippet}", item.snippet);
    str = str.replace("{link}", item.link);
    return str;
}

function debounce(func, timeout = 200){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

init();