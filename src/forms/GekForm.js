import React from 'react';
import { Form } from 'react-bootstrap';

const CreateGekForm = ({ 
  formData, 
  handleInputChange, 
  directories, 
  secretaries,
}) => {
  const { Name_direction, Fullname, Year } = formData || {};

  return (
    <Form>
      <Form.Group controlId="formNameDir">
        <Form.Label className="my-3">Наименование направления</Form.Label>
        <Form.Select
          type="text"
          name="Name_direction"
          onChange={handleInputChange}
          value={Name_direction || ""}>
          <option value="">Выберите направление</option>
          {directories.map((dir, index) => (
            <option key={index} value={dir.Name_direction}>{dir.Name_direction}</option>
          ))} 
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="formNameSec">
        <Form.Label className="my-3">ФИО секретаря</Form.Label>
        <Form.Select
          type="text"
          name="Fullname"
          onChange={handleInputChange}
          value={Fullname || ""}>
          <option value="">Выберите секретаря</option>
          {secretaries.map((sec, index) => (
            <option key={index} value={sec.Fullname}>{sec.Fullname}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="formYear">
        <Form.Label className="my-3">Год защиты</Form.Label>
        <Form.Control
          type="text"
          name="Year"
          value={Year || ""}
          onChange={handleInputChange}
        />
      </Form.Group>
    </Form>
  );
};

export default CreateGekForm;