import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../config/auth/useAxiosPrivate';
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

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/users', {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.error(err);
          navigate('/login', { state: { from: location }, replace: true });
        }
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
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
