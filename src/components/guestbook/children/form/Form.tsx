import { ChangeEvent, FormEvent, useState } from 'react';
import { CONTRACT_ADDRESS } from 'consts';
import { useSendMessage } from '@gear-js/react-hooks';
import { guestbookMeta } from 'meta/metaTypes';
import './Form.scss';

type Props = {
  fetchMessages: () => void;
};

function Form({ fetchMessages }: Props) {
  const sendMessage = useSendMessage(CONTRACT_ADDRESS, guestbookMeta);

  const [message, setMessage] = useState('');
  const [value, setValue] = useState(0);

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleMinusClick = () => {
    if (value > 0) {
      setValue((prevValue) => prevValue - 1);
    }
  };

  const handlePlusClick = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // example of sending a message to the program
    e.preventDefault();

    sendMessage({ AddMessage: message }, value);
    fetchMessages();
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type your message:"
        value={message}
        onChange={handleMessageChange}
        required
      />
      <footer>
        <div className="counter">
          <div className="title">Value:</div>
          <span
            className="minus"
            onClick={handleMinusClick}
            onKeyDown={handleMinusClick}
            role="button"
            tabIndex={0}
            aria-label="increase value"
          />
          <input
            type="number"
            className="message-form__value"
            value={value}
            readOnly
          />
          <span
            className="plus"
            onClick={handlePlusClick}
            onKeyDown={handlePlusClick}
            role="button"
            tabIndex={0}
            aria-label="decrease value"
          />
        </div>
        <button type="submit" className="message-form__button success">
          Add message
        </button>
      </footer>
    </form>
  );
}

export { Form };
