import React, { useState } from 'react';
import {BASE_URL} from '../utils/settings';

function DeployPage() {
  const [response, setResponse] = useState(null);

  async function handlePopulate() {
    try {
        console.log("Goddag");
        const res = await fetch("/backendExam/api/info/populate", { method: 'GET' });
        console.log("dette er mystisk");
        const json = await res.json();
        console.log("hej");
        setResponse(json);
    } catch (err) {
      setResponse(err);
    }
  }

  return (
    <div>
      <button onClick={handlePopulate}>Populate</button>
      {response && <p>{JSON.stringify(response)}</p>}
    </div>
  );
}

export default DeployPage;