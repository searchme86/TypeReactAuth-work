export const enum ErrorMessages {
  DBError = 'error occurred while dealing with db',
}

export type MyError = {
  message: string | ErrorMessages;
  resolution?: string | undefined;
};

export const isError = (
  toBeDeterminded: any | MyError
): toBeDeterminded is MyError => {
  return !!(toBeDeterminded as MyError)?.message;
};
