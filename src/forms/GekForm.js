import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const CreateGekForm = ({ 
  formData, 
  handleInputChange, 
  directories, 
  secretaries,
}) => {
  const { Name_direction, Fullname, Year } = formData || {};
  
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  return (
    <Form>
      <Form.Group controlId="formNameDir">
        <Form.Label className="my-3">Наименование направления</Form.Label>
        <Form.Select
          type="text"
          name="Name_direction"
          onChange={handleInputChange}>
          <option value="Name_direction">{Name_direction}</option>
          {directories.map((dir, index) => ( dir.Name_direction !== Name_direction &&
            <option key={index} value={dir.Name_direction}>{dir.Name_direction}</option>
          ))} 
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="formNameSec">
        <Form.Label className="my-3">ФИО секретаря</Form.Label>
        <Form.Select
          type="text"
          name="Fullname"
          onChange={handleInputChange}>
          <option value="Fullname">{Fullname}</option>
          {secretaries.map((sec, index) => ( sec.Fullname !== Fullname &&
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
      <Link to={ `/create-gek/add-member` }>
        <Button variant="primary" className="col-2 my-4">Далее</Button>
      </Link>
    </Form>
  );
};

export default CreateGekForm;