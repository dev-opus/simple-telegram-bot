/**
 *
 * Title: Hello Telegram Bot
 * Author: Victor Orlunda
 * Date: 19 Feb, 2022
 *
 */

/**
 *
 * Required External Modules
 *
 */

import * as dotenv from 'dotenv';
import { Telegraf } from 'telegraf';

/**
 *
 * Initialize App Variables
 *
 */

dotenv.config();

/**
 *
 * App Main Functiion
 *
 */

function main() {
  console.log('started!');

  const bot = new Telegraf(process.env.BOT_TOKEN);

  bot.start(ctx => {
    ctx.reply(
      `${randomReply()} Welcome! Type "hello" or send a sticker to get a response!`
    );
  });

  bot.help(ctx => {
    ctx.reply(
      `${randomReply()} This bot is a simple conversational bot with limited capabilities.`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'contact me',
                callback_data: 'contact-me',
              },
              {
                text: 'hello',
                callback_data: 'hello',
              },
            ],
          ],
        },
      }
    );
  });

  bot.action(/contact-me/i, ctx => {
    ctx.reply(
      `${randomReply()} Nice getting intouch with you, my username is @@hiatus_0`
    );
  });

  bot.action(/hello/i, ctx => {
    ctx.reply(`${randomReply()} I think you're awesome! 😇`);
  });

  bot.on('sticker', ctx => {
    ctx.reply(`${randomReply()} Nice sticker! ✨`);
  });

  bot.hears(/hello/i, ctx => {
    ctx.reply(`${randomReply()} I think you're awesome! 😇`);
  });

  bot.launch();

  process.once('SIGTERM', () => bot.stop('SIGTERM'));

  process.once('SIGINT', () => bot.stop('SIGINT'));
}

/**
 *
 * App Activation
 *
 */

main();

/**
 *
 * Helper Functions
 *
 */

function randomReply() {
  const index = Math.floor(Math.random() * 3);

  const replies = ['Hi 👋🏼', 'Hey 👋🏼', 'Hey ya 👋🏼'];

  const randomReply = replies[index];

  return randomReply;
}
