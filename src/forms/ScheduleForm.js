import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const ScheduleForm = ({ formData, handleInputChange, geks, isEditMode }) => {
  const { id_G, date, Name_direction, time, classroom } = formData || {};
  const [startDate, setStartDate] = useState(date ? new Date(date) : null);
  const [selectGek, setSelectGek] = useState(null);
  const [localDirection, setLocalDirection] = useState(Name_direction || "");

  const handleGekChange = (e) => {
    const { value } = e.target;
    setSelectGek(geks.find(g => g.id_G === parseInt(value)));
    handleInputChange(e);
  };

  useEffect(() => {
    const fetchDirection = async (id_D) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/directions/${id_D}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setLocalDirection(response.data.Name_direction);
      } catch (error) {
        console.error('Ошибка при получении направления:', error);
      }
    };

    if (isEditMode) {
      const selectedGek = geks.find(g => g.id_G === id_G);
      if (selectedGek) {
        setSelectGek(selectedGek);
        if (selectedGek.id_D) {
          fetchDirection(selectedGek.id_D);
        }
      }
    } else if (selectGek && selectGek.id_D) {
      fetchDirection(selectGek.id_D);
    }

    return () => {
      setSelectGek(null);
    };
  }, [selectGek, isEditMode, id_G, geks]);

  useEffect(() => {
    if (localDirection !== Name_direction && !isEditMode) {
      handleInputChange({ target: { name: 'Name_direction', value: localDirection } });
    }
  }, [localDirection, Name_direction, handleInputChange, isEditMode]);

  return (
    <Form>
      <Form.Group controlId="formIdGek">
        <Form.Label>Номер ГЭК</Form.Label>
        {isEditMode ? (
          <Form.Control
            type="text"
            name="id_G"
            value={id_G || ""}
            disabled={true}
          />
        ) : (
          <Form.Select
            type="text"
            name="id_G"
            onChange={handleGekChange}
            value={id_G || ""}
          >
            {!id_G && <option value="">Выберите ГЭК</option>}
            {geks.map((g, index) => (
              <option key={index} value={g.id_G}>{g.id_G}</option>
            ))}
          </Form.Select>
        )}
      </Form.Group>
      <Form.Group controlId="formDate">
        <Form.Label>Дата</Form.Label>
        <div>
          <DatePicker
            name="date"
            selected={startDate}
            onChange={(d) => {
              setStartDate(d);
              handleInputChange({ target: { name: 'date', value: d } });
            }}
            dateFormat="dd-MM-yyyy"
            className="form-control"
            placeholderText="Выберите дату"
          />
        </div>
      </Form.Group>
      <Form.Group controlId="formDirection">
        <Form.Label>Направление</Form.Label>
        <Form.Control
          type="text"
          name="Name_direction"
          value={localDirection || ""}
          onChange={handleInputChange}
          disabled={true} />
      </Form.Group>
      <Form.Group controlId="formTime">
        <Form.Label>Время</Form.Label>
        <div>
          <Form.Control
            type="text"
            name="time"
            value={time || ""}
            onChange={handleInputChange}
          />
        </div>
      </Form.Group>
      <Form.Group controlId="formRoom">
        <Form.Label>Аудитория</Form.Label>
        <Form.Control
          type="text"
          name="classroom"
          value={classroom || ""}
          onChange={handleInputChange}
        />
      </Form.Group>
    </Form>
  );
};

export default ScheduleForm;