(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/lib/firebaseClient.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/firebaseClient.js
__turbopack_context__.s([
    "firebaseConfig",
    ()=>firebaseConfig,
    "getAuthInstance",
    ()=>getAuthInstance,
    "getDB",
    ()=>getDB,
    "getFirebaseApp",
    ()=>getFirebaseApp,
    "initFirebase",
    ()=>initFirebase,
    "loginWithGoogle",
    ()=>loginWithGoogle,
    "logout",
    ()=>logout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/esm/index.esm.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm2017.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$database$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/database/dist/esm/index.esm.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/database/dist/index.esm2017.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm2017/index.js [client] (ecmascript)");
;
;
;
const firebaseConfig = {
    apiKey: ("TURBOPACK compile-time value", "AIzaSyCe7rmZj0-vVcAobBeqpyhhqq3DIgP5B28"),
    authDomain: ("TURBOPACK compile-time value", "sala-de-estimativa.firebaseapp.com"),
    databaseURL: ("TURBOPACK compile-time value", "https://sala-de-estimativa-default-rtdb.firebaseio.com/"),
    projectId: ("TURBOPACK compile-time value", "sala-de-estimativa"),
    storageBucket: ("TURBOPACK compile-time value", "sala-de-estimativa.firebasestorage.app"),
    messagingSenderId: ("TURBOPACK compile-time value", "587703034452"),
    appId: ("TURBOPACK compile-time value", "1:587703034452:web:0e50bcc1f2205d34a543c1")
};
let app = null;
let db = null;
let auth = null;
let googleProvider = null;
function initFirebase() {
    if (!app) {
        app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getApps"])().length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getApp"])() : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["initializeApp"])(firebaseConfig);
        db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getDatabase"])(app);
        auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getAuth"])(app);
        googleProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GoogleAuthProvider"]();
    }
    return app;
}
function getFirebaseApp() {
    if (!app) initFirebase();
    return app;
}
function getDB() {
    if (!db) initFirebase();
    return db;
}
function getAuthInstance() {
    if (!auth) initFirebase();
    return auth;
}
function loginWithGoogle() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["signInWithPopup"])(getAuthInstance(), googleProvider);
}
function logout() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["signOut"])(getAuthInstance());
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/styles/home/RoomForm.module.css [client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "box": "RoomForm-module__AdKMea__box",
  "button": "RoomForm-module__AdKMea__button",
  "combobox": "RoomForm-module__AdKMea__combobox",
  "error": "RoomForm-module__AdKMea__error",
  "input": "RoomForm-module__AdKMea__input",
  "inputNome": "RoomForm-module__AdKMea__inputNome",
  "slideUp": "RoomForm-module__AdKMea__slideUp",
  "title": "RoomForm-module__AdKMea__title",
  "wrapper": "RoomForm-module__AdKMea__wrapper",
});
}),
"[project]/components/RoomForm.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/RoomForm.js
__turbopack_context__.s([
    "default",
    ()=>RoomForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebaseClient.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$database$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/database/dist/esm/index.esm.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/database/dist/index.esm2017.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$home$2f$RoomForm$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/styles/home/RoomForm.module.css [client] (css module)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function RoomForm({ onEnter }) {
    _s();
    const [roomId, setRoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [dbReady, setDbReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rooms, setRooms] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RoomForm.useEffect": ()=>{
            const interval = setInterval({
                "RoomForm.useEffect.interval": ()=>{
                    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getDB"])();
                    if (db) {
                        setDbReady(true);
                        clearInterval(interval);
                    }
                }
            }["RoomForm.useEffect.interval"], 100);
            return ({
                "RoomForm.useEffect": ()=>clearInterval(interval)
            })["RoomForm.useEffect"];
        }
    }["RoomForm.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RoomForm.useEffect": ()=>{
            if (!dbReady) return;
            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getDB"])();
            const roomsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ref"])(db, "salas");
            const unsub = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onValue"])(roomsRef, {
                "RoomForm.useEffect.unsub": (snap)=>{
                    const val = snap.val() || {};
                    const list = Object.entries(val).map({
                        "RoomForm.useEffect.unsub.list": ([id, sala])=>({
                                id,
                                nome: sala.nome
                            })
                    }["RoomForm.useEffect.unsub.list"]);
                    setRooms(list);
                }
            }["RoomForm.useEffect.unsub"]);
            return ({
                "RoomForm.useEffect": ()=>unsub()
            })["RoomForm.useEffect"];
        }
    }["RoomForm.useEffect"], [
        dbReady
    ]);
    const handleEnter = ()=>{
        if (!roomId) {
            setError("Selecione uma sala antes de entrar.");
            return;
        }
        setError("");
        onEnter(roomId);
    };
    const isDisabled = !dbReady || !roomId;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$home$2f$RoomForm$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].wrapper,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$home$2f$RoomForm$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].box,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$home$2f$RoomForm$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].title,
                    children: "Entrar na Sala"
                }, void 0, false, {
                    fileName: "[project]/components/RoomForm.js",
                    lineNumber: 58,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$home$2f$RoomForm$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].combobox,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$home$2f$RoomForm$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].input,
                        value: roomId,
                        onChange: (e)=>setRoom(e.target.value),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Selecione uma Sala..."
                            }, void 0, false, {
                                fileName: "[project]/components/RoomForm.js",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this),
                            rooms.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: r.id,
                                    children: r.nome
                                }, r.id, false, {
                                    fileName: "[project]/components/RoomForm.js",
                                    lineNumber: 64,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/RoomForm.js",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/RoomForm.js",
                    lineNumber: 60,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$home$2f$RoomForm$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].error,
                    children: error
                }, void 0, false, {
                    fileName: "[project]/components/RoomForm.js",
                    lineNumber: 71,
                    columnNumber: 19
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$home$2f$RoomForm$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].button} ${isDisabled ? __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$home$2f$RoomForm$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].disabled : ""}`,
                    onClick: handleEnter,
                    disabled: isDisabled,
                    children: dbReady ? "Entrar" : "Carregando..."
                }, void 0, false, {
                    fileName: "[project]/components/RoomForm.js",
                    lineNumber: 73,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/RoomForm.js",
            lineNumber: 57,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/RoomForm.js",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_s(RoomForm, "QiYd6aHHrcVUq5tRIwDYdw5+pfE=");
_c = RoomForm;
var _c;
__turbopack_context__.k.register(_c, "RoomForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/RoomView.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/RoomView.js
__turbopack_context__.s([
    "default",
    ()=>RoomView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$database$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/database/dist/esm/index.esm.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/database/dist/index.esm2017.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebaseClient.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm2017/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
function RoomView({ roomId, user: userProp }) {
    _s();
    const [part, setPart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [roomName, setRoomName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const OPT = [
        3,
        6,
        9,
        12,
        15,
        18,
        21,
        24,
        27,
        30,
        33,
        36
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RoomView.useEffect": ()=>{
            // get user (prefer prop, fallback to auth.currentUser)
            const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getAuth"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getFirebaseApp"])());
            const user = userProp || auth.currentUser;
            if (!user || !roomId) return;
            const uid = user.uid;
            const displayName = user.displayName || "Usuário";
            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getDB"])();
            // Nome da sala
            const salaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ref"])(db, `salas/${roomId}/nome`);
            const unsubSala = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onValue"])(salaRef, {
                "RoomView.useEffect.unsubSala": (snap)=>{
                    setRoomName(snap.val() || "Sala sem nome");
                }
            }["RoomView.useEffect.unsubSala"]);
            // PARTICIPANTES: cleanup / migration / registro
            const participantsRefRoot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ref"])(db, `salas/${roomId}/participantes`);
            // 1) check if old key exists (displayName) and migrate it to uid if needed
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["get"])(participantsRefRoot).then({
                "RoomView.useEffect": (snap)=>{
                    const val = snap.val() || {};
                    const hadUid = !!val[uid];
                    const hadDisplayNameKey = !!val[displayName];
                    if (!hadUid && hadDisplayNameKey) {
                        // migrate data from displayName -> uid
                        const old = val[displayName];
                        const newData = {
                            nome: displayName,
                            escolha: old?.escolha ?? null,
                            revelado: old?.revelado ?? false,
                            migratedFrom: displayName,
                            migratedAt: Date.now()
                        };
                        // write new uid key and remove old key
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["set"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ref"])(db, `salas/${roomId}/participantes/${uid}`), newData).then({
                            "RoomView.useEffect": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["remove"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ref"])(db, `salas/${roomId}/participantes/${displayName}`))
                        }["RoomView.useEffect"]).catch({
                            "RoomView.useEffect": (err)=>console.error("Erro migração participante:", err)
                        }["RoomView.useEffect"]);
                    }
                }
            }["RoomView.useEffect"]).catch({
                "RoomView.useEffect": (err)=>{
                    console.warn("Falha ao checar participantes para migração:", err);
                }
            }["RoomView.useEffect"]);
            // 2) create/update participant record with uid (join)
            const userRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ref"])(db, `salas/${roomId}/participantes/${uid}`);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["set"])(userRef, {
                nome: displayName,
                escolha: null,
                revelado: false,
                joinedAt: Date.now()
            }).catch({
                "RoomView.useEffect": (err)=>console.error("Erro ao set participante:", err)
            }["RoomView.useEffect"]);
            // ensure remove on disconnect
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onDisconnect"])(userRef).remove();
            // 3) subscribe to participants list
            const unsub = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onValue"])(participantsRefRoot, {
                "RoomView.useEffect.unsub": (snap)=>{
                    const val = snap.val() || {};
                    setPart(val);
                    // If this user has a saved escolha (number) keep selection locally.
                    if (val[uid]) {
                        if (typeof val[uid].escolha === "number") {
                            setSelected(val[uid].escolha);
                        } else {
                            setSelected(null);
                        }
                    } else {
                        setSelected(null);
                    }
                }
            }["RoomView.useEffect.unsub"]);
            // cleanup on unmount
            return ({
                "RoomView.useEffect": ()=>{
                    try {
                        unsub();
                        unsubSala();
                    } catch (e) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["remove"])(userRef).catch({
                            "RoomView.useEffect": ()=>{}
                        }["RoomView.useEffect"]);
                    }
                }
            })["RoomView.useEffect"];
        }
    }["RoomView.useEffect"], [
        roomId,
        userProp
    ]);
    // helper to get current user (uid)
    function getCurrentUser() {
        try {
            const app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getFirebaseApp"])();
            const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getAuth"])(app);
            return auth.currentUser;
        } catch (e) {
            return null;
        }
    }
    // Selecionar voto
    function choose(v) {
        const user = getCurrentUser();
        if (!user) return alert("Usuário não autenticado.");
        const uid = user.uid;
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getDB"])();
        setSelected(v);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["update"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ref"])(db, `salas/${roomId}/participantes/${uid}`), {
            escolha: v,
            revelado: false
        }).catch((err)=>console.error("Erro ao escolher:", err));
    }
    // Revelar para todos
    function revealAll() {
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getDB"])();
        Object.keys(part).forEach((p)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["update"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ref"])(db, `salas/${roomId}/participantes/${p}`), {
                revelado: true
            }).catch((e)=>console.error("Erro reveal:", e));
        });
    }
    // Ocultar para todos
    function hideAll() {
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getDB"])();
        Object.keys(part).forEach((p)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["update"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ref"])(db, `salas/${roomId}/participantes/${p}`), {
                revelado: false
            }).catch((e)=>console.error("Erro hide:", e));
        });
    }
    // Limpar todos os votos
    function clearAll() {
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getDB"])();
        Object.keys(part).forEach((p)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["update"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm2017$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ref"])(db, `salas/${roomId}/participantes/${p}`), {
                escolha: null,
                revelado: false
            }).catch((e)=>console.error("Erro clear:", e));
        });
        setSelected(null);
    }
    // Render participant display name (data may be keyed by uid or older key)
    function participantDisplayName(key, data) {
        if (data && data.nome) return data.nome;
        // fallback: if key looks like uid, hide it; else show key
        return key;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-25abeabcf75790ad" + " " + "card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                style: {
                    marginBottom: 8
                },
                className: "jsx-25abeabcf75790ad",
                children: [
                    "Sala: ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        className: "jsx-25abeabcf75790ad",
                        children: roomName
                    }, void 0, false, {
                        fileName: "[project]/components/RoomView.js",
                        lineNumber: 175,
                        columnNumber: 15
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/RoomView.js",
                lineNumber: 174,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "jsx-25abeabcf75790ad",
                children: [
                    "Você: ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        className: "jsx-25abeabcf75790ad",
                        children: participantDisplayName(getCurrentUser()?.uid || "—", {
                            nome: getCurrentUser()?.displayName
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/RoomView.js",
                        lineNumber: 179,
                        columnNumber: 15
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/RoomView.js",
                lineNumber: 178,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 8
                },
                className: "jsx-25abeabcf75790ad" + " " + "grid",
                children: OPT.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>choose(o),
                        style: {
                            padding: "12px",
                            borderRadius: "8px",
                            border: selected === o ? "2px solid #4A90E2" : "1px solid #ccc",
                            backgroundColor: selected === o ? "#4A90E2" : "#ffffff",
                            color: selected === o ? "#ffffff" : "#333",
                            fontSize: "16px",
                            cursor: "pointer",
                            fontWeight: selected === o ? "bold" : "normal"
                        },
                        className: "jsx-25abeabcf75790ad",
                        children: [
                            o,
                            "h"
                        ]
                    }, o, true, {
                        fileName: "[project]/components/RoomView.js",
                        lineNumber: 185,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/RoomView.js",
                lineNumber: 183,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 12,
                    display: "flex",
                    gap: 12
                },
                className: "jsx-25abeabcf75790ad",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: revealAll,
                        className: "jsx-25abeabcf75790ad" + " " + "reveal-btn",
                        children: "Mostrar escolhas"
                    }, void 0, false, {
                        fileName: "[project]/components/RoomView.js",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: hideAll,
                        style: {
                            backgroundColor: "#0a74da",
                            color: "white",
                            padding: "10px 16px",
                            borderRadius: "8px",
                            border: "none",
                            cursor: "pointer",
                            whiteSpace: "nowrap"
                        },
                        className: "jsx-25abeabcf75790ad",
                        children: "Ocultar escolhas"
                    }, void 0, false, {
                        fileName: "[project]/components/RoomView.js",
                        lineNumber: 210,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: clearAll,
                        className: "jsx-25abeabcf75790ad" + " " + "clear-btn",
                        children: "Limpar"
                    }, void 0, false, {
                        fileName: "[project]/components/RoomView.js",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/RoomView.js",
                lineNumber: 205,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                style: {
                    marginTop: 16
                },
                className: "jsx-25abeabcf75790ad",
                children: "Resultados"
            }, void 0, false, {
                fileName: "[project]/components/RoomView.js",
                lineNumber: 231,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-25abeabcf75790ad",
                children: [
                    Object.keys(part).length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-25abeabcf75790ad",
                        children: "Ninguém na sala ainda."
                    }, void 0, false, {
                        fileName: "[project]/components/RoomView.js",
                        lineNumber: 234,
                        columnNumber: 44
                    }, this),
                    Object.entries(part).map(([key, data])=>{
                        let show;
                        // Nunca votou
                        if (data?.escolha === null || data?.escolha === undefined) {
                            show = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    opacity: 0.6,
                                    fontStyle: "italic",
                                    animation: "pulse 1.5s infinite",
                                    display: "inline-block"
                                },
                                className: "jsx-25abeabcf75790ad",
                                children: "⏳ aguardando..."
                            }, void 0, false, {
                                fileName: "[project]/components/RoomView.js",
                                lineNumber: 242,
                                columnNumber: 15
                            }, this);
                        // Revelado → mostrar corretamente a hora
                        } else if (data?.revelado === true) {
                            show = `${data.escolha}h`;
                        // Escolheu, mas está oculto
                        } else {
                            show = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    fontWeight: "bold"
                                },
                                className: "jsx-25abeabcf75790ad",
                                children: "👁️ revelar"
                            }, void 0, false, {
                                fileName: "[project]/components/RoomView.js",
                                lineNumber: 261,
                                columnNumber: 15
                            }, this);
                        }
                        const nomeExibir = participantDisplayName(key, data);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: "6px 0",
                                borderBottom: "1px solid #eee",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            },
                            className: "jsx-25abeabcf75790ad",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-25abeabcf75790ad",
                                children: [
                                    nomeExibir,
                                    ":",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        style: {
                                            display: "inline-flex",
                                            alignItems: "center"
                                        },
                                        className: "jsx-25abeabcf75790ad",
                                        children: show
                                    }, void 0, false, {
                                        fileName: "[project]/components/RoomView.js",
                                        lineNumber: 289,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/RoomView.js",
                                lineNumber: 287,
                                columnNumber: 15
                            }, this)
                        }, key, false, {
                            fileName: "[project]/components/RoomView.js",
                            lineNumber: 277,
                            columnNumber: 13
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/components/RoomView.js",
                lineNumber: 233,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                id: "25abeabcf75790ad",
                children: "@keyframes pulse{0%{opacity:.4}50%{opacity:1}to{opacity:.4}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/RoomView.js",
        lineNumber: 173,
        columnNumber: 5
    }, this);
}
_s(RoomView, "4VZFnAgtmAG4o9K02KYjpUeOaJ4=");
_c = RoomView;
var _c;
__turbopack_context__.k.register(_c, "RoomView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/index.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// pages/index.js
__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RoomForm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/RoomForm.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RoomView$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/RoomView.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function Home({ user, leaveRoom }) {
    _s();
    const [rid, setRid] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [inRoom, setInRoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Função chamada quando sai da sala (Sidebar chama isso!)
    function handleLeaveRoom() {
        setInRoom(false);
        setRid(null);
    }
    // Disponibiliza a função global para o _app.js acessar
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            window.__LEAVE_ROOM_CALLBACK__ = ({
                "Home.useEffect": ()=>handleLeaveRoom()
            })["Home.useEffect"];
        }
    }["Home.useEffect"], [
        rid,
        inRoom
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: 24
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: styles.title,
                style: {
                    textAlign: "center",
                    marginTop: "40px"
                },
                children: "Sala de Estimativa"
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            !inRoom && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RoomForm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                onEnter: (roomId)=>{
                    setRid(roomId);
                    setInRoom(true);
                }
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 28,
                columnNumber: 9
            }, this),
            inRoom && user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RoomView$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                roomId: rid,
                user: user,
                onLeave: handleLeaveRoom
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 37,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/index.js",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(Home, "fnkPqhfiXFAXmSKua0yO0d2yYhA=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/index.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/index.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/index\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/index.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__8739a079._.js.map