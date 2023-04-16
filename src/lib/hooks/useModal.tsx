import { useEffect, useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const closeModalByKey = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', (e: KeyboardEvent) =>
      closeModalByKey(e)
    );
    return () => {
      window.removeEventListener('keydown', closeModalByKey);
    };
  }, []);

  const hide = () => setIsOpen(false);

  return {
    isOpen,
    toggle,
    hide,
  };
};

export default useModal;
