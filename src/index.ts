import 'dotenv/config';
import { Telegraf } from 'telegraf'
import 'dotenv/config';
import Lyra from '@lyrafinance/lyra-js'
import Fauna from './fauna';
const faunadb = require('faunadb') 


export default async function bot() {

  //INIT
  const bot = new Telegraf(process.env.TELEGRAM_TOKEN)
  const client = new faunadb.Client({
    secret: process.env.FAUNA_TOKEN,
    domain: 'db.fauna.com',
    port: 443,
    scheme: 'https',
  })
  const q = faunadb.query
  const lyra = new Lyra();

  bot.start((ctx) => {ctx.reply('Welcome to Lyra Liquidation Alert Tool')})
  bot.help((ctx) => {ctx.reply('Use /track [Your-ethereum account] to check orders')})

  bot.command('test', async (ctx) => {
    let account = ctx.message.text.split(' ')[1]
    let positions = await lyra.openPositions(account)
    //Saves data to Fauna
    let x = positions.map(pos => (Fauna({
      id: pos.id,
      owner: pos.owner,
      marketName: pos.marketName,
      marketAddress: pos.marketAddress,
      size:  pos.size,
      isOpen: pos.isOpen,
      isCall: pos.isCall,
      isLong: pos.isLong,
      isSettled: pos.isSettled,
      isBaseCollateral: pos.collateral?.isBase,
      liquidationPrice: pos.collateral?.liquidationPrice,
      numTrades: pos.trades().length,
      avgCostPerOption: pos.avgCostPerOption(),
      pricePerOption: pos.pricePerOption,
      realizedPnl: pos.realizedPnl(),
      realizedPnlPercent: pos.realizedPnlPercent(),
      unrealizedPnl: pos.unrealizedPnl(),
      unrealizedPnlPercent: pos.unrealizedPnlPercent(),
      expiryTimestamp: pos.expiryTimestamp,
    })))
    ctx.reply('test')
  });

  bot.launch()

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'))
  process.once('SIGTERM', () => bot.stop('SIGTERM'))

};

bot()