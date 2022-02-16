import { useState, useEffect } from 'react';
import api from '../api';

const useUser = (): UserRow | null => {
  const [user, setUser] = useState<UserRow | null>(null);
  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const {
          data: user
        } = await api.user.getUser();
        setUser(user);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  return user;
};

export default useUser;
