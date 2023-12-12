import React from "react";
import { Modal, ModalContent, ModalHeader, ModalFooter, Button } from "@nextui-org/react";

const ErrorModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="text-center">
          ¡Error al enviar el formulario!
        </ModalHeader>
        <ModalFooter>
          <Button color="danger" onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ErrorModal;
