import { useApi, useBalanceSubscription, useLoggedInAccount } from '@gear-js/react-hooks';
import { Header, Footer, ApiLoader, Guestbook } from 'components';
import { withProviders } from 'hocs';
import 'App.scss';

function Component() {
  const { isApiReady } = useApi();

  useBalanceSubscription();
  useLoggedInAccount();

  return (
    <>
      <Header />
      <main>{isApiReady ? <Guestbook /> : <ApiLoader />}</main>
      <Footer />
    </>
  );
}

export const App = withProviders(Component);
