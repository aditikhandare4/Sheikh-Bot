import * as discord from 'discord.js'
import { command } from './int'

export const KickUser: command = {
    title: 'Kicks the User',
    description: 'Kicks the mentioned user',
    category: 'moderation-general',
    command: function command(message: any) {
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            message.channel.send("You aren't based enough to use this command")
        }

        else {
            const user = message.mentions.users.first();
            if (user) {

                const member = message.guild.member(user);

                if (member) {
                    let msg: string[] = message.content.split(' ')
                    let reason: string = ''
                    if (msg.length > 2) {
                        for (let i = 2; i < msg.length; i++) {
                            reason += msg[i]
                            reason += ' '
                        }
                    }
                    member
                        .kick({ reason: reason })
                        .then(() => {
                            message.reply(`Successfully kicked ${user.tag}`);
                        })
                        .catch(err => {
                            message.reply('I was unable to kick the member');

                            console.error(err);
                        });
                } else {
                    message.reply("That user isn't in this guild!");
                }
            }
            else {
                message.reply("You didn't mention the user to kick!");
            }
        }
    }
}