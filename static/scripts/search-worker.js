let pages = null;
let fuseOptions = {
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
let callId = 0;

onmessage = async (e) => {
    callId += 1;
    query = e.data.query;
    if (!pages) {
        response = await fetch('/index.json');
        if (!response.ok) {
            console.log(`Couldnt fetch the search index (HttpStatusCode: ${response.status})`);
            return;
        }
        pages = await response.json(); 
    }
    let params = {
        fuseOptions: fuseOptions,
        pages: pages,
        query: query,
        callId: callId
    };
    let worker = new Worker('search-worker-query.js');
    worker.addEventListener('message', (e) => {
        if (callId === e.data.callId)
            self.postMessage({results: e.data.results});
        worker.terminate();
    });
    worker.postMessage(params);
}