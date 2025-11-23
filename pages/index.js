import { useEffect, useState } from 'react';
import RoomForm from '../components/RoomForm';
import RoomView from '../components/RoomView';
import { initFirebase } from '../lib/firebaseClient';

export default function Home() {
  const [inRoom, setIn] = useState(false);
  const [rid, setRid] = useState('');
  const [name, setName] = useState('');

  useEffect(() => { initFirebase(); }, []);

  return (
    <div>
      {!inRoom && (
        <h1 style={{ textAlign: "center", marginTop: "40px" }}>
          Sala de Estimativa
        </h1>
      )}

      {!inRoom && (
        <RoomForm
          onEnter={(r, n) => {
            setRid(r);
            setName(n);
            setIn(true);
          }}
        />
      )}

      {inRoom && <RoomView roomId={rid} userName={name} />}
    </div>
  );
}