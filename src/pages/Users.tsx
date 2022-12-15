import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../config/server/useAxiosPrivate';
import { AxiosError } from 'axios';

interface UserRole {
  [key: string]: number;
}

interface UserList {
  password: string;
  refreshToken: string;
  roles: UserRole[];
  username: string;
  _id: string;
  __v?: number;
}

function Users() {
  const [users, setUsers] = useState<UserList[]>([
    {
      password: '',
      refreshToken: '',
      roles: [],
      username: '',
      _id: '',
    },
  ]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const effectRun = useRef<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    console.log('isMounted', isMounted);

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/users', {});
        isMounted && setUsers(response.data);
        console.log('isMounted && setUsers 이후', isMounted);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error);
          console.log('error.response', error.response);
          console.log('error.message', error.message);
          navigate('/login', { state: { from: location }, replace: true });
        }
      }
    };

    if (effectRun.current) {
      getUsers();
    }

    return () => {
      isMounted = false;
      effectRun.current = true;
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
}

export default Users;
