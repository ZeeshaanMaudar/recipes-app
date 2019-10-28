import React from 'react';

const Error = ({ error }) => {
  const { message } = error;

  return (
    <p>{message}</p>
  );
};

export default Error;
