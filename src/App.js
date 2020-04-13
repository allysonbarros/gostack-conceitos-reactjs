import React, { useEffect, useState } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories ] = useState([]);

  useEffect(() => {
    const loadRepositories = async () => {
      const response = await api.get('/repositories');
      const { data } = response;
      setRepositories(data);
    }
    
    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories');
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories([...repositories.filter((item) => item.id !== id)]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map((item) => 
          <li key={item.id}>
            { item.title }

            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
