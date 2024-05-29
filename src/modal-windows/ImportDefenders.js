import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import * as XLSX from 'xlsx';

const ImportDefendersModal = ({ showModal, handleCloseModal, handleFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

        const headers = worksheet[0];
        const rows = worksheet.slice(1);

        const jsonData = rows.map(row => {
          let rowData = {};
          headers.forEach((header, index) => {
            rowData[header] = row[index];
          });
          return rowData;
        });

        // Добавим фильтрацию пустых строк
        const formattedData = jsonData
          .filter(row => Object.values(row).some(value => value !== undefined && value !== null && value !== ''))
          .map(row => ({
            Fullname: row[headers[0]],
            Group: row[headers[1]],
            Topic: row[headers[2]],
            ScientificAdviser: row[headers[3]],
            Avg_Mark: parseFloat(row[headers[4]]),
            Red_Diplom: row[headers[5]] === 'Да',
            YearOfDefense: row[headers[6]],
            Name_direction: row[headers[7]]
          }));

        handleFileUpload(formattedData);
      };
      reader.readAsArrayBuffer(file);
    }
    handleCloseModal();
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Загрузить данные о студентах</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formFile">
            <Form.Label>Выберите файл</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Закрыть
        </Button>
        <Button variant="primary" onClick={handleImport}>
          Загрузить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImportDefendersModal;