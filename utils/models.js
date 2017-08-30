/**
*
* @model Token
* @type String | Undefined
*
*
* @model Message
* @type Message = {
*   user: {String},
*   me: {Boolean}
*   text: {String}
*   posted: {Number}
*   conversationToken: {Token}
*   type?: {String}
* }
*
* @model Conversation
* @type Converstion = {
*   id: {Token}
*   messages: {[Message]}
* }
*/

const userMessage = (user, me, text, conversationToken = null) => ({
  user,
  me,
  text,
  posted: Date.now(),
  conversationToken
});

const botMessage = (message, conversationToken, type) => ({
  user: 'Rick Sanchez',
  me: false,
  text: message,
  posted: Date.now(),
  conversationToken,
  type
});

module.exports = {
  botMessage,
  userMessage
};

