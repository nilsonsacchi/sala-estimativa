import {useEffect,useState} from 'react';
import {ref,set,onValue,update} from 'firebase/database';
import {getDB} from '../lib/firebaseClient';
const OPT=[6,12,18,24,30];
export default function RoomView({roomId,userName}){
 const [part,setPart]=useState({});
 useEffect(()=>{
  const db=getDB();
  set(ref(db,`salas/${roomId}/participantes/${userName}`),{escolha:null,revelado:false});
  const unsub=onValue(ref(db,`salas/${roomId}/participantes`),snap=>setPart(snap.val()||{}));
  return ()=>unsub();
 },[]);
 function choose(v){ update(ref(getDB(),`salas/${roomId}/participantes/${userName}`),{escolha:v,revelado:false});}
 function reveal(){ Object.keys(part).forEach(p=>update(ref(getDB(),`salas/${roomId}/participantes/${p}`),{revelado:true}));}
 function clear(){ Object.keys(part).forEach(p=>update(ref(getDB(),`salas/${roomId}/participantes/${p}`),{escolha:null,revelado:false}));}
 return (<div>
  <h2>Sala {roomId}</h2>
  {OPT.map(o=><button key={o} onClick={()=>choose(o)}>{o}h</button>)}
  <button onClick={reveal}>Mostrar</button>
  <button onClick={clear}>Limpar</button>
  <h3>Resultados</h3>
  {Object.entries(part).map(([n,i])=><div key={n}>{n}: {i.revelado? i.escolha??'—':'???'}</div>)}
 </div>);
}