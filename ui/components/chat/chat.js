import PropTypes from 'prop-types';
import Form from '../form/form';

const Chat = ({ conversation, onSubmit }) => {
  return (
    <section className="chat">
      <style jsx>{`
        .chat {
          display: flex;
          flex-direction: column;
          width: 100vw;
          height: 100vh;
        }

        ul {
          display: flex;
          flex: 1 1 100%;
          flex-direction: column;
          justify-content: strech;
          align-items: flex-start;
          width: 100%;
          background: gray;
        }
      `}
      </style>
      <ul>
        {conversation.id > 0 && conversation.messages.map(el => console.log(el))}
      </ul>
      <Form onSubmit={onSubmit}/>
    </section>
  );
};

Chat.propTypes = {
  conversation: PropTypes.shape({
    id: PropTypes.number.isRequired,
    messages: PropTypes.array.isRequired
  }),
  onSubmit: PropTypes.func.isRequired
};

Chat.defaultProps = {
  conversation: { id: 0, messages: [] }
};

export default Chat;

