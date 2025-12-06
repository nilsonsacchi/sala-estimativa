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
"[project]/components/RoomView.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// components/RoomView.js
__turbopack_context__.s([
    "default",
    ()=>RoomView
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/firebase/database [external] (firebase/database, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebaseClient.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/firebase/auth [external] (firebase/auth, esm_import)");
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
        const auth = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$29$__["getAuth"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getFirebaseApp"])());
        const user = userProp || auth.currentUser;
        if (!user || !roomId) return;
        const uid = user.uid;
        const displayName = user.displayName || "Usuário";
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getDB"])();
        const salaRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["ref"])(db, `salas/${roomId}/nome`);
        const unsubSala = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["onValue"])(salaRef, (snap)=>{
            setRoomName(snap.val() || "Sala sem nome");
        });
        const participantsRefRoot = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["ref"])(db, `salas/${roomId}/participantes`);
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["get"])(participantsRefRoot).then((snap)=>{
            const val = snap.val() || {};
            const hadUid = !!val[uid];
            const hadDisplayNameKey = !!val[displayName];
            if (!hadUid && hadDisplayNameKey) {
                const old = val[displayName];
                const newData = {
                    nome: displayName,
                    escolha: old?.escolha ?? null,
                    revelado: old?.revelado ?? false,
                    migratedFrom: displayName,
                    migratedAt: Date.now()
                };
                (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["set"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["ref"])(db, `salas/${roomId}/participantes/${uid}`), newData).then(()=>(0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["remove"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["ref"])(db, `salas/${roomId}/participantes/${displayName}`))).catch((err)=>console.error("Erro migração participante:", err));
            }
        });
        const userRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["ref"])(db, `salas/${roomId}/participantes/${uid}`);
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["set"])(userRef, {
            nome: displayName,
            escolha: null,
            revelado: false,
            joinedAt: Date.now()
        }).catch((err)=>console.error("Erro ao set participante:", err));
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["onDisconnect"])(userRef).remove();
        const unsub = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["onValue"])(participantsRefRoot, (snap)=>{
            const val = snap.val() || {};
            setPart(val);
            if (val[uid] && typeof val[uid].escolha === "number") {
                setSelected(val[uid].escolha);
            } else {
                setSelected(null);
            }
        });
        // ⛔ **AQUI É O AJUSTE**
        // Quando clicar no Home → este componente desmonta → usuário removido.
        return ()=>{
            try {
                unsub();
                unsubSala();
            } catch  {}
            // 🔥 remove o usuário da sala ao sair da página
            (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["remove"])(userRef).catch(()=>{});
        };
    }, [
        roomId,
        userProp
    ]);
    function getCurrentUser() {
        const auth = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$29$__["getAuth"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getFirebaseApp"])());
        return auth.currentUser;
    }
    function choose(v) {
        const user = getCurrentUser();
        if (!user) return alert("Usuário não autenticado.");
        const uid = user.uid;
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getDB"])();
        setSelected(v);
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["update"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["ref"])(db, `salas/${roomId}/participantes/${uid}`), {
            escolha: v,
            revelado: false
        });
    }
    function revealAll() {
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getDB"])();
        Object.keys(part).forEach((p)=>(0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["update"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["ref"])(db, `salas/${roomId}/participantes/${p}`), {
                revelado: true
            }));
    }
    function hideAll() {
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getDB"])();
        Object.keys(part).forEach((p)=>(0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["update"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["ref"])(db, `salas/${roomId}/participantes/${p}`), {
                revelado: false
            }));
    }
    function clearAll() {
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getDB"])();
        Object.keys(part).forEach((p)=>(0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["update"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["ref"])(db, `salas/${roomId}/participantes/${p}`), {
                escolha: null,
                revelado: false
            }));
        setSelected(null);
    }
    function participantDisplayName(key, data) {
        if (data?.nome) return data.nome;
        return key;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                children: [
                    "Sala: ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                        children: roomName
                    }, void 0, false, {
                        fileName: "[project]/components/RoomView.js",
                        lineNumber: 139,
                        columnNumber: 15
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/RoomView.js",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                children: [
                    "Você:",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                        children: participantDisplayName(getCurrentUser()?.uid, {
                            nome: getCurrentUser()?.displayName
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/RoomView.js",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/RoomView.js",
                lineNumber: 142,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "grid",
                style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 8
                },
                children: OPT.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>choose(o),
                        style: {
                            padding: "12px",
                            borderRadius: "8px",
                            border: selected === o ? "2px solid #4A90E2" : "1px solid #ccc",
                            backgroundColor: selected === o ? "#4A90E2" : "#fff",
                            color: selected === o ? "#fff" : "#333",
                            fontWeight: selected === o ? "bold" : "normal"
                        },
                        children: [
                            o,
                            "h"
                        ]
                    }, o, true, {
                        fileName: "[project]/components/RoomView.js",
                        lineNumber: 153,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/RoomView.js",
                lineNumber: 151,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 12,
                    display: "flex",
                    gap: 12
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        className: "reveal-btn",
                        onClick: revealAll,
                        children: "Mostrar escolhas"
                    }, void 0, false, {
                        fileName: "[project]/components/RoomView.js",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: hideAll,
                        style: {
                            backgroundColor: "#0a74da",
                            color: "white",
                            padding: "10px 16px",
                            borderRadius: "8px"
                        },
                        children: "Ocultar escolhas"
                    }, void 0, false, {
                        fileName: "[project]/components/RoomView.js",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        className: "clear-btn",
                        onClick: clearAll,
                        children: "Limpar"
                    }, void 0, false, {
                        fileName: "[project]/components/RoomView.js",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/RoomView.js",
                lineNumber: 170,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                style: {
                    marginTop: 16
                },
                children: "Resultados"
            }, void 0, false, {
                fileName: "[project]/components/RoomView.js",
                lineNumber: 192,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                children: Object.entries(part).map(([key, data])=>{
                    let show;
                    if (!data?.escolha && data?.escolha !== 0) {
                        show = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            style: {
                                opacity: 0.6
                            },
                            children: "⏳ aguardando..."
                        }, void 0, false, {
                            fileName: "[project]/components/RoomView.js",
                            lineNumber: 199,
                            columnNumber: 20
                        }, this);
                    } else if (data.revelado) {
                        show = `${data.escolha}h`;
                    } else {
                        show = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            style: {
                                fontWeight: "bold"
                            },
                            children: "👁️ revelar"
                        }, void 0, false, {
                            fileName: "[project]/components/RoomView.js",
                            lineNumber: 204,
                            columnNumber: 15
                        }, this);
                    }
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "6px 0",
                            borderBottom: "1px solid #eee",
                            display: "flex",
                            justifyContent: "space-between"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                participantDisplayName(key, data),
                                ": ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                    children: show
                                }, void 0, false, {
                                    fileName: "[project]/components/RoomView.js",
                                    lineNumber: 221,
                                    columnNumber: 54
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/RoomView.js",
                            lineNumber: 220,
                            columnNumber: 15
                        }, this)
                    }, key, false, {
                        fileName: "[project]/components/RoomView.js",
                        lineNumber: 211,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/RoomView.js",
                lineNumber: 194,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/RoomView.js",
        lineNumber: 137,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebaseClient.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/firebase/auth [external] (firebase/auth, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/firebase/database [external] (firebase/database, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$home$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/styles/home/Home.module.css [ssr] (css module)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RoomForm$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RoomView$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RoomForm$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RoomView$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
function Home() {
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [inRoom, setIn] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [rid, setRid] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["initFirebase"])();
        const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getAuthInstance"])();
        const unsub = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$29$__["onAuthStateChanged"])(auth, (u)=>{
            if (!u) {
                window.location.href = "/login";
            } else {
                setUser(u);
                setLoading(false);
            }
        });
        return ()=>unsub();
    }, []);
    function leaveRoom() {
        if (rid && user) {
            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getDB"])();
            (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["remove"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$database__$5b$external$5d$__$28$firebase$2f$database$2c$__esm_import$29$__["ref"])(db, `salas/${rid}/participantes/${user.uid}`));
        }
        setIn(false);
        setRid("");
    }
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            style: {
                padding: 40
            },
            children: "Carregando..."
        }, void 0, false, {
            fileName: "[project]/pages/index.js",
            lineNumber: 43,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$home$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].container,
        style: {
            display: "flex"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$home$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].main,
            style: {
                flexGrow: 1,
                padding: "20px"
            },
            children: [
                !inRoom && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$home$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].title,
                            style: {
                                textAlign: "center",
                                marginTop: "40px"
                            },
                            children: "Sala de Estimativa"
                        }, void 0, false, {
                            fileName: "[project]/pages/index.js",
                            lineNumber: 52,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RoomForm$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            onEnter: (roomId)=>{
                                setRid(roomId);
                                setIn(true);
                            }
                        }, void 0, false, {
                            fileName: "[project]/pages/index.js",
                            lineNumber: 56,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true),
                inRoom && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RoomView$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                    roomId: rid,
                    user: user
                }, void 0, false, {
                    fileName: "[project]/pages/index.js",
                    lineNumber: 65,
                    columnNumber: 20
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/index.js",
            lineNumber: 49,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/pages/index.js",
        lineNumber: 47,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__f3152f2c._.js.map