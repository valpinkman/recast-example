import { Component } from 'react';
import RickAndMorty from 'rick-and-morty';
import Background from '../ui/containers/background/background';
import Chat from '../ui/components/chat/chat';
import Title from '../ui/components/title/title';
import Container from '../ui/components/container/container';
import Storage from '../services/db';
import Recast from '../services/recast';
import * as models from '../utils/models';
import * as INTENTS from '../constants/intents';
import getAvatar from '../services/avatar';

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
      conversation: { id: undefined, messages: [] },
      username: undefined,
      loading: false
    };

    this.handleSubmitUsername = this.handleSubmitUsername.bind(this);
    this.handleChatSubmit = this.handleChatSubmit.bind(this);
    this.handleGreeting = this.handleGreeting.bind(this);
    this.handleGif = this.handleGif.bind(this);
    this.handleAvatar = this.handleAvatar.bind(this);
    this.handleOther = this.handleOther.bind(this);
    this.setUsername = this.setUsername.bind(this);
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
    const { username } = this.state;
    let conversation = await Storage.getConversation();
    let conversationToken;

    if (conversation) {
      conversationToken = conversation.id;
    }

    const message = models.userMessage(username, true, text, conversationToken);
    conversation = await Storage.updateConversation(message);
    this.setState({ conversation, loading: true });

    const json = await Recast.converse(text, conversationToken);
    this.handleIntent(json);
  }

  handleIntent(message) {
    if (message.action && message.action.slug) {
      switch (message.action.slug) {
        case INTENTS.GENERATE_AVATAR:
          this.handleAvatar(message);
          break;
        case INTENTS.RICK_AND_MORTY:
          this.handleGif(message);
          break;
        case INTENTS.GREETINGS:
          this.handleGreeting(message);
          break;
        default:
          this.handleOther(message);
          break;
      }
    }
  }

  async handleGreeting(json) {
    const { replies, conversationToken } = json;
    let conversation = await Storage.getConversation();
    const message = models.botMessage(replies[0], conversationToken);

    conversation = await Storage.updateConversation(message, true);
    this.setState({ conversation });
  }

  async handleAvatar(json) {
    const { replies, conversationToken, action, entities } = json;
    let conversation = await Storage.getConversation();
    const token = conversation.id ? conversation.id : conversationToken;
    let message;

    if (action.done) {
      const { pseudo } = entities;
      if (pseudo && pseudo.length) {
        const [psd] = pseudo;
        const { value } = psd;
        const avatar = getAvatar(value);
        message = models.botMessage(avatar, token, 'image');
        conversation = await Storage.updateConversation(message);
        this.setState({ conversation });

        conversation = await Storage.updateConversation(replies[0], conversation.id);
        setTimeout(() => {
          this.setState({ conversation });
        }, 500);
      }
    } else {
      message = models.botMessage(replies[0], token);
      conversation = await Storage.updateConversation(message);
      this.setState({ conversation });
    }
  }

  async handleGif(json) {
    const { replies, conversationToken } = json;
    let conversation = await Storage.getConversation();
    const token = conversation.id ? conversation.id : conversationToken;
    const gif = RickAndMorty.random();
    let message = models.botMessage(gif, token, 'image');

    conversation = await Storage.updateConversation(message);
    this.setState({ conversation, loading: false });

    message = models.botMessage(replies[0], conversation.id);
    conversation = await Storage.updateConversation(message);

    setTimeout(() => {
      this.setState({ conversation });
    }, 500);
  }

  async handleOther(json) {
    const { replies, conversationToken } = json;
    let conversation = await Storage.getConversation();
    const token = conversation.id ? conversation.id : conversationToken;
    const message = models.botMessage(replies[0], token);

    conversation = await Storage.updateConversation(message);
    this.setState({ conversation });
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
           Welcom to Dimension C-137{username ? ` ${username}` : ''}
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
