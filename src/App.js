import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  
  const [state, setState] = useState(null);

  axios.get('/api/data') // замените '/api/data' на путь к вашему API на сервере
  .then(response => {
    // Обработка полученных данных
    console.log(response.data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

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