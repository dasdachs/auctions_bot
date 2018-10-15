const TelegramBot = require('node-telegram-bot-api');
const logger = require('./src/logger.js');
require('dotenv').config();


const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});

/*** Start command ***/
// Describe all the commands
bot.onText(/\/start/, msg => {
  const commandList = `
  Hi ${msg.chat.id}! I am a bot for keeping an eye on auctions on <a href="http://www.bolha.com">bolha.com</a>

  You can keep track of up to *3* items and I will send you daily updates.

  <strong>/echo</strong> ... Echoes back your message
    
  <strong>TODO:</strong>

  <strong>/notification</strong> ... Set the frequency of your notifications.
  <strong>/list</strong> ... Lists your items and their coresponding urls.
  <strong>/watch</strong> ... Watch the site for items you want to keep track of. You can pass in the name of the item or a URL.
  <strong>/update</strong> ... Update the search constrains for the items you are following.
  `;

  bot.sendMessage(msg.chat.id, commandList, {parse_mode: "HTML"});
});

// For testing and fun
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  logger.info(`/echo ${resp}`);
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

/*** Error handling ***/
bot.on('polling_error', (error) => {
  logger.error(error.code);
});
