import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';


const ScheduleForm = ({ formData, handleInputChange }) => {
  const { date, direction, time, room } = formData || {};
  const [startDate, setStartDate] = useState(date); 

  
  return (
    <Form>
      <Form.Group controlId="formDate">
        <Form.Label>Дата</Form.Label>
        <div>
          <DatePicker
            name="date"
            selected={startDate}
            onChange={(d) => setStartDate(d)}
            dateFormat="dd.MM"
            className="form-control"
          />          
        </div>
      </Form.Group>
      <Form.Group controlId="formDirection">
        <Form.Label>Направление</Form.Label>
        <Form.Control
          type="text"
          name="direction"
          value={direction}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formTime">
        <Form.Label>Время</Form.Label>
        <div>
          <Form.Control
            type="time"
            name="time"
            value={time}
            onChange={handleInputChange}
          />
        </div>
      </Form.Group>
      <Form.Group controlId="formRoom">
        <Form.Label>Аудитория</Form.Label>
        <Form.Control
          type="text"
          name="room"
          value={room}
          onChange={handleInputChange}
        />
      </Form.Group>
    </Form>
  );
};

export default ScheduleForm;