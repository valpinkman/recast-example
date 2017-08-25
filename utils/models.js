export const userMessage = (user, me, text, conversationToken) => ({
  user,
  me,
  text,
  posted: Date.now(),
  conversationToken
});

export const botMessage = (message, conversationToken, type) => ({
  user: 'Rick Sanchez',
  me: false,
  text: message,
  posted: Date.now(),
  conversationToken,
  type
});

