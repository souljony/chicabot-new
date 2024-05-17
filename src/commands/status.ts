import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:status_command');

const API_URL = process.env.API_URL;
const API_SECRET_TOKEN = process.env.API_SECRET_TOKEN

const statuscmd = () => async (ctx: Context) => {
    const message = ctx.message as any;

    if (!message.text) {
        ctx.reply('Please specify the status. Usage: /status &lt;open|close&gt;');
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
        const response = await fetch(`${API_URL}/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_SECRET_TOKEN}`
            },
            body: JSON.stringify({ status })
        });

        const result = await response.json();
        if (response.ok) {
            ctx.reply(`Order system status changed to ${status}.`);
        } else {
            ctx.reply(`Failed to change status: ${result.error}`);
        }
    } catch (error) {
        console.error(error);
        ctx.reply('An error occurred while changing the status.');
    }
  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' });
  
};

export { statuscmd };


