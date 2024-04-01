import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  
  const [state, setState] = useState(null);

  const callBackendAPI = async () => {
    const response = await fetch('/api/data');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };
  
  // получение GET маршрута с сервера Express, который соответствует GET из server.js 
  useEffect(() => {
    callBackendAPI()
    .then(res => setState(res.express))
    .catch(err => console.log(err));
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>

      <p>
          {state}
      </p>
    </div>
  );
}

export default App;