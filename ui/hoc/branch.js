const branch = (test, FallBack) => BaseComp => props => {
  if (test(props)) {
    return <BaseComp {...props}/>;
  }

  return <FallBack {...props}/>;
};

export default branch;
