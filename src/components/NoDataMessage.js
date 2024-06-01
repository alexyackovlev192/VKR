import React from 'react';
import Alert from 'react-bootstrap/Alert';

const NoDataMessage = () => {
  return (
    <div className="text-center my-3">
      <Alert variant="warning">
        <Alert.Heading>Данные отсутствуют</Alert.Heading>
      </Alert>
    </div>
  );
};

export default NoDataMessage;