# Gabe, a Steam Slack Bot

![Preview](https://raw.githubusercontent.com/ImStuartJones/gabe/master/screenshot.png)

Gabe is a simple Slack bot for searching the Steam storefront. When a user inputs the '/steam' command along with a game title, Gabe will reply with a brief summary of the game, along with a link to the game's Steam page.

## Requirements

This Slack bot is a NodeJS app. It's got a few dependencies, which it fetches through npm. Gabe uses Express to route Slack commands. The Steam store data is fetched through NAME's excellent [steam-store]() utility. Steam technically doesn't have an API for the online store, steam-store is using an undocumented API Steam uses for the Big Picture mode. This API doesn't have a search functionality, so Gabe has to download the entire app list when it first runs. This list is stored in a sqlite3 database, and is updated using the [cron]() package at midnight and noon.

I've also included a Procfile in this repository. You can run Gabe anywhere, but Slack requires apps using /slash commands to be hosted on a server with SSL. Heroku makes an ideal place since they provide SSL out of the box.

## Slack Configuration

You'll need to set up two Custom Integrations in Slack. First create a Slash Command with `/steam` for the command, `https://YourServer.com/steam` for the URL, POST for the Method, and whatever Name and Icon you'd like. Next, create a an Incoming Webhook. Set the Channel to the channel you'd like the command to work in, and then conigure the name and icon with the same name and icon as you used for the Slash Command.

Steambot.js needs to use the Incoming Webhook URL in the send() function. You'll either need to insert everything after `https://hooks.slack.com/services` as a variable into the source code (including the `/` character), or you'll need to set your system's process.env.INCOMING_WEBHOOK_PATH to that same variable.

## Build and Run

Gabe's build process is fairly standard. `npm install`, then `node app`. If you're going to run Gabe on Heroku, commit the code to a local git repository, then run `heroku create` and `git push heroku master`. You'll also have to set Heroku's config vars to have `INCOMING_WEBHOOK_PATH` set to your Slack's incoming webhook path variable. This can be done through Heroku's web console, or through the command `heroku config:set INCOMING_WEBHOOK_PATH=[Everything after "https://hooks.slack.com/services" in Slack's Incoming Webhook URL]`.
