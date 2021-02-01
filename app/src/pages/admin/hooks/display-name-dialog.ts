import { useState } from 'react';

interface DisplayNameDialog {
  open: boolean;
  name: string;
  doOpen: () => void;
  doClose: () => void;
  doChangeName: (name: string) => void;
}

const useDisplayNameDialog = (): DisplayNameDialog => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const doOpen = (): void => setOpen(true);
  const doClose = (): void => setOpen(false);
  const doChangeName = (name: string): void => setName(name);

  return {
    open,
    name,
    doOpen,
    doClose,
    doChangeName,
  };
};

export default useDisplayNameDialog;
