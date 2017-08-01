import { Component } from 'react';
import trianglify from 'trianglify';
// import Action from '../ui/components/action/action';
// import Write from '../ui/components/icons/write';
import Avatar from '../ui/components/avatar/avatar';
// import Chat from '../ui/components/chat/chat';
// import Form from '../ui/components/form/form';
import Title from '../ui/components/title/title';
import Container from '../ui/components/container/container';
import Storage from '../services/db';

const COLORS_X = ['#fff', '#EF6F6E', '#E9225E'];
const COLORS_Y = ['#003B67', '#0088DE', '#29B7F6', '#fff', '#EF6F6E'];

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
      conversations: [],
      username: undefined,
      selected: undefined,
      active: false,
      get chat() {
        return this.conversations.find(el => el.id === this.selected);
      }
    };

    this.generatePattern = this.generatePattern.bind(this);
    this.onSubmitUsername = this.handleSubmitUsername.bind(this);
    this.setUsername = this.setUsername.bind(this);
  }

  async componentDidMount() {
    // Create background and binds method to resize event
    this.generatePattern();
    window.addEventListener('resize', this.generatePattern);

    // Look into storage if there is a username of conversations already setup
    const conversations = await Storage.getAllConversations();
    const username = await Storage.getUsername();

    // If there are conversations, load them into the state
    if (conversations && conversations.length) {
      this.setState({ conversations });
      this.setUsername(username);

      // If there are no conversations but a username
    } else if (username) {
      this.setUsername(username);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.generatePattern);
  }

  handleSubmitUsername(e) {
    e.preventDefault();
    // NOTE: add an intermediary step to confirm name
    if (this.username.value) {
      this.setUsername(this.username.value);
    }
  }

  async setUsername(username) {
    await Storage.setUsername(username);
    this.setState({ username });
  }

  generatePattern() {
    const { pattern } = this;
    if (pattern) {
      const { width, height } = pattern.getBoundingClientRect();
      const triangle = trianglify({
        width,
        height,
        /* eslint-disable */
        y_colors: COLORS_Y,
        x_colors: COLORS_X,
        variance: 0.75,
        cell_size: 25,
        color_space: 'rgb'
        /* eslint-enable */
      });

      const canvas = pattern.querySelector('canvas');

      // Check if there is already a canvas
      if (canvas) {
        pattern.removeChild(canvas);
      }

      pattern.appendChild(triangle.canvas());
      this.forceUpdate();
    }
  }

  render() {
    const { username } = this.state;

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

          .pattern {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: -10;
          }

          .action {
            position: fixed;
            bottom: 30px;
            right: 30px;
          }

          p {
            text-align: center;
          }

          {/* .chat {
            display: flex;
            flex-direction: column;
            width: 100vw;
            height: 100vh;
          } */}
        `}
        </style>
        <div
          ref={comp => {
            this.pattern = comp;
          }}
          className="pattern"
        />
        <Container>
          <Title color="#fff">Dimension C137{username ? ` - ${username}` : ''}</Title>

        </Container>
        {username ?
          <Container>
            <Avatar username={username}/>
            <span>{username}</span>
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
        {/* <Action onClick={() => {}}>
          <Write />
        </Action>
        <section className="chat">
           <Chat active={chat}/>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          />
        </section> */}
      </div>
    );
  }
}

export default Index;
