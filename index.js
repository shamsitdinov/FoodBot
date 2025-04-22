
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import "dotenv/config";
import axios from "axios";


const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

const regionAPI = async (text, context) => {
    await axios
        .get(`${process.env.REGION_API}${text}`)
        .then((data) =>
            data.data.meals.slice(0, 4).map((item, index) => {
                context.reply(`
                Title: ${item.strMeal}
                ${item.strMealThumb}
                `);
            })
        )
        .catch((err) => console.log(err));
}
const nameAPI = async (text, context) => {
    await axios
        .get(`${process.env.NAME_API}${text}`)
        .then((data) =>
            data.data.meals.slice(0, 4).map((item, index) => {
                context.reply(`
                Title: ${item.strMeal}
                ${item.strMealThumb}
                `);
            })
        )
        .catch((err) => console.log(err));
}
const ingredientAPI = async (text, context) => {
    await axios
        .get(`${process.env.INGREDIENT_API}${text}`)
        .then((data) =>
            data.data.meals.slice(0, 4).map((item, index) => {
                context.reply(`
                Title: ${item.strMeal}
                ${item.strMealThumb}
                `);
            })
        )
        .catch((err) => console.log(err));
}
const categoryAPI = async (text, context) => {
    await axios
        .get(`${process.env.CATEGORY_API}${text}`)
        .then((data) =>
            data.data.meals.slice(0, 4).map((item, index) => {
                context.reply(`
                Title: ${item.strMeal}
                ${item.strMealThumb}
                `);
            })
        )
        .catch((err) => console.log(err));
}

bot.start((ctx) =>
    ctx.reply("Welcome to our food bot", {
        reply_markup: {
            inline_keyboard: [[{ text: "Davom etish", callback_data: "continue" }]],
        },
    })
);

bot.on("callback_query", (ctx) => {
    const res = ctx.update.callback_query.data;
    if (res == "continue") {
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
});
bot.on("text", async (ctx) => {
    const apiName = ctx.update.message.text;
    try {
        if (apiName == "Region") {

            const keyboard = [
                [{ text: "Chinese" }, { text: "Italian" }, { text: "Canadian" }],
                [{ text: "American" }, { text: "Turkish" }, { text: '<- Back' }],
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
                [{ text: "Pepper" }, { text: "Garlic" }, { text: '<-Back' }],
            ];
            ctx.reply("Iltimos taom nomini tanlang", {
                reply_markup: {
                    keyboard: keyboard,
                    resize_keyboard: true,
                },
            });
            nameAPI(apiName, ctx)
        }
        if (apiName == "Category") {
            const keyboard = [
                [{ text: "Breakfast" }, { text: "Beef" }, { text: "Carrot" }],
                [{ text: "Pepper" }, { text: "Garlic" }, { text: '<-Back' }],
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
        if (apiName == "<-Back") {
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
    if (apiName == 'Breakfast' || apiName == 'Garlic' || apiName == 'Pepper' || apiName == 'Carrot' || apiName == 'Beef') {
        categoryAPI(apiName, ctx)
    }
});

bot.launch({ dropPendingUpdates: true });