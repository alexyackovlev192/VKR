import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const AlertWindow = ({ showAlert, handleCloseAlert, alertId }) => {
  const [status, setStatus] = useState(null);
  const id_U = localStorage.getItem('id_U');

  useEffect(() => {
    const fetchPresenceStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/defensePresence/ByIdDSAndIdU?id_DS=${alertId}&id_U=${id_U}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setStatus(response.data.Status);
      } catch (error) {
        console.error('Ошибка при получении статуса присутствия:', error);
      }
    };

    fetchPresenceStatus();
  }, [showAlert]); 

  const handleConfirmation = async () => {
    try {
      const token = localStorage.getItem('token');

      await axios.post(`http://localhost:5000/defensePresence/create`, {
        id_DS: alertId,
        id_U: id_U,
        Status: '+'
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      handleCloseAlert();
      
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    }
  };

  return (
    <Modal show={showAlert} onHide={handleCloseAlert}>
      <Modal.Header closeButton>
        <Modal.Title>Подтверждение присутствия</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {status === '+' ? (
          <p>Ваше присутствие на защите №{alertId} уже подтверждено.</p>
        ) : (
          <p>Вы подтверждаете своё присутствие на защите №{alertId}?</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        {status === null ? (
          <Button variant="primary" onClick={handleConfirmation} disabled={status === '+'}>
            Подтвердить
          </Button>
        ) : (
          ''
        )}
        <Button variant="secondary" onClick={handleCloseAlert}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertWindow;