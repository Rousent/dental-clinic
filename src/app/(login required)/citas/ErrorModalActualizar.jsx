import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useState } from "react";

const ErrorModalActualizar = ({ isOpen, onClose, errorMessage }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Error</ModalHeader>
        <ModalBody>
          <p>{errorMessage}</p>
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

export default ErrorModalActualizar;
