import Lyra from '@lyrafinance/lyra-js'
import { Telegraf } from 'telegraf'


const lyra = new Lyra()
const bot = new Telegraf(process.env.TELEGRAM_TOKEN)