import React from 'react';
import Modal from './Modal';

interface Props {
  children: React.ReactNode;
}

const ModalWrapper = ({ children }: Props) => {
  return (
    <>
      {children}
      <Modal />
    </>
  );
};

export default ModalWrapper;
