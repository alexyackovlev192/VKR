import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const ScheduleForm = ({ formData, handleInputChange, geks, isEditMode }) => {
  const { id_G, date, Name_direction, time, classroom } = formData || {};
  const [startDate, setStartDate] = useState(date);

  return (
    <Form>
      <Form.Group controlId="formIdGek">
        <Form.Label>Номер ГЭК</Form.Label>
        <Form.Select
          type="text"
          name="id_G"
          onChange={handleInputChange}
          value={id_G || ""}
          disabled={isEditMode} // поле недоступно для редактирования, если isEditMode true
        >
          {geks.map((g, index) => (
            <option key={index} value={g.id_G}>
              {g.id_G}
            </option>
          ))}
        </Form.Select>
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
            dateFormat="dd-MM"
            className="form-control"
          />
        </div>
      </Form.Group>
      <Form.Group controlId="formDirection">
        <Form.Label>Направление</Form.Label>
        <Form.Select
          type="text"
          name="Name_direction"
          onChange={handleInputChange}
          value={Name_direction || ""}
          disabled={isEditMode} 
        >
          {geks.map((g, index) => (
            <option key={index} value={g.Name_direction}>
              {g.Name_direction}
            </option>
          ))}
        </Form.Select>
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