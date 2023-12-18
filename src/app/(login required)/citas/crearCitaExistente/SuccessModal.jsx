import React from "react";
import { Modal, ModalContent, ModalHeader, ModalFooter, Button } from "@nextui-org/react";
import Link from "next/link";

const SuccessModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="text-center">
          ¡Formulario enviado con éxito!
        </ModalHeader>
        <ModalFooter>
          <Link href="/citas">
            <Button color="primary" onClick={onClose}>
              Cerrar
            </Button>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal;
