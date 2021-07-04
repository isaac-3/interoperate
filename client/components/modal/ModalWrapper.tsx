import React from 'react';
import NavBar from '../layout/NavBar';
import Modal from './Modal';

interface Props {
  children: React.ReactNode;
}

const ModalWrapper = ({ children }: Props) => {
  return (
    <>
      <NavBar />
      {children}
      <Modal />
    </>
  );
};

export default ModalWrapper;
