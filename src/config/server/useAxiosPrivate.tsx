import { useEffect } from 'react';
import { axiosPrivate } from './axios';
import useRefreshToken from '../auth/useRefreshToken';
import useAuth from '../auth/useAuth';

function useAxiosPrivate() {
  const refresh = useRefreshToken();
  // console.log(
  //   '2. [useAxiosPrivate.tsx] From useRefreshToken To useAxiosPrivate, ',
  //   refresh
  // );
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers!['Authorization']) {
          config.headers!['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      // 403에러가 발생하여 다음 블럭으로 이동(403이 발생할수밖에 없음,,,토큰이만료되니,,,)
      // 401에러도 발생함
      //즉 에러가 발생하면 다음 블럭으로 이동함
      // 이때는 이미 accessToken토큰이 없는 상태임
      async (error) => {
        const prevRequest = error?.config;
        console.log('1.prevRequest에 sent가 있는가? sent의 값이 있는가?');
        console.log('1.prevRequest', prevRequest);
        console.log(
          '<--------------화면 리프레쉬 하면 여기까지,axiosPrivate 인터셉서 response 에러영역으로 옴, 그리고 바로 Users.tsx의 catch로 이동!-------------------------------------->'
        );
        if (
          (error?.response?.status === 403 && !prevRequest?.sent) ||
          (error?.response?.status === 401 && !prevRequest?.sent)
        ) {
          prevRequest.sent = true;
          console.log('2.prevRequest.sent, sent가 true?', prevRequest.sent);
          // useRefresh에서 받은 것을 newAccess토큰에 할당하고
          const newAccessToken = await refresh();
          //  그 newAccessToken을 헤더에 넣어서
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          console.log(
            '3. prevRequest의 headers의 Authorization',
            prevRequest.headers['Authorization']
          );
          console.log('4.axiosPrivate(prevRequest)', axiosPrivate(prevRequest));
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
}

export default useAxiosPrivate;
