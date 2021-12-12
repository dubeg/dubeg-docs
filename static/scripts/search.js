var summaryInclude = 60 * 3; // Chars to include per result.
var fuse = null;
var fuseOptions = {
    shouldSort: true,
    includeMatches: true,
    threshold: 0.0,
    location: 0,
    distance: 100,
    minMatchCharLength: 3,
    keys: [
        {name: "title", weight: 0.8},
        {name: "contents", weight: 0.5}
        // {name: "tags", weight: 0.3},
        // {name: "categories", weight: 0.3}
    ]
};

let tbSearchID = "search-query";
let tbSearch = document.getElementById(tbSearchID);
let searchResultsID = 'search-results';
let searchResults = document.getElementById(searchResultsID);
let templateEmpty = document.getElementById("search-result-template-empty");
let searchResultTemplate = document.getElementById("search-result-template");

function init() {
    if (!tbSearch) {
        console.log(`Input '${tbSearchID}' not found.`);
        return;
    }
    if (!searchResults) {
        console.log(`Panel '${searchResultsID}' not found.`);
        return;
    }
    onKeyDown = debounce((event) => {
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
            else search(query, false);
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

function clearResultBox() {
    searchResults.innerHTML = templateEmpty.innerHTML;
}

async function search(query) {
    hasResults = false
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
        let results = fuse.search(query);
        if (results.length > 0) {
            hasResults = true;
            populateResults(results, query);
        }
        toggleResultBox(true);
    }
    catch(error) {
        console.log(error);
    }
    finally {
        if (!hasResults) 
            clearResultBox();
    }
}

function populateResults(results, queryToHighlight) {
    let searchQuery = queryToHighlight;
    let templateDefinition = searchResultTemplate.innerHTML;
    htmlResult = "";
    console.log(results);
    results.forEach(function (value, key) {
        // ---------------
        let matches = value.matches
        // matches = [ {indices:[[startIdx,endIdx]], key:"<itemProperty>", value:"<queryTerm>" ]
        // ---------------
        let item = value.item;
        let contents = item.contents;
        let snippet = contents.substring(0, summaryInclude) + '&hellip;';
        let output = render(templateDefinition, {
            key: key,
            title: item.title,
            link: item.permalink,
            snippet: snippet
        });
        htmlResult += output;
    });
    // TODO: add mark.js (highlight matches)
    searchResults.innerHTML = htmlResult;
}

function render(templateString, data) {
    let x = templateString;
    x = x.replaceAll('{key}', data.key);
    x = x.replaceAll('{title}', data.title);
    x = x.replaceAll('{link}', data.link);
    x = x.replaceAll('{snippet}', data.snippet);
    return x;
}

function debounce(func, timeout = 200){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

init();