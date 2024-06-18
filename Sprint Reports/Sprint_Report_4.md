# Sprint x Report (11/2/2023 - 11/28/2023)

## What's New (User Facing)
 * Enhanced UI
 * Removed white space blocking
 * Add stop Feature
 * Usage report statistics printout
 * server connection via mobile web browser possible

## Work Summary (Developer Facing)
Sprint 4 involved a lot of setbacks and upsets. We have had to miss one project specification of the client due to legal restrictions and have adapted our framework to help them recover some of the functions they desire. We also learned that they have a moving requirement for a beta test requiring us to transition to a web application instead of a mobile application, which is good news as our lead mobile application developer discovered a mistake that means we wouldn't be able to make a mobile app as planned originally. On the server side of things, adaptations were made to allow the server to run in a windows environment instead of Linux and to allow users of apple products to connect through a more stable line. This required an overhaul of the server systems. A great deal of reorganization and restructuring took place to accommodate the new project direction. 

## Unfinished Work
Mitch has taken JJ as a full support developer and left the server side to me alone. This meant that I did not have the support I was expecting when moving this sprint towards an end goal of getting client to server connections ready. As such the JS side of the code still cannot send requests to the server as I had hoped to have JJ work on this last sprint, but he was unable to, and now he was taken for work with Mitch, so the development is left wholly my own. As such the work has shifted to next sprint. 

## Completed Issues/User Stories
Here are links to the issues that we completed in this sprint:

 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/54
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/55
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/58
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/62
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/63
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/pull/64
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/pull/64
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/pull/56
 
 ## Incomplete Issues/User Stories
 Here are links to issues we worked on but did not complete in this sprint:
 
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/65


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
 
## Retrospective Summary
Here's what went well:
  * Client was happy with restricting plan in the face of missing requirement
  * server code was updated without introducing new bugs
  * Code looks cleaner on the JS side and will hopefully have less bugs as a result
  * Our Client was very happy with the results so far
 
Here's what we'd like to improve:
   * We need to fix a few bugs in the existing code, but otherwise progress is smooth and can continue at this pace and style

Here are changes we plan to implement in the next sprint:
   * We will not change our development style, this is working and will remain working for the future sprints


## Cloud Storage before and after video link
   * Sprint report video link: https://drive.google.com/drive/folders/1gPbZV4HM-yJix6Tn-i2EMrQydGVylBSv?usp=sharing
   