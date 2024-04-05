import React from 'react';
import { Form } from 'react-bootstrap';

const ScheludeForm = ({ formData, handleInputChange }) => {
  const { date, direction, time, gec, room } = formData || {};

  return (
    <Form>
      <Form.Group controlId="formDate">
        <Form.Label>Дата</Form.Label>
        <Form.Control
          type="text"
          name="date"
          value={date}
          onChange={handleInputChange}
          disabled
        />
      </Form.Group>
      <Form.Group controlId="formDirection">
        <Form.Label>Направление</Form.Label>
        <Form.Control
          type="text"
          name="direction"
          value={direction}
          onChange={handleInputChange}
          disabled
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