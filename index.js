const { Client, GatewayIntentBits, PermissionsBitField } = require("discord.js");
require("dotenv").config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.once("clientReady", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName !== "dmrole") return;

    if (!interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
    )) {
        return interaction.reply({
            content: "❌ Admin only command.",
            ephemeral: true
        });
    }

    const role = interaction.options.getRole("role");
    const message = interaction.options.getString("message");

    await interaction.reply({
        content: "📨 Sending DMs...",
        ephemeral: true
    });

    let sent = 0;
    let failed = 0;

    for (const member of role.members.values()) {
        if (member.user.bot) continue;
        try {
            await member.send(message);
            sent++;
        } catch {
            failed++;
        }
    }

    await interaction.editReply(
        `✅ Done!\n📤 Sent: ${sent}\n❌ Failed: ${failed}`
    );
});

client.login(process.env.TOKEN);
