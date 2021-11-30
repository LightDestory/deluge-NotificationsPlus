# NotificationsPlus

<p align="center"><a href="https://github.com/LightDestory/deluge-NotificationsPlus" title="NotificationsPlus"><img src="https://i.imgur.com/xXIPX44.png" alt="NotificationsPlus"></a></p>

[NotificationsPlus](https://github.com/LightDestory/deluge-NotificationsPlus) is a [Deluge](https://deluge-torrent.org) plugin for sending notifications of various type triggered by specific events. It features both a GTK and Web UI.

_NotificationsPlus_ is a fork of [_Notifications_](https://github.com/deluge-torrent/deluge/tree/develop/deluge/plugins/Notifications) plugin by Pedro Algarvio. The aim of this fork is to add Telegram integration to the original plugin providing the same user-experience.

The idea behind telegram's integrations is a bot sending notification to chat [Private Chat, Group, Channel] when a new torrent is added to the queue or when a torrent is completed.

**This plugin is superficially named "NotificationsPlus" but in the code is still named "Notifications" because it is meant to replace the original plugin, they can't coexists**.

  * [Requirements](#requirements)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Development](#development)
  * [License](#license)

## Requirements

NotificationsPlus is based on Notifications 0.4, so it has been tested on Linux and Windows using Deluge 2.0.3 and Python 3.8.

Make sure you have Python [`setuptools`](https://pypi.python.org/pypi/setuptools#installation-instructions) installed in order to build the plugin.

## Installation

Installing NotificationsPlus is very easy:
* Build a plugin egg:
    * Get the source code:
        * [Download the source code](https://github.com/LightDestory/deluge-NotificationsPlus/archive/refs/heads/master.zip) and extract the archive anywhere.
        * Run `git clone https://github.com/LightDestory/deluge-NotificationsPlus.git` in a directory of your choosing.

    * Open the terminal inside the source code's folder and run `python setup.py bdist_egg` to build the plugin.
        * _Make sure that the builder machine uses the same python version of the machine that runs Deluge!_
    * To install the plugin using the Deluge graphical user interface, go to `Preferences -> Plugins` and click `Install Plugin`. Locate the plugin egg and select it to install. The egg file should be in the same directory to which it was extracted or cloned, inside the `dist` directory.
    * For more detailed installation instructions, see the [Deluge wiki](http://dev.deluge-torrent.org/wiki/Plugins#InstallingPluginEggs).

After installing the plugin, restarting Deluge and the Deluge daemon (`deluged`) is recommended in order to avoid errors.

## Usage

I will cover only the telegram related usage because the other settings are untouched and you can just use the official documentation of the _Notifications_ plugin.

After you've installed and enabled the plugin using the Deluge GTK or Web UI, you will need to enable the Telegram notifications and configure a _Bot Token_ and _Chat ID_.

The plugin's settings can be found on `Preferences -> Notifications`.

To get a _Bot Token_, you need to create a bot by sending a message to [@BotFather](https://telegram.me/BotFather) and create a new bot according to BotFather's instructions. Once you've created your bot, BotFather will provide you a token (you can also regenerate it later). Copy it to the plugin's configuration under "Bot Token" field.

Afterwards, you must retrieve the _Chat ID_ of your desired chat.

* If you want to send notification to a group, the bot must be a member of the group.
  * Use [@GetIDs Bot](https://t.me/getidsbot), just forward a message from the group to the bot to get the id. Copy the ID to plugin's configuration under "Chat ID" field.
* If you want to send notification to a channel, the bot must be an administrator of the channel.
  * Use [@GetIDs Bot](https://t.me/getidsbot), just forward a message from the channel to the bot to get the id. Copy the ID to plugin's configuration under "Chat ID" field.
* If you want to send notification to yourself in the private chat, you must open a conversation with the bot.
  * Send a message to [@MyIDbot](https://telegram.me/myidbot) and send it the `/getid` command to receive your Telegram user ID. Copy your user ID to plugin's configuration under "Chat ID" field.

Now you must save the settings by clicking on "Apply" button. 

Now that you Telegram integration is enabled and configured, go to `Preferences -> Notifications -> Subscriptions` and enable the Telegram notification for your desidered Event.

## Development

If you have any suggestions for improvement or new features you think might help others, open new *Issues* and/or contribute by creating *Pull Requests*!

## License

This is free software under the GPL v3 open source license. Feel free to do with it what you wish, but any modification must be open sourced. A copy of the license is included.