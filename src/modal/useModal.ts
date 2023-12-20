import { atom, useAtom } from "jotai";
import { useCallback } from "react";

const modalAtom = atom<React.ReactNode>(null);

export default function useModal() {
  const [modal, setModal] = useAtom(modalAtom);

  const openModal = useCallback(
    (content: React.ReactNode) => {
      setModal(content);
    },
    [setModal]
  );

  const closeModal = useCallback(() => {
    setModal(null);
  }, [setModal]);

  return { modal, openModal, closeModal };
}
