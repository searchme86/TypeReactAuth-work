import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../config/server/useAxiosPrivate';
import { AxiosError } from 'axios';

interface UserRole {
  [key: string]: number;
}

interface UserInfo {
  password: string;
  refreshToken: string;
  roles: UserRole[];
  username: string;
  _id?: string;
  __v?: number;
}

function Users() {
  const [users, setUsers] = useState<UserInfo[]>([
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

  // component rendering start
  // component useEffect depth array value change - update

  // useEffect가 처음으로 시작됨.
  // 처음에 한  useEffect는 ref값을 단순하게 마운트 된것만 따지기 위해서 존재
  // 의존성이 있는 애들이 돌아서 useEffect가 시도함
  // 그때 우리가 if current가 있기 때문에 값을 가져오려고함.
  useEffect(() => {
    console.log('axiosPrivate change');
  }, [axiosPrivate]);
  useEffect(() => {
    console.log('navigate change');
  }, [navigate]);
  useEffect(() => {
    console.log('location change');
  }, [location]);

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
  }, [axiosPrivate, location, navigate]);

  console.log('component', users);
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
