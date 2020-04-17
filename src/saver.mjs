/*
* TTL Solid Pod Datasaver
* Author: Thijs Paelman, Flor Sanders
* Project: VOP 2020 - IoT & Solid
* Date: 2020/04/11
* Description: Small script which loads data from a static turtle file and saves it to a specified location on a solid pod.
*/

// Importing required libraries
import auth from 'solid-auth-cli';	// Solid authorization library for node/command line
import $rdf from 'rdflib';		// Rdf graph manipulation library
import {credentials} from '../config/config.mjs'// Namespaces

// Program parameters
const database = "https://iotsolidugent.inrupt.net/private/static.ttl"; // Static turtle file stored on solid pod
const doc = $rdf.sym(database);

// Creating rdf lib constructs to be used with solid-auth-cli
const store = $rdf.graph();
const fetcher = new $rdf.Fetcher(store);
const updater = new $rdf.UpdateManager(store);

// Discovering storage
// inspiration: notepod (with plandoc)
const webId = 'https://iotsolidugent.inrupt.net/profile/card#me'
function getPodData() {
	const profile = store.sym(webId);	// subj
	const profileDoc = id.doc();		// doc

	const solidstorage = store.any(profile, SPACE('storage'), null, profileDoc);			// container
	const privateTypeIndex = store.any(profile, SOLID('privateTypeIndex'), null, profileDoc);	// doc

	//find iotDoc
	let st1 = new $rdf.Statement($rdf.bnode(), RDF('type'), SOLID('TypeRegistration'), privateTypeIndex);
	let st2 = new $rdf.Statement($rdf.bnode(), SOLID('forClass'), SCHEMA('TextDigitalDocument'), privateTypeIndex)); // subj
	//
	const iotTypeRegistration = store.match(null, RDF('type'), SOLID('TypeRegistration'), privateTypeIndex)
		.concat(store.match(null, SOLID('forClass'), SCHEMA('TextDigitalDocument'), privateTypeIndex)); // subj
	if(!iotTypeRegistration) { //is empty --> create one
	}
}

// Loging in using solid-auth-cli
console.log(`Loggin in...`);
auth.login(credentials).then(session => {
	console.log(`Logged in as ${session.webId}`);
	// Using the fetcher to get our graph stored in the solid datapod
	updater.addDownstreamChangeListener(doc, fancyFunction);
	updater.reloadAndSync(doc);
}).catch(err => console.log(`Login error: ${err}`));

// graph is a string of n3
export default function addResourceMeasurement(graph) {
	const tempStore = new $rdf.Formula;
	//const tempStore = $rdf.graph(); // VERY STRANGE: IndexedFormula doesn't work, but graph() does... They SHOULD be synonym
	$rdf.parse(graph, tempStore, doc.uri, 'text/turtle');
	//console.log(tempStore)
	updater.update(null, tempStore, callbackUpdate);
}
function callbackUpdate(uri, success, err) {
	if(success) {
		console.log("Succes for " + uri + "and the err body is" + err);
	}
	else {
		console.log("No succes for" +uri+ "so the err body is " +err);
	}
}

async function fancyFunction() {
	console.log("addDownstreamChangeListener has callbacked");
	//console.log($rdf.serialize(doc, store, 'http://exam.com', 'text/turtle'));
}
