import { useRef, useState, useEffect } from 'react';
import useAuth from '../config/auth/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AxiosError } from 'axios';
import axios from '../config/server/axios';
import useMutation from '../config/server/useMutation';
import useAxiosPost from '../config/server/useAxiosPost';

const LOGIN_URL = '/auth';
interface UserLogin {
  user: string;
  pwd: string;
  roles: number[];
  accessToken: string;
}

interface InputType {
  user: string;
  pwd: string;
}

const initialValue: UserLogin = {
  user: '',
  pwd: '',
  roles: [],
  accessToken: '',
};

function Login() {
  const { setAuth, persist, setPersist } = useAuth();
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const postInput: InputType = {
    user,
    pwd,
  };

  // const { postdata, axiosPost } = useAxiosPost<UserLogin, InputType>(
  //   '/auth',
  //   postInput,
  //   initialValue,
  //   setAuth
  // );

  //persist false
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    userRef.current!.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  useEffect(() => {}, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // axiosPost();
    // console.log('postData', postdata);
    // if (data) {
    // console.log('1.로그인하면 출력되는', JSON.stringify(data));
    // const accessToken = data?.accessToken;
    // console.log('accessToken', accessToken);
    // const roles = data?.roles;
    // console.log('roles', roles);
    // setAuth({ user, pwd, roles, accessToken });
    // }
    // setUser('');
    // setPwd('');
    // navigate(from, { replace: true });

    try {
      const response = await axios.post<UserLogin>(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      console.log('1.로그인하면 출력되는', JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      //여기까지
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      if (err instanceof AxiosError) {
        if (!err?.response) {
          setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
          setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized');
        } else {
          setErrMsg('Login Failed');
        }
        errRef.current!.focus();
      }
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem('persist', String(persist));
  }, [persist]);

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button>Sign In</button>
        <div className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist}
          />
          <label htmlFor="persist">Trust This Device</label>
        </div>
      </form>
      <p>
        Need an Account?
        <br />
        <span className="line">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </section>
  );
}

export default Login;
