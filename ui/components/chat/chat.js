import PropTypes from 'prop-types';

const Chat = ({ children }) => (
  <ul>
    <style jsx>{`
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
    {children}
  </ul>
);

Chat.propTypes = {
  children: PropTypes.node
};

Chat.defaultProps = {
  children: null
};

export default Chat;

