import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:status_command');

const API_URL = process.env.API_URL;
const API_SECRET_TOKEN = process.env.API_SECRET_TOKEN;

const statuscmd = () => async (ctx: Context) => {
  const message = ctx.message as any;

  if (!message.text) {
    ctx.reply('Please specify the status. Usage: /status <open|close>');
    return;
  }

  // Get the full text of the message
  const messageText = message.text;

  // Split the message text by spaces to get the command and arguments
  const args = messageText.split(' ');

  if (args.length < 2) {
    ctx.reply('Please specify the status. Usage: /status <open|close>');
    return;
  }

  const status = args[1];
  if (status !== 'open' && status !== 'close') {
    ctx.reply('Invalid status. Please use "open" or "close".');
    return;
  }

  try {
      // Update the bot's bio
      const bioDescription = status === 'open' ? 'CHICA BOT: Open' : 'CHICA BOT: Closed';
      await ctx.telegram.setMyName(bioDescription);

      ctx.reply(`Order system status changed to ${status}.`);
    } catch (error) {
    console.error(error);
    ctx.reply('An error occurred while changing the status.');
  }
};

export { statuscmd };