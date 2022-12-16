import { ErrorMessages, MyError } from './error';

type User = {
  name: string;
  email: string;
};

export const getUser = (): Promise<User | MyError> => {
  return Promise.resolve({
    message: ErrorMessages.DBError,
    resolution: 'check db connection',
  });
};
