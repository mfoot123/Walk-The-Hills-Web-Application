# Sprint x Report (11/2/2023 - 11/28/2023)

## What's New (User Facing)
 * Enhanced UI
 * Repaired pin drop bug
 * updated elevation gain display
 * Fixed panel display
 * Added database admin login and commands

## Work Summary (Developer Facing)
Sprint 5 involved updating the database to allow admin controls and database management. This also means the server has local connections enabled and communicating smoothly under a specified protocol. We also did many UI overhauls that helped repair a large number of visual bugs in the css/html. These allowed us to do reorganization of JS code to also find and repair bugs in those sections. A large effort was made to better understand the needs of our server and have one set up for us by VECA. This is still underway. 

## Unfinished Work
The VECA server must be established so we can continue development with tests on using the database in live instruction. We also need to build JS commands that support database to map client communications in real time. These combine allow us to roll out an alpha test. 

## Completed Issues/User Stories
Here are links to the issues that we completed in this sprint:

 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/pull/70
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/72
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/pull/73
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/pull/81
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/pull/71
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/74
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/75
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/76
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/77
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/pull/68
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/pull/79
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/65
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/82
 
 ## Incomplete Issues/User Stories
 Here are links to issues we worked on but did not complete in this sprint:
 
 * None


## Code Files for Review
Please review the following code files, which were actively developed during this sprint, for quality:
 * [App.js](https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/blob/main/walking-directions-app/src/App.js)
 * [App.css](https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/blob/main/walking-directions-app/src/App.css)
 * [dark_mode.js](https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/blob/main/walking-directions-app/src/DarkMode.js)
 * [marker.js](https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/blob/main/walking-directions-app/src/Marker.js)
 * [menu.css](https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/blob/main/walking-directions-app/src/Menu.css)
 * [path.js](https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/blob/main/walking-directions-app/src/Path.js)
 * [review.js](https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/blob/main/walking-directions-app/src/Review.js)
 * [command_parser.cpp](https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/blob/main/walking-directions-app/database/server_database/server_database/Command_Parser.cpp)
 * [Command_parser.h](https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/blob/main/walking-directions-app/database/server_database/server_database/command_parser.h)
 * [Main.cpp](https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/blob/main/walking-directions-app/database/server_database/server_database/main.cpp)
 * [RouteInfoNode.h](https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/blob/main/walking-directions-app/database/server_database/server_database/RouteInfoNode.h)
 * [RouteInfoNode.cpp](https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/blob/main/walking-directions-app/database/server_database/server_database/RouteInfoNode.cpp)
 * [RouteMap.cpp](https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/blob/main/walking-directions-app/database/server_database/server_database/RouteMap.cpp)
 * [RouteMap.h](https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/blob/main/walking-directions-app/database/server_database/server_database/RouteMap.h)
 * [Admin_user.cpp] https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/blob/main/walking-directions-app/database/admin_user/admin_user/admin_user.cpp
 * [all_server_connection_tools] https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/tree/main/walking-directions-app/database/server_database/server_database/networking/Servers
 * [all_socket_connection_tools] https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/tree/main/walking-directions-app/database/server_database/server_database/networking/Sockets
 
## Retrospective Summary
Here's what went well:
  * Client was happy with restricting plan in the face of missing requirement
  * server code was updated without introducing new bugs
  * Code looks cleaner on the JS side and will hopefully have less bugs as a result
  * Our Client was very happy with the results so far
 
Here's what we'd like to improve:
   * Keep going, we are nearly done and ready for an alpha.

Here are changes we plan to implement in the next sprint:
   * We will not change our development style, this is working and will remain working for the future sprints


## Cloud Storage before and after video link
   * Sprint report video link: https://drive.google.com/drive/folders/1E5CT4kFm1fM0NqbBGkLzP69txFfD1irU?usp=sharing
   