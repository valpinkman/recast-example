import PropTypes from 'prop-types';
import Avatar from '../avatar/avatar';

const Message = ({ message }) => (
  <li className={message.me ? 'me' : 'recipient'}>
    <style jsx>{`
      .me {}

      .recipient {}

      .user {}
    `}
    </style>
    <p>{message.text}</p>
    <span className="user">
      <Avatar username={message.me ? message.username : 'JellyBot'}/>
    </span>
  </li>
);

Message.propTypes = {
  message: PropTypes.shape({
    user: PropTypes.string,
    me: PropTypes.bool,
    message: PropTypes.string,
    posted: PropTypes.number
  }).isRequired
};

export default Message;
