import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ScheduleForm = ({ formData, handleInputChange }) => {
  const { date, direction, time, room } = formData || {};
  const [selectedDate, setSelectedDate] = useState(new Date(date)); // Initializing date from formData

  return (
    <Form>
      <Form.Group controlId="formDate">
        <Form.Label>Дата</Form.Label>
        <div>
          <DatePicker
            selected={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            dateFormat="dd.MM"
            placeholderText={date}
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
        <Form.Control
          type="text"
          name="time"
          value={time}
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

export default ScheduleForm;