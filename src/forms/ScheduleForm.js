import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';


const ScheduleForm = ({ formData, handleInputChange }) => {
  const { date, Name_direction, time, classroom } = formData || {};
  const [startDate, setStartDate] = useState(date); 

  console.log("Данные в форме:");
  console.log(formData)
  return (
    <Form>
      <Form.Group controlId="formDate">
        <Form.Label>Дата</Form.Label>
        <div>
        <DatePicker
          name="date"
          selected={startDate}
          onChange={(d) => {
            setStartDate(d);
            handleInputChange({ target: { name: 'date', value: d } }); // Добавлено для обновления formData в родительском компоненте
          }}
          dateFormat="dd-MM" // Убедитесь, что формат даты совпадает с ожидаемым
          className="form-control"
        />        
        </div>
      </Form.Group>
      <Form.Group controlId="formDirection">
        <Form.Label>Направление</Form.Label>
        <Form.Control
          type="text"
          name="Name_direction"
          value={Name_direction || ""}
          onChange={handleInputChange}
        />
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