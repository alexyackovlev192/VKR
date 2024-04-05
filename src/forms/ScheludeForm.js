import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ScheludeForm = ({ formData, handleInputChange }) => {
  const { date, direction, time, gec, room } = formData || {};

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <Form>
      <Form.Group controlId="formDate">
        <Form.Label>Дата</Form.Label>
        <div>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd.MM"
                placeholderText={date}
                className="form-control"
                value={date}
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
        <Form.Control
          type="text"
          name="time"
          value={time}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formGec">
        <Form.Label>Номер ГЭК</Form.Label>
        <Form.Control
          type="text"
          name="gec"
          value={gec}
          onChange={handleInputChange}
        />
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

export default ScheludeForm;