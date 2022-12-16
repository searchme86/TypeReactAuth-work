import { getUser } from './db';
import { ErrorMessages, isError } from './error';

const main = async () => {
  const user = await getUser();
  if (isError(user)) {
    if (user.message === ErrorMessages.DBError) {
      console.log(`Returned DB error ${JSON.stringify(user)}`);
    } else {
      console.log(`Returned general error ${JSON.stringify(user)}`);
    }
  } else {
    console.log(`Got user:${JSON.stringify(user)}`);
  }
};

main();
