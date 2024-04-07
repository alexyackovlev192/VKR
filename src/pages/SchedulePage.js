import React, { useState } from 'react';
import './style-pages/SchedulePage.css';
import schedulesData from '../data/schedulesData.json';
import directionData from '../data/directionData.json';
import UpdateSchedule from '../modal-windows/UpdateSchedule';

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
    <div className="schedule-container my-5 px-5">
      <div className="schedule-wrapper row">
        <div className="col-1 px-0"> {/* Ширина первой колонки */}
          <table className="table table-light table-hover text-center">
            <thead>
              <tr>
                <th className="px-5">Дата</th>
              </tr>
            </thead>
            <tbody>
              {schedulesData.map((item, index) => (
                <tr key={index}>
                  <td
                    className={activeCell === item ? 'table-active' : ''}
                    onClick={() => handleCellClick(item)}
                  >
                    {item.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-11 px-0" style={{ overflowX: 'auto' }}> {/* Ширина второй колонки */}
          <table className="table table-light table-hover text-center">
            <thead>
              <tr> 
                {directionData.map((item, index) => (
                  <th className="px-5" key={index}>{item.name}</th>
                ))}
              </tr>
            </thead>
              <tbody>
                {schedulesData.map((item, index) => (
                  <tr key={index}>
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
        </div>  
      </div>
      <UpdateSchedule
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