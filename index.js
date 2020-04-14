const { version } = require('./package.json');
const { WebhookClient } = require("discord.js")
class webhookForwarder {
    /**
     * @param {Client} client - Your d.js client.
     * @param {string} webhookid - Your webhook ID.
     * @param {string} webhooktoken - Your webhook Token
     * @param {string} source - Your source channel
     **/
    constructor(client, webhookid, webhooktoken, source) {
        this.client = client || null;
        this.webhookid = webhookid || null;
        this.webhooktoken = webhooktoken || null;
        this.source = source || null;
    }
async start() {
  var webhook = new WebhookClient(this.webhookid, this.webhooktoken)
  this.client.on("message", message => {
    if(message.channel.id == this.source) {
      try {
      webhook.send(message.content)
      }
      catch(e) {
        console.error(`[ERROR] : ${e}`)
      }
    }
  })
}
}

module.exports = webhookForwarder;
exports.version = version;
