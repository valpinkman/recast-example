import PropTypes from 'prop-types';
import Form from '../form/form';
import Message from '../message/message';

const Chat = ({ conversation, onSubmit }) => {
  return (
    <section className="chat">
      <style jsx>{`
        .chat {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          width: 100vw;
          height: 100vh;
        }

        ul, .formContainer {
          display: flex;
          width: 100%;
          max-width: 500px;
        }

        .formContainer {
          display: flex;
          flex: 1 0 auto;
        }

        ul {
          flex: 1 1 100%;
          flex-direction: column;
          justify-content: stretch;
          align-items: flex-start;
          overflow: scroll;
        }
      `}
      </style>
      <ul>
        {
          conversation.messages.map((message, index, arr) => {
            const next = arr[index + 1];
            const showAvatar = next ? message.user !== next.user : true;
            return <Message key={message.posted} message={message} showAvatar={showAvatar}/>;
          })
        }
      </ul>
      <div className="formContainer">
        <Form onSubmit={onSubmit}/>
      </div>
    </section>
  );
};

Chat.propTypes = {
  conversation: PropTypes.shape({
    id: PropTypes.string,
    messages: PropTypes.array.isRequired
  }),
  onSubmit: PropTypes.func.isRequired
};

Chat.defaultProps = {
  conversation: { id: undefined, messages: [] }
};

export default Chat;

