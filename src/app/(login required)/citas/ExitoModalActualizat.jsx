import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useState } from "react";

const ExitoModalActualizar = ({ isOpen, onClose, successMessage }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <ModalContent>
        <ModalHeader>¡¡Exito!!</ModalHeader>
        <ModalBody>
          <p>{successMessage}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ExitoModalActualizar;