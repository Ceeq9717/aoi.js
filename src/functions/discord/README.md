# Discord

## Directory Structure

```mermaid
graph RL;
$clientAvatar --> client;
$clientId --> client;
$clientTag --> client;
$clientToken --> client;
$ping --> client;
$guildId --> guild;
$guildName --> guild;
$message --> message;
$eval --> misc;
$authorId --> user;

```

## Divisions

 - `client`: Contains functions related to client
 - `guild`: Contains functions related to guild
 - `message`: Contains functions related to message
 - `misc`: Contains functions related to misc
 - `user`: Contains functions related to user