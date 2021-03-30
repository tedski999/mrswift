
async function handler(interaction) {
  const command = interaction.data.name.toLowerCase();
  if (command === "ping") {
    this.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "pong"
        }
      }
    });
  }
}

module.exports = handler;
