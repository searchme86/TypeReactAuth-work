import React, { useState } from 'react';

function useRegisterState() {
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  return {
    user,
    setUser,
    validName,
    setValidName,
    userFocus,
    setUserFocus,
    pwd,
    setPwd,
    setValidPwd,
    validPwd,
    setPwdFocus,
    pwdFocus,
    matchPwd,
    setMatchPwd,
    validMatch,
    setValidMatch,
    matchFocus,
    setMatchFocus,
    errMsg,
    setErrMsg,
    success,
    setSuccess,
  };
}

export default useRegisterState;
