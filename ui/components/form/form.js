import { Component } from 'react';
import { func } from 'prop-types';
import Action from '../action/action';
import Write from '../icons/write';

class Form extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   const { onSubmit } = this.props;
  //   onSubmit('yolo');
  // }

  handleSubmit(evt) {
    evt.preventDefault();
    const { onSubmit } = this.props;
    const { text } = this;

    if (text && text.value) {
      onSubmit(text.value);
      text.value = '';
    }
  }

  render() {
    return (
      <section>
        <style jsx>{`
          section {
            display: flex;
            width: 100%;
            height: 15vh;
            min-height: 100px;
          }

          form {
            flex: 1;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            padding: 20px;
          }

          form > * {
            margin: 0 10px;
          }

          input {
            flex: 1;
            padding: 10px 0;
            border: none;
            border-bottom: 2px solid grey;
            outline: none;
            font-size: 24px;
          }
        `}
        </style>
        <form onSubmit={this.handleSubmit}>
          <input
            ref={c => {
              this.text = c;
            }}
            onKeyPress={event => { /* eslint react/jsx-no-bind: 0 */
              if (event.key === 'Enter') {
                this.handleSubmit(event);
              }
            }}
            type="text"
          />
          <Action onClick={this.handleSubmit}>
            <Write/>
          </Action>
        </form>
      </section>
    );
  }
}

Form.propTypes = {
  onSubmit: func.isRequired
};

export default Form;
