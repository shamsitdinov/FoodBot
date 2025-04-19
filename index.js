import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import 'dotenv/config'
// import { keyboard } from './node_modules/telegraf/src/markup';
// import { callbackQuery } from './node_modules/telegraf/src/filters';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

// bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.command('about',ctx=>ctx.reply('About Us'))
// bot.command('info',ctx=>ctx.reply('Info company'))
bot.start((ctx) => ctx.reply('Welcome to our food bot', {
    reply_markup: {
        inline_keyboard: [
            [{ text: "Davom etish", callback_data: 'continue' }]
        ]
    }
}))

bot.on('callback_query', ctx => {
    const res = ctx.update.callback_query.data
    if (res == 'continue') {
        const keyboard = [[{ text: "Region" }, { text: "Category" }, { text: "Name" }], [{ text: "Ingredient" }, { text: "Random" }]]
        // console.log(text)
        ctx.reply("Iltimos yo'nalishni tanlang", {
            reply_markup: {
                keyboard: keyboard,
                resize_keyboard: true
            }
        })
        // console.log(text)
    }
})
// bot.on('text', ctx => {
//     console.log(ctx.update.message.text)
// })

bot.launch({ dropPendingUpdates: true }) 