module.exports = [
"[project]/styles/home/RoomForm.module.css [ssr] (css module)", ((__turbopack_context__) => {

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
"[project]/components/RoomForm.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// components/RoomForm.js
__turbopack_context__.s([
    "default",
    ()=>RoomForm
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebaseClient.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/firebase/database [external] (firebase/database, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$home$2f$RoomForm$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/styles/home/RoomForm.module.css [ssr] (css module)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
function RoomForm({ onEnter }) {
    const [roomId, setRoom] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [dbReady, setDbReady] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [rooms, setRooms] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const interval = setInterval(()=>{
            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getDB"])();
            if (db) {
                setDbReady(true);
                clearInterval(interval);
            }
        }, 100);
        return ()=>clearInterval(interval);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!dbReady) return;
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getDB"])();
        const roomsRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["ref"])(db, "salas");
        const unsub = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["onValue"])(roomsRef, (snap)=>{
            const val = snap.val() || {};
            const list = Object.entries(val).map(([id, sala])=>({
                    id,
                    nome: sala.nome
                }));
            setRooms(list);
        });
        return ()=>unsub();
    }, [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$home$2f$RoomForm$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].wrapper,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$home$2f$RoomForm$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].box,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$home$2f$RoomForm$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].title,
                    children: "Entrar na Sala"
                }, void 0, false, {
                    fileName: "[project]/components/RoomForm.js",
                    lineNumber: 58,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$home$2f$RoomForm$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].combobox,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$home$2f$RoomForm$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].input,
                        value: roomId,
                        onChange: (e)=>setRoom(e.target.value),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Selecione uma Sala..."
                            }, void 0, false, {
                                fileName: "[project]/components/RoomForm.js",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this),
                            rooms.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
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
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$home$2f$RoomForm$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].error,
                    children: error
                }, void 0, false, {
                    fileName: "[project]/components/RoomForm.js",
                    lineNumber: 71,
                    columnNumber: 19
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$home$2f$RoomForm$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].button} ${isDisabled ? __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$home$2f$RoomForm$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].disabled : ""}`,
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
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("styled-jsx/style.js", () => require("styled-jsx/style.js"));

module.exports = mod;
}),
"[project]/components/RoomView.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// components/RoomView.js
__turbopack_context__.s([
    "default",
    ()=>RoomView
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/firebase/database [external] (firebase/database, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebaseClient.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/firebase/auth [external] (firebase/auth, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
function RoomView({ roomId, user: userProp }) {
    const [part, setPart] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [roomName, setRoomName] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
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
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        // get user (prefer prop, fallback to auth.currentUser)
        const auth = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$29$__["getAuth"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getFirebaseApp"])());
        const user = userProp || auth.currentUser;
        if (!user || !roomId) return;
        const uid = user.uid;
        const displayName = user.displayName || "Usuário";
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getDB"])();
        // Nome da sala
        const salaRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["ref"])(db, `salas/${roomId}/nome`);
        const unsubSala = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["onValue"])(salaRef, (snap)=>{
            setRoomName(snap.val() || "Sala sem nome");
        });
        // PARTICIPANTES: cleanup / migration / registro
        const participantsRefRoot = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["ref"])(db, `salas/${roomId}/participantes`);
        // 1) check if old key exists (displayName) and migrate it to uid if needed
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["get"])(participantsRefRoot).then((snap)=>{
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
                (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["set"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["ref"])(db, `salas/${roomId}/participantes/${uid}`), newData).then(()=>(0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["remove"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["ref"])(db, `salas/${roomId}/participantes/${displayName}`))).catch((err)=>console.error("Erro migração participante:", err));
            }
        }).catch((err)=>{
            console.warn("Falha ao checar participantes para migração:", err);
        });
        // 2) create/update participant record with uid (join)
        const userRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["ref"])(db, `salas/${roomId}/participantes/${uid}`);
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["set"])(userRef, {
            nome: displayName,
            escolha: null,
            revelado: false,
            joinedAt: Date.now()
        }).catch((err)=>console.error("Erro ao set participante:", err));
        // ensure remove on disconnect
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["onDisconnect"])(userRef).remove();
        // 3) subscribe to participants list
        const unsub = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["onValue"])(participantsRefRoot, (snap)=>{
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
        });
        // cleanup on unmount
        return ()=>{
            try {
                unsub();
                unsubSala();
            } catch (e) {
                (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["remove"])(userRef).catch(()=>{});
            }
        };
    }, [
        roomId,
        userProp
    ]);
    // helper to get current user (uid)
    function getCurrentUser() {
        try {
            const app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getFirebaseApp"])();
            const auth = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$29$__["getAuth"])(app);
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
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getDB"])();
        setSelected(v);
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["update"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["ref"])(db, `salas/${roomId}/participantes/${uid}`), {
            escolha: v,
            revelado: false
        }).catch((err)=>console.error("Erro ao escolher:", err));
    }
    // Revelar para todos
    function revealAll() {
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getDB"])();
        Object.keys(part).forEach((p)=>{
            (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["update"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["ref"])(db, `salas/${roomId}/participantes/${p}`), {
                revelado: true
            }).catch((e)=>console.error("Erro reveal:", e));
        });
    }
    // Ocultar para todos
    function hideAll() {
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getDB"])();
        Object.keys(part).forEach((p)=>{
            (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["update"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["ref"])(db, `salas/${roomId}/participantes/${p}`), {
                revelado: false
            }).catch((e)=>console.error("Erro hide:", e));
        });
    }
    // Limpar todos os votos
    function clearAll() {
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getDB"])();
        Object.keys(part).forEach((p)=>{
            (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["update"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["ref"])(db, `salas/${roomId}/participantes/${p}`), {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "jsx-25abeabcf75790ad" + " " + "card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                style: {
                    marginBottom: 8
                },
                className: "jsx-25abeabcf75790ad",
                children: [
                    "Sala: ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "jsx-25abeabcf75790ad",
                children: [
                    "Você: ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 8
                },
                className: "jsx-25abeabcf75790ad" + " " + "grid",
                children: OPT.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 12,
                    display: "flex",
                    gap: 12
                },
                className: "jsx-25abeabcf75790ad",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: revealAll,
                        className: "jsx-25abeabcf75790ad" + " " + "reveal-btn",
                        children: "Mostrar escolhas"
                    }, void 0, false, {
                        fileName: "[project]/components/RoomView.js",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-25abeabcf75790ad",
                children: [
                    Object.keys(part).length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                            show = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
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
                            show = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
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
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                padding: "6px 0",
                                borderBottom: "1px solid #eee",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            },
                            className: "jsx-25abeabcf75790ad",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-25abeabcf75790ad",
                                children: [
                                    nomeExibir,
                                    ":",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
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
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/styles/home/Home.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "container": "Home-module__-HUO1a__container",
  "fadeIn": "Home-module__-HUO1a__fadeIn",
  "main": "Home-module__-HUO1a__main",
  "title": "Home-module__-HUO1a__title",
});
}),
"[project]/components/ProtectedRoute.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/ProtectedRoute.js
__turbopack_context__.s([
    "default",
    ()=>ProtectedRoute
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
;
function ProtectedRoute({ user, children }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (user === undefined) return; // ainda inicializando
        if (!user) router.replace("/login"); // redireciona se não logado
    }, [
        user,
        router
    ]);
    if (user === undefined || !user) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            padding: 40
        },
        children: "Carregando..."
    }, void 0, false, {
        fileName: "[project]/components/ProtectedRoute.js",
        lineNumber: 13,
        columnNumber: 43
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
}),
"[project]/pages/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// pages/index.js
__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RoomForm$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/RoomForm.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RoomView$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/RoomView.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$home$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/styles/home/Home.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ProtectedRoute$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ProtectedRoute.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RoomForm$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RoomView$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RoomForm$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RoomView$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
function Home({ user, leaveRoom }) {
    const [rid, setRid] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [inRoom, setInRoom] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    function handleLeaveRoom() {
        setInRoom(false);
        setRid(null);
    }
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        window.__LEAVE_ROOM_CALLBACK__ = ()=>handleLeaveRoom();
    }, [
        rid,
        inRoom
    ]);
    if (user === undefined) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            padding: 40
        },
        children: "Carregando..."
    }, void 0, false, {
        fileName: "[project]/pages/index.js",
        lineNumber: 21,
        columnNumber: 34
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ProtectedRoute$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
        user: user,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            style: {
                padding: 24
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$home$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].title,
                    style: {
                        textAlign: "center",
                        marginTop: "-10px"
                    },
                    children: "Sala de Estimativa"
                }, void 0, false, {
                    fileName: "[project]/pages/index.js",
                    lineNumber: 26,
                    columnNumber: 9
                }, this),
                !inRoom && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RoomForm$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                    onEnter: (roomId)=>{
                        setRid(roomId);
                        setInRoom(true);
                    }
                }, void 0, false, {
                    fileName: "[project]/pages/index.js",
                    lineNumber: 31,
                    columnNumber: 11
                }, this),
                inRoom && user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RoomView$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                    roomId: rid,
                    user: user,
                    onLeave: handleLeaveRoom
                }, void 0, false, {
                    fileName: "[project]/pages/index.js",
                    lineNumber: 40,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/index.js",
            lineNumber: 25,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/pages/index.js",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2b32dadf._.js.map