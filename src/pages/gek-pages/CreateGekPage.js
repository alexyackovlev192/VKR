import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import CreateGekForm from '../../forms/GekForm'; 
import WarningWindow from '../../components/WarningWindow';

const CreateGekPage = () => {
  const navigate = useNavigate();
  const [directories, setDirectories] = useState([]);
  const [secretaries, setSecretaries] = useState([]);
  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem('formData');
    return savedFormData ? JSON.parse(savedFormData) : {};
  });
  const [showWarningWindow, setShowWarningWindow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
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

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    let update = { ...formData, [name]: value };

    if (name === "Fullname") {
      const selectedSecretary = secretaries.find(sec => sec.Fullname === value);
      if (selectedSecretary) {
        localStorage.setItem('id_Sec', selectedSecretary.id_U);
      }
    }

    setFormData(update);
  }, [formData, secretaries]);

  const handleBack = () => {
    navigate(`/gek`);
    localStorage.removeItem('formData');
  }

  const handleNext = () => {
    const requiredFields = ['Name_direction', 'Fullname', 'Year'];
    const emptyFields = requiredFields.filter(field => !formData[field]);

    if (emptyFields.length > 0) {
      setErrorMessage(`Не все поля заполнены`);
      setShowWarningWindow(true);
    } else {
      navigate(`/create-gek/add-member`);
    }
  }

  const handleCloseWarningWindow = () => {
    setShowWarningWindow(false);
  }

  return (
    <div className="container-fluid text-center my-3">
      <div className="row my-3">
        <div className="col-1">
          <Button variant="primary" onClick={handleBack}>Назад</Button>
        </div>
        <div className="col-10 text-center my-4">
          <h3>Создание новой ГЭК</h3>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="row justify-content-evenly col-5">
          <CreateGekForm 
            formData={formData} 
            handleInputChange={handleInputChange} 
            directories={directories} 
            secretaries={secretaries} 
          />
        </div>
      </div>
      <div className="my-4">
        <Button variant="primary" className="px-5" onClick={handleNext}>Далее</Button>
      </div>
      <WarningWindow show={showWarningWindow} handleClose={handleCloseWarningWindow} errorMessage={errorMessage} />
    </div>
  );
};

export default CreateGekPage;