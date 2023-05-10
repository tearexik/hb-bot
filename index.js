const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`С днём Варенья, ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}`))
bot.help((ctx) => ctx.reply(`Вот что я умею ${text.commands}`))


bot.command('present', async (ctx)=>{
    try{
        await ctx.replyWithHTML('<b>Подарочек</b>🎁', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Тортик 🎂', 'btn_1')]
            ]
        ))
    } catch(e){
        console.error(e)
    } 
})



function addActionBot(name, src){
    bot.action(name, async (ctx) => {
        try{
            await ctx.answerCbQuery()
            if(src !== false){
                await ctx.replyWithPhoto({
                    source:src
                })
            }
        } catch(e){
            console.error(e)
        } 
    })
}


addActionBot('btn_1', './img/7.jpg')
addActionBot('btn_3', './img/3.jpg')
addActionBot('btn_4', './/img/4.jpg')
addActionBot('btn_5', './img/6.jpg')
addActionBot('btn_6', './img/5.jpg')
addActionBot('btn_7', './img/1.jpg')
addActionBot('btn_8', './img/8.jpg')

bot.command('congrats', async (ctx) => {
    try {
      await ctx.replyWithHTML('<b>Выбери поздравленице</b>🎁', Markup.inlineKeyboard(
        [
          [
            Markup.button.callback('Кошачье 🐱', 'btn_3'),
            Markup.button.callback('Капибарское ', 'btn_4')
          ],
          [
            Markup.button.callback('Душевное 🫠', 'btn_5'),
            Markup.button.callback('Депрессивное 😥', 'btn_6'),
          ],
          [
            Markup.button.callback('От Хэшика 🐺', 'btn_7'),
            Markup.button.callback('От меня 🦖', 'btn_8'),
          ]
        ]
      ))
    } catch (e) {
      console.error(e)
    }
  })



bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))