import { func, node } from 'prop-types';

const Action = ({ onClick, children }) => (
  <button onClick={onClick}>
    <style jsx>{`
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border: 0;
        border-radius: 50%;
        outline: 0;
        color: white;
        background-color: #e9225e;
        cursor: pointer;
        transition: background-color 250ms ease-out;
      }

      button:hover {
        background-color: #ef6f6e;
      }
    `}
    </style>
    {children}
  </button>
);

Action.propTypes = {
  onClick: func,
  children: node
};

Action.defaultProps = {
  onClick: undefined,
  children: undefined
};

export default Action;
