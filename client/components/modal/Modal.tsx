import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../lib/rootReducer';
import LoginTemplate from '../landing-page/LoginTemplate';
import SignupTemplate from '../landing-page/SignupTemplate';

const Modal = () => {
  const { modalDisplay, modalType } = useSelector(
    (state: RootState) => state.modal
  );

  const renderModal = () => {
    switch (modalType) {
      case "login":
        return <LoginTemplate />;
      case "signup":
        return <SignupTemplate />;
      case "":
        return null;
    }
  };

  if (!modalDisplay) return null;

  return (
    <div className="modal">
      {renderModal()}
    </div>
  );
};

export default Modal;
