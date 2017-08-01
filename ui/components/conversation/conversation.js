import { shape, number, string, arrayOf } from 'prop-types';
import Avatar from '../avatar/avatar';

const isLastMessageFromUser = (messages, receiver) => messages[0].user === receiver;

const Conversation = ({ conversation }) => (
  <li>
    <style jsx>{`

    `}
    </style>
    <Avatar username={conversation.receiver}/>
    <section>
      <span>{conversation.receiver}</span>
      <div>
        {conversation.messages.length && isLastMessageFromUser(conversation.messages, conversation.receiver) ?
          <div><span className="username">You : </span><span>{conversation.messages[0].text}</span></div> :
          <span>{conversation.messages.length ? conversation.messages[0].text : ''}</span>
        }
      </div>
    </section>
  </li>
);

Conversation.propTypes = {
  conversation: shape({
    id: number.isRequired,
    user: string.isRequired,
    messages: arrayOf(shape({
      user: string.isRequired,
      text: string.isRequired,
      posted: number.isRequired
    })),
    receiver: string.isRequired
  }).isRequired
};

Conversation.defaultProps = {};

export default Conversation;
