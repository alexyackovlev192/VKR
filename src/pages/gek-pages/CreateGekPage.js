import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import CreateGekForm from '../../forms/GekForm';

const CreateGekPage = () => {
  const [directories, setDirectories] = useState([]); // Директории
  const [secretaries, setSecretaries] = useState([]); // Директории
  const [formData, setFormData] = useState(() => {
    // Извлечение данных из localStorage при первой загрузке страницы
    const savedFormData = localStorage.getItem('formData');
    return savedFormData ? JSON.parse(savedFormData) : null;
  });
  
  useEffect(() => {
    // Запрос данных директорий и секретарей при загрузке страницы
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/directions', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setDirectories(response.data);
    })
    .catch(error => console.error('Ошибка при загрузке данных:', error));
    axios.get('http://localhost:5000/secretariesGec', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setSecretaries(response.data);
    })
    .catch(error => console.error('Ошибка при загрузке данных:', error));
  }, []);

  // Обработчик изменения данных формы
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    let update = { ...formData, [name]: value };

    setFormData(update);
  }, [formData]);

  return (
      <div className="container-fluid text-center my-3">
        <div className="row my-3">
            <Link to={`/gek`} className="col-1">
              <Button variant="primary" className="">Назад</Button>
            </Link>
            <h4 className="col-10">Создание ГЭК</h4>
        </div>
        <div className="d-flex justify-content-center">
          <div className="row justify-content-evenly col-6">
            <CreateGekForm formData={formData} handleInputChange={handleInputChange} directories={directories} secretaries={secretaries}/>
          </div>
        </div>
      </div>
    );
  };

  export default CreateGekPage;