import {useEffect,useState} from 'react';
import {ref,set,onValue,update} from 'firebase/database';
import {getDB} from '../lib/firebaseClient';
const OPT=[3,6,9,12,15,18,21,24,27,30,33,36];

export default function RoomView({roomId,userName}){
 const [part,setPart]=useState({});
 const [selected,setSelected]=useState(null);
 const [revealed,setRevealed]=useState(false);

 useEffect(()=>{
  const db=getDB();
  // garante que o participante exista
  set(ref(db,`salas/${roomId}/participantes/${userName}`),{escolha:null,revelado:false});
  const roomRef = ref(db,`salas/${roomId}/participantes`);
  const unsub = onValue(roomRef,snap=>{
    const val = snap.val()||{};
    setPart(val);
    // Se minha escolha já estiver no DB, atualiza o highlight local
    if(val[userName] && val[userName].escolha !== null){
      setSelected(val[userName].escolha);
    }
    // Se qualquer participante tiver revelado=true, considera revelado
    const anyRevealed = Object.values(val).some(p => p && p.revelado);
    setRevealed(anyRevealed);
  });
  return ()=>unsub();
 },[roomId,userName]);

 function choose(v){
   const db=getDB();
   setSelected(v); // destaque imediato para quem votou
   update(ref(db,`salas/${roomId}/participantes/${userName}`),{escolha:v,revelado:false});
 }

 function revealAll(){
   const db=getDB();
   const data = part || {};
   Object.keys(data).forEach(p=>{
     update(ref(db,`salas/${roomId}/participantes/${p}`),{revelado:true});
   });
   setRevealed(true);
 }

 function clearAll(){
   const db=getDB();
   const data = part || {};
   Object.keys(data).forEach(p=>{
     update(ref(db,`salas/${roomId}/participantes/${p}`),{escolha:null,revelado:false});
   });
   setSelected(null);
   setRevealed(false);
 }

 return (
   <div className="card">
     <h2 style={{marginBottom:8}}>Sala: {roomId}</h2>
     <p>Você: <strong>{userName}</strong></p>

     <div className="grid">
       {OPT.map(o=>(
         <button
           key={o}
           onClick={()=>choose(o)}
           className={"hour-btn "+(selected===o ? 'selected' : '')}
         >
           {o}h
         </button>
       ))}
     </div>

     <div style={{marginTop:12, display:'flex', gap:12}}>
       <button className="reveal-btn" onClick={revealAll}>Mostrar escolhas</button>
       <button className="clear-btn" onClick={clearAll}>Limpar</button>
     </div>

     <h3 style={{marginTop:16}}>Resultados</h3>
     <div>
       {Object.keys(part).length===0 && <div>Ninguém na sala ainda.</div>}
       {Object.entries(part).map(([n,i])=>{
         const show = i && i.revelado ? (i.escolha===null ? '—' : i.escolha+'h') : (n===userName ? (i && i.escolha!==null ? i.escolha+'h' : '—') : '???');
         return <div key={n} style={{padding:'6px 0', borderBottom:'1px solid #eee'}}>{n}: <strong>{show}</strong></div>
       })}
     </div>
   </div>
 );
}