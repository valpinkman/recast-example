import { func, node } from 'prop-types';

const Action = ({ onClick, children }) => (
  <button onClick={onClick}>
    <style jsx>{`
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 36px;
        height: 36px;
        border: 0;
        border-radius: 50%;
        outline: 0;
        color: white;
        background-color: #e9225e;
        cursor: pointer;
        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.3);
        transition: background-color 250ms ease-out, box-shadow 250ms ease-out;
      }

      button:hover {
        background-color: #d1114b;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
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
