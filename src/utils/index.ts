import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { LOCAL_STORAGE } from 'consts';

const isLoggedIn = ({ address }: InjectedAccountWithMeta) => localStorage[LOCAL_STORAGE.ACCOUNT] === address;

const toShortAddress = (_address: string): string => {
    const address = (_address || '').toString();
  
    return address.length > 13
      ? `${address.slice(0, 6)}…${address.slice(-6)}`
      : address;

};

export { isLoggedIn, toShortAddress };
