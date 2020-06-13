import { useState } from 'react';

const useDisplayNameDialog = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const doOpen = () => setOpen(true);
  const doClose = () => setOpen(false);
  const doChangeName = (name: string) => setName(name);

  return {
    open,
    name,
    doOpen,
    doClose,
    doChangeName,
  }
}

export default useDisplayNameDialog;
