import { Provider } from 'react-redux';
import store from '.';

export default function StoreProvider(props: React.PropsWithChildren) {
  return <Provider store={store}>{props.children}</Provider>;
}
