import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../lib/rootReducer';
import LoginTemplate from '../landing-page/LoginTemplate';
import SignupTemplate from '../landing-page/SignupTemplate';
import CardDetailsModal from './CardDetailsModal';
import NewProjectModal from './NewProjectModal';

const Modal = () => {
  const { modalDisplay, modalType } = useSelector(
    (state: RootState) => state.modal
  );

  const renderModal = () => {
    switch (modalType) {
      case "login":
        return <LoginTemplate defocus={true} />;
      case "signup":
        return <SignupTemplate defocus={true} />;
      case "new-project":
        return <NewProjectModal />;
      case "new-list-card":
        return <CardDetailsModal />;
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
