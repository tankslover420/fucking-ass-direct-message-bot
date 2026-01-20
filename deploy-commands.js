const { REST, Routes, SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

const command = new SlashCommandBuilder()
    .setName("dmrole")
    .setDescription("DM everyone with a specific role")
    .addRoleOption(option =>
        option.setName("role")
            .setDescription("Role to DM")
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
    console.log("✅ Slash command registered");
})();
