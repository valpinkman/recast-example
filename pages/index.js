import { Component } from 'react';
import Background from '../ui/containers/background/background';
import Chat from '../ui/components/chat/chat';
import Title from '../ui/components/title/title';
import Container from '../ui/components/container/container';
import Storage from '../services/db';
import Recast from '../services/recast';

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
      conversation: { id: 0, messages: [] },
      username: undefined,
      loading: false
    };

    this.handleSubmitUsername = this.handleSubmitUsername.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.handleChatSubmit = this.handleChatSubmit.bind(this);
  }

  async componentDidMount() {
    // Look into storage if there is a username already setup
    const username = await Storage.getUsername();
    const conversation = await Storage.getConversation();

    // If there are no conversations but a username
    if (username) {
      if (conversation) {
        this.setState({ username, conversation });
      } else {
        this.setState({ username });
      }
    }
  }

  handleSubmitUsername(e) {
    e.preventDefault();
    // NOTE: add an intermediary step to confirm name
    if (this.username.value) {
      this.setUsername(this.username.value);
    }
  }

  async setUsername(name) {
    const username = await Storage.setUsername(name);
    this.setState({ username });
  }

  async handleChatSubmit(text) {
    const conversation = await Storage.getConversation();
    let conversationToken;

    if (conversation && conversation.length) {
      conversationToken = conversation.id;
    }

    const json = await Recast.converse(text, conversationToken);
    console.log(json);
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

          .action {
            position: fixed;
            bottom: 30px;
            right: 30px;
          }

          p {
            text-align: center;
          }
        `}
        </style>
        <Background/>
        <Container>
          <Title color="#fff">Dimension C137{username ? ` - ${username}` : ''}</Title>
        </Container>
        {username ?
          <Container>
            <Chat conversation={conversation} onSubmit={this.handleChatSubmit}/>
          </Container> :
          <Container>
            <p>
              To start chatting with JellyBot, you first need to login.<br/>
              Please select a username to log in.
            </p>
            <form onSubmit={this.handleSubmitUsername}>
              <label htmlFor="username">choose your name</label>
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
