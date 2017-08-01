import { array } from 'prop-types';
import Conversation from '../conversation/conversation';

const ConversationList = ({ conversations }) => (
  <ul>
    {conversations.map(conversation => <Conversation key={conversation.id} conversation={conversation}/>)}
  </ul>
);

ConversationList.propTypes = {
  conversations: array
};

ConversationList.defaultProps = {
  conversations: []
};

export default ConversationList;
