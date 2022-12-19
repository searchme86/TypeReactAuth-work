import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { actionCreators } from 'src/store';
// import { useSelector } from 'react-redux';
import { useActions } from 'src/hooks/useActions';
import { useTypedSelector } from 'src/hooks/useTypedSelector';

function RepositoriesList() {
  const [term, setTerm] = useState('');

  // const dispatch = useDispatch();
  // dispatch와 bound됨
  const { searchRepositories } = useActions();
  // const state = useSelector((state: any) => state.respoistories);

  // const { loading, error, data } = useSelector((state) => state.respoistories);
  const { loading, error, data } = useTypedSelector(
    (state) => state.respoistories
  );
  console.log('loading', loading);
  console.log('error', error);
  console.log('data', data);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // dispatch(actionCreators.searchRepositories(term) as any);
    searchRepositories(term);
  };

  return (
    <div className="">
      <form action="" onSubmit={onSubmit}>
        <input
          type="text"
          value={term}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTerm(e.target.value)
          }
        />
        <button>Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
      {!error &&
        !loading &&
        data.map((item) => {
          return <div key={item}>{item}</div>;
        })}
    </div>
  );
}

export default RepositoriesList;
