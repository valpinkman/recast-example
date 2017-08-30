import { Component } from 'react';
import Background from '../ui/containers/background/background';
import Chat from '../ui/components/chat/chat';
import Title from '../ui/components/title/title';
import Container from '../ui/components/container/container';
import Storage from '../services/db';
import Recast from '../services/recast';
import * as models from '../utils/models';

/**
 *
 * @class Index
 * @extends {Component}
 * @description component that renders the index page of the app
 */
class Index extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      conversation: {
        id: undefined,
        messages: [],
        greeted: false,
        username: undefined
      },
      username: undefined,
      loading: false
    };

    this.handleSubmitUsername = this.handleSubmitUsername.bind(this);
    this.handleChatSubmit = this.handleChatSubmit.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.setUsername = this.setUsername.bind(this);
  }

  updateOnChange(ref) {
    ref.child('username').on('value', snapshot => {
      this.setState({ username: snapshot.val(), conversation: { ...this.state.conversation, username: snapshot.val() } });
    });

    ref.child('greeted').on('value', snapshot => {
      const greeted = snapshot.val();
      this.setState({ conversation: { ...this.state.conversation, greeted } });
    });

    ref.child('messages').limitToLast(2).on('child_added', snapshot => {
      const message = snapshot.val();
      const messages = this.state.conversation.messages.concat(message);
      this.setState({ conversation: { ...this.state.conversation, messages } });
    });

    ref.child('id').on('value', snapshot => {
      const id = snapshot.val();
      this.setState({ conversation: { ...this.state.conversation, id } });
    });
  }

  async handleSubmitUsername(e) {
    e.preventDefault();
    // NOTE: add an intermediary step to confirm name
    if (this.username.value) {
      await this.setUsername(this.username.value);
    }
  }

  async setUsername(username) {
    const ref = await Storage.setUsername(username);
    this.updateOnChange(ref);
  }

  async handleChatSubmit(text) {
    const { username } = this.state;
    const conversation = await Storage.getConversation(username);
    let conversationToken;

    if (conversation) {
      conversationToken = conversation.id;
    }

    const message = models.userMessage(username, true, text, conversationToken);
    await Storage.updateConversation(username, message);

    const messages = await Recast.converse(text, username, conversationToken);
    messages.forEach(async mess =>  {
      await Storage.updateConversation(username, mess);
    });
  }

  async handleResponse(message) {
    const { username } = this.state;
    await Storage.updateConversation(username, message);
  }

  render() {
    const { username, conversation } = this.state;

    return (
      <div className="index">
        <style jsx>{`
          :global(*) {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          }

          .index {
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
          }

          h2 {
            text-align: center;
            line-height: 1.4;
            color: white;
            margin-bottom: 20px;
          }

          form {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          label {
            color: white;
            margin-bottom: 10px;
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
        <Background/>
        <Container>
          <Title color="#fff">
           Welcome to Dimension C-137{username ? ` ${username}` : ''}
          </Title>
        </Container>
        {username ?
          <Container>
            <Chat conversation={conversation} onSubmit={this.handleChatSubmit}/>
          </Container> :
          <Container>
            <h2>
              To start chatting with JellyBot, you first need to login.<br/>
              Please select a username to log in.
            </h2>
            <form onSubmit={this.handleSubmitUsername}>
              <label htmlFor="username">choose your nickname</label>
              <input
                ref={comp => {
                  this.username = comp;
                }}
                id="username"
                type="text"
              />
            </form>
          </Container>
        }
      </div>
    );
  }
}

export default Index;
