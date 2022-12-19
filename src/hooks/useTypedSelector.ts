import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from 'src/store/turorials';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
