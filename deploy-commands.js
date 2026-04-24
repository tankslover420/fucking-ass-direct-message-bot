const { REST, Routes, SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

const command = new SlashCommandBuilder()
    .setName("dmrole")
    .setDescription("dm everyone with a role")
    .addRoleOption(option =>
        option.setName("role")
            .setDescription("role to dm")
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName("message")
            .setDescription("Message to send")
            .setRequired(true)
    );

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    await rest.put(
        Routes.applicationGuildCommands(
            process.env.CLIENT_ID,
            process.env.GUILD_ID
        ),
        { body: [command.toJSON()] }
    );
    console.log("slash command registered");
})();
