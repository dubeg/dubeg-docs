let fuseURL = '/scripts/fuse.min.js';
self.importScripts(fuseURL);
onmessage = async (e) => {
	let pages = e.data.pages;
	let fuseOptions = e.data.fuseOptions;
	let query = e.data.query;
	let callId = e.data.callId;
	let fuse = new Fuse(pages, fuseOptions);
	let results = await fuse.search(query);
    postMessage({
    	results:results,
    	callId: callId
    });
};