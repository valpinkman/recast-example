import { node, string } from 'prop-types';

/**
 * @component Title
 * @param {node} children nodes to render
 * @param {string} color any css legal color code for text color
 */
const Title = ({ children, color }) => (
  <h1 style={color ? { color } : {}}>
    <style jsx>{`
      h1 {
        font-size: 28px;
        line-height: 1.4;
        font-weight: bold;
      }
    `}
    </style>
    {children}
  </h1>
);

Title.propTypes = {
  children: node,
  color: string
};

Title.defaultProps = {
  children: undefined,
  color: undefined
};

export default Title;
