import { Client, GatewayIntentBits, Message } from 'discord.js';
import { ask } from './openai';

export class ShafraBot {
  intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ];

  client = new Client({
    intents: this.intents
  });

  token = process.env.DISCORD_TOKEN ?? '';

  async start() {
    this.client = new Client({ intents: this.intents });
    await this.client.login(this.token);
    this.client.once('ready', this.onReady.bind(this));
    this.client.on('messageCreate', this.onMessage.bind(this));
  }

  async stop() {
    await this.client.destroy();
  }

  onReady(client: Client<true>) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
  }

  async onMessage(message: Message) {
    if (message.author.bot) {
      return;
    }

    if (message.content.startsWith('!')) {
      this.onCommand(message);
      return;
    }

    const reply = await ask(message.cleanContent);
    const response = reply?.trim();
    if (response !== `'""'` && response !== `"''"` && response !== '""') {
      message.reply(response ?? 'No valid response');
    }

    console.log({ response });
  }

  onCommand(message: Message) {
    message.reply('!command');
  }
}
