class Recast {
  static async converse(text, conversationToken = null) {
    try {
      const payload = { text, conversationToken };
      const body = await JSON.stringify(payload);
      const res = await fetch('/converse', {
        body,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8'
        }
      });
      const json = await res.json();
      return json;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Recast;
