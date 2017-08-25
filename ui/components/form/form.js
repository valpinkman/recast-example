import { Component } from 'react';
import { func } from 'prop-types';
import Action from '../action/action';
import Write from '../icons/write';

class Form extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
          }

          form > * {
            margin: 0 10px;
          }

          input {
            flex: 1;
            padding: 10px;
            border: none;
            border-radius: 3px;
            outline: none;
            background-color: rgba(255, 255, 255, 0.3);
            transition: background-color 250ms ease-out;
            font-size: 16px;
          }

          input:hover, input:focus {
            background-color: rgba(255, 255, 255, 0.5);
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
            <Write width="22px"/>
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
