const { Client, Intents, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const PREFIX = "!";

client.once("ready", () => {
  console.log(`${client.user.tag} is ready!`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.content.startsWith(PREFIX)) return;

  const [command, ...args] = message.content
    .trim()
    .substring(PREFIX.length)
    .split(/\s+/);

  if (command === "question") {
    message.channel.send(
      "What is the capital of France? (Answer using !answer [your answer])"
    );
  } else if (command === "answer") {
    if (args[0] && args[0].toLowerCase() === "paris") {
      let winnerRole = message.guild.roles.cache.find(
        (role) => role.name === "Winners"
      );

      // Create the role if it doesn't exist
      if (!winnerRole) {
        try {
          winnerRole = await message.guild.roles.create({
            name: "Winners",
            color: "GREEN",
            reason: "Role for users who answered correctly",
          });
        } catch (error) {
          console.error("Error creating the Winners role:", error);
          return;
        }
      }

      // Add the role to the user who answered correctly
      try {
        await message.member.roles.add(winnerRole);
        message.channel.send(
          `${message.author} got the correct answer and received the "Winners" role!`
        );
      } catch (error) {
        console.error("Error adding the Winners role to the user:", error);
      }
    } else {
      message.channel.send(
        `${message.author} got the wrong answer. Try again!`
      );
    }
  }
});

client.login('MTA5Nzk0MDQzMDIwNjgwODEyNg.G8rQVk.zLnkRn-34QAqP3Ysv6caaeVVGcv_PHVe06qY1c');
