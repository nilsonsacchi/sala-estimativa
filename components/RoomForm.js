import {useState} from 'react';
export default function RoomForm({onEnter}){
 const [roomId,setRoom]=useState('');
 const [name,setName]=useState('');
 return (<div>
   <h2>Entrar</h2>
   <input placeholder="Sala" value={roomId} onChange={e=>setRoom(e.target.value)}/>
   <input placeholder="Nome" value={name} onChange={e=>setName(e.target.value)}/>
   <button onClick={()=>onEnter(roomId,name)}>Entrar</button>
 </div>);
}