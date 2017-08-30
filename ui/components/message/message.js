import { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../avatar/avatar';
import branch from '../../hoc/branch';

const Image = ({ text, me }) => (
  <span className={`bubble ${me ? 'first' : ''}`}>
    <style jsx>{`
      .bubble {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        order: 2;
        max-width: 300px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
      }

      .bubble.first {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 0;
      }

      .first {
        order: 1;
        margin-right: 15px;
      }

      img {
        width: 100%;
        max-width: 100%;
      }
    `}
    </style>
    <img src={text}/>
  </span>
);

Image.propTypes = {
  text: PropTypes.string.isRequired,
  me: PropTypes.bool.isRequired
};

const Text = ({ text, me }) => (
  <span className={`bubble ${me ? 'first' : ''}`}>
    <style jsx>{`
      .bubble {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        order: 2;
        max-width: 300px;
        padding: 10px;
        font-size: 14px;
        border-radius: 5px;
        border-bottom-left-radius: 0;
        background: rgba(255, 255, 255, 0.6);
        transition: background 250ms ease-out;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
      }

      .bubble:hover {
        background: rgba(255, 255, 255, 0.8);
      }

      .bubble.first {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 0;
      }

      .first {
        order: 1;
        margin-right: 15px;
      }
    `}
    </style>
    {text}
  </span>
);

Text.propTypes = {
  text: PropTypes.string.isRequired,
  me: PropTypes.bool.isRequired
};

const MessageType = branch(({ type }) => type === 'image', Text)(Image);

class Message extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.item.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  }

  render() {
    const { message, showAvatar } = this.props;
    return (
      <li
        ref={
          c => {
            this.item = c;
          }
        }
        className={message.me ? 'right' : ''}
      >
        <style jsx>{`
          li {
            box-sizing: border-box;
            display: flex;
            flex-shrink: 0;
            flex-direction: row;
            align-items: center;
            width: 100%;
            margin-bottom: 15px;
            padding: 0 3px;
          }

          .right {
            justify-content: flex-end;
          }

          .user {
            flex-shrink: 0;
            width: 36px;
            order: 2;
          }

          .first {
            order: 1;
            margin-right: 15px;
          }

        `}
        </style>
        <MessageType {...message}/>
        <span className={`user ${message.me ? '' : 'first'}`}>
          {showAvatar &&
            <Avatar username={message.me ? message.user : 'Rick Sanchez'}/>
          }
        </span>
      </li>
    );
  }
}

Message.propTypes = {
  message: PropTypes.shape({
    user: PropTypes.string,
    me: PropTypes.bool,
    message: PropTypes.node,
    posted: PropTypes.number,
    type: PropTypes.string
  }).isRequired,
  showAvatar: PropTypes.bool
};

Message.defaultProps = {
  showAvatar: true
};

export default Message;
