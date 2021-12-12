var summaryInclude = 60;
var fuse = null;
var fuseOptions = {
    shouldSort: true,
    includeMatches: true,
    threshold: 0.0,
    tokenize: true,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        {name: "title", weight: 0.8},
        {name: "contents", weight: 0.5},
        {name: "tags", weight: 0.3},
        {name: "categories", weight: 0.3}
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
    results.forEach(function (value, key) {
        let contents = value.item.contents;
        let snippet = "";
        let snippetHighlights = [searchQuery];
        snippet = contents.substring(0, summaryInclude * 2) + '&hellip;';
        let tags = "";
        if (value.item.tags) {
            value.item.tags.forEach(function (element) {
                tags = tags + "<a href='/tags/" + element + "'>" + "#" + element + "</a> "
            });
        }
        let output = render(templateDefinition, {
            key: key,
            title: value.item.title,
            link: value.item.permalink,
            tags: tags,
            categories: value.item.categories,
            snippet: snippet
        });
        htmlResult += output;
        // ------------
        // TODO:
        // Replace document by unattached DOM model.
        // ------------
        // snippetHighlights.forEach(function (snipvalue, snipkey) {
        //     let instance = new Mark(document.getElementById('summary-' + key));
        //     instance.mark(snipvalue);
        // });
    });
    searchResults.innerHTML = htmlResult;
}

function render(templateString, data) {
    var conditionalMatches, conditionalPattern, copy;
    conditionalPattern = /\$\{\s*isset ([a-zA-Z]*) \s*\}(.*)\$\{\s*end\s*}/g;
    //since loop below depends on re.lastInxdex, we use a copy to capture any manipulations whilst inside the loop
    copy = templateString;
    while ((conditionalMatches = conditionalPattern.exec(templateString)) !== null) {
        if (data[conditionalMatches[1]]) {
            //valid key, remove conditionals, leave contents.
            copy = copy.replace(conditionalMatches[0], conditionalMatches[2]);
        } else {
            //not valid, remove entire section
            copy = copy.replace(conditionalMatches[0], '');
        }
    }
    templateString = copy;
    //now any conditionals removed we can do simple substitution
    var key, find, re;
    for (key in data) {
        find = '\\$\\{\\s*' + key + '\\s*\\}';
        re = new RegExp(find, 'g');
        templateString = templateString.replace(re, data[key]);
    }
    return templateString;
}

function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

init();