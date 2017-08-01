import { node, string } from 'prop-types';

const Container = ({ children, bgColor }) => (
  <div style={bgColor ? { backgroundColor: bgColor } : {}}>
    <style jsx>{`
      div {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px 0;
      }
    `}
    </style>
    {children}
  </div>
);

Container.propTypes = {
  children: node,
  bgColor: string
};

Container.defaultProps = {
  children: undefined,
  bgColor: undefined
};

export default Container;
