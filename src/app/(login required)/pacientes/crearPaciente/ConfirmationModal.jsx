import React from "react";
import { Modal, ModalContent, ModalHeader, ModalFooter, Button } from "@nextui-org/react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="text-center">
          ¿Está seguro de crear un nuevo paciente?
        </ModalHeader>
        <ModalFooter>
          <Button color="danger" variant="light" onClick={onClose}>
            Cancelar
          </Button>
          <Button color="primary" onClick={onConfirm}>
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
