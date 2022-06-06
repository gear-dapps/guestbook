import { useEffect, useState } from 'react';
import { useApi } from '@gear-js/react-hooks';
import { CONTRACT_ADDRESS } from 'consts';
import guestbookMeta from 'meta/guestbook.meta.wasm';
import { Message } from './types';
import { Welcome, Form, Messages } from './children';

function Guestbook() {
  const [messages, setMessages] = useState<Message[]>([]);

  const { api } = useApi();

  const fetchMessages = () => {
    fetch(guestbookMeta)
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => Buffer.from(arrayBuffer))
      .then((buffer) => api.programState.read(CONTRACT_ADDRESS, buffer))
      .then((state) => state.toHuman() as Message[])
      .then(setMessages);
  };

  useEffect(fetchMessages, []);

  return (
    <>
      <Welcome />
      <Form fetchMessages={fetchMessages} />
      <Messages messages={messages} />
    </>
  );
}

export { Guestbook };
