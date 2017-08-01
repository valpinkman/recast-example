import { func } from 'prop-types';
import Action from '../action/action';

const Form = ({ onSubmit }) => (
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
    <form onSubmit={onSubmit}>
      <input
        type="text"
        onKeyPress={function (event) {
          if (event.key === 'Enter') {
            onSubmit(event);
          }
        }}
      />
      <Action onClick={undefined}/>
    </form>
  </section>
);

Form.propTypes = {
  onSubmit: func.isRequired
};

export default Form;
