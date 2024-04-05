import React, { useState } from 'react';
import './style-pages/SchedulePage.css';
import scheludesData from '../data/scheludesData.json';
import directionData from '../data/directionData.json';
import UpdateSchelude from '../modal-windows/UpdateSchedule';

const SchedulePage = () => {
  const [editingData, setEditingData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeCell, setActiveCell] = useState(null);

  const openEditModal = (rowData) => {
    setEditingData(rowData);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingData(null);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    const updatedData = { ...editingData, [name]: value };
    setEditingData(updatedData);
  };

  const handleCellClick = (item) => {
    setActiveCell(item);
    console.log('Выбрана дата:', item.date);
  };

  return (
    <div className="schedule my-5 px-5">
      <table className="table table-light table-hover text-center">
        <thead>
          <tr>
            <th>Дата</th>
            {directionData.map((item, index) => (
              <th key={index}>{item.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scheludesData.map((item, index) => (
            <tr key={index}>
              <td
                className={activeCell === item ? 'table-active' : ''}
                onClick={() => handleCellClick(item)}
              >
                {item.date}
              </td>
              {directionData.map((direction, idx) => (
                <td
                  key={idx}
                  onDoubleClick={() =>
                    openEditModal({
                      date: item.date,
                      direction: direction.id,
                      event: item[direction.id]
                    })
                  }
                >
                  {item[direction.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateSchelude
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        formData={editingData || {}}
        handleInputChange={handleInputChange}
        handleSaveChanges={() => {}} 
      />
    </div>
  );
};

export default SchedulePage;