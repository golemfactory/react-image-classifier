import React from "react";
import useModal from "./useModal";

export default function Modal({ children }: { children: React.ReactNode }) {
  const { modal, closeModal } = useModal();

  return (
    <>
      {modal && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {modal}
          </div>
        </div>
      )}
      {children}
    </>
  );
}
