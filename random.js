
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import "dotenv/config";
import axios from "axios";


const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

export const randomBot=()=>{
    bot.on("text", async (ctx) => {
        const apiName = ctx.update.message.text;
        try {
            if (apiName == "Region") {
    
                const keyboard = [
                    [{ text: "Italian" }, { text: "Chinese" }, { text: "American" }, { text: "Spanish" }, { text: "Japanese" }],
                    [{ text: "Indian" }, { text: "Turkish" }, { text: "Russian" }, { text: "Canadian" }, { text: "Mexican" }],
                    [{ text: "<-Back" }]
                ];
                ctx.reply("Iltimos hududni tanlang", {
                    reply_markup: {
                        keyboard: keyboard,
                        resize_keyboard: true,
                    },
                });
            }
            if (apiName == "Name") {
                const keyboard = [
                    [{ text: "Chicken" }, { text: "Tomato" }, { text: "Mushroom" }],
                    [{ text: "Eggplant" }, { text: "Potato" }, { text: '<- Back' }],
                ];
                ctx.reply("Iltimos taom nomini tanlang", {
                    reply_markup: {
                        keyboard: keyboard,
                        resize_keyboard: true,
                    },
                });
                nameAPI(apiName, ctx)
            }
            if (apiName == "Ingredient") {
                const keyboard = [
                    [{ text: "Chicken_breast" }, { text: "Beef" }, { text: "Carrot" }],
                    [{ text: "Pepper" }, { text: "Garlic" }, { text: '<- Back' }],
                ];
                ctx.reply("Iltimos taom nomini tanlang", {
                    reply_markup: {
                        keyboard: keyboard,
                        resize_keyboard: true,
                    },
                });
                nameAPI(apiName, ctx)
            }
            if (apiName == "Random") {
                await axios
                    .get(process.env.RANDOM_API)
                    .then((data) =>
                        data.data.meals.map((item, index) => {
                            ctx.reply(`
                    Title: ${item.strMeal}
                    ${item.strMealThumb}
                    ${item.strCategory}
                    `);
                        })
                    )
            }
            if (apiName == "<- Back") {
                const keyboard = [
                    [{ text: "Region" }, { text: "Category" }, { text: "Name" }],
                    [{ text: "Ingredient" }, { text: "Random" }],
                ];
                // console.log(text)
                ctx.reply("Iltimos yo'nalishni tanlang", {
                    reply_markup: {
                        keyboard: keyboard,
                        resize_keyboard: true,
                    },
                });
                // console.log(text)
            }
    
        } catch (error) {
            console.log(error);
        } if (apiName == 'Chinese' || apiName == 'Italian' || apiName == 'Canadian' || apiName == 'American' || apiName == 'Turkish') {
            regionAPI(apiName, ctx)
        }
        if (apiName == 'Chicken' || apiName == 'Tomato' || apiName == 'Potato' || apiName == 'Mushroom' || apiName == 'Eggplant') {
            nameAPI(apiName, ctx)
        }
        if (apiName == 'Chicken_breast' || apiName == 'Garlic' || apiName == 'Pepper' || apiName == 'Carrot' || apiName == 'Beef') {
            ingredientAPI(apiName, ctx)
        }
    });
    
}
