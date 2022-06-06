import Identicon from '@polkadot/react-identicon';
import { toShortAddress } from 'utils';
import { Message } from '../../types';
import './Messages.scss';

type Props = {
  messages: Message[];
};

function Messages({ messages }: Props) {
  const messagesItem = messages.map((item: Message) => (
    <div className="messages-list__message" key={Math.random()}>
      <div className="messages-list__user-info">
        <div className="messages-list__user-icon">
          <Identicon value={item.autor} size={25} theme="polkadot" />
        </div>
        <div className="messages-list__user-name">
          {toShortAddress(item.autor)}
        </div>
      </div>
      <div className="messages-list__user-message">
        <p>{item.text}</p>
      </div>
    </div>
  ));

  return <div className="messages-list">{messagesItem.reverse()}</div>;
}

export { Messages };
