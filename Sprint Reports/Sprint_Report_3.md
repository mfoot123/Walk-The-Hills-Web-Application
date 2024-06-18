# Sprint x Report (11/2/2023 - 11/28/2023)

## What's New (User Facing)
 * Add Comment
 * Add Stop
 * Semi-functional Filtering
 * Map import redesign
 * review route

## Work Summary (Developer Facing)
Sprint 3 was a whirlwind of development that took the application from a map application to a filtering and communication application. With the implementation of both route filtering and comment submission the application looks and feels like what the client ahs been asking for. This also involved a great deal of backend development on the server that allows cross communication for all devices asking for safety data. This meant building a local host system that could filter using a Dijkstra algorithm on custom weights from a graph we imported from free available data and then reconstructed to use our own specifiers and attributes. This then needs to recommunicate with Google Maps in a shared language so that a new route can be produced in seemingly no time for the user. All this was implemented in one of our most productive sprints so far. 

## Unfinished Work
One main issue remains, the bug that has haunted our team since we started out has once more re emerged. Pins remain existent despite the rerouting requests being made. These pins become inactive, but show on the UI layer. For some reason the UI and logic layers grow out of sync and we once more need to address this syncing issue. This bug will be solved in Sprint 4.

## Completed Issues/User Stories
Here are links to the issues that we completed in this sprint:

 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/23
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/42
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/43
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/44
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/48
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/49
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/50
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/51
 
 ## Incomplete Issues/User Stories
 Here are links to issues we worked on but did not complete in this sprint:
 
 * All issues completed this sprint


## Code Files for Review
Please review the following code files, which were actively developed during this sprint, for quality:
 * [App.js](https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/blob/main/walking-directions-app/src/App.js)
 * [App.css](https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/blob/main/walking-directions-app/src/App.css)
 * [HostServer.h](https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/blob/main/walking-directions-app/database/HostServer.h)
 * [HostServer.cpp](https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/blob/main/walking-directions-app/database/HostServer.cpp)
 * [Main.cpp](https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/blob/main/walking-directions-app/database/Main.cpp)
 * [RouteInfoNode.h](https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/blob/main/walking-directions-app/database/RouteInfoNode.h)
 * [RouteInfoNode.cpp](https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/blob/main/walking-directions-app/database/RouteInfoNode.cpp)
 * [RouteMap.cpp](https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/blob/main/walking-directions-app/database/RouteMap.cpp)
 * [RouteMap.h](https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/blob/main/walking-directions-app/database/RouteMap.h)
 
## Retrospective Summary
Here's what went well:
  * Client Requirements have been met through early prototype design
  * We increased the codebase by more than 10 times its original size
  * We accomplished 100% of our semester 1 code Goals
  * Our Client was very happy with the results so far
 
Here's what we'd like to improve:
   * We need to fix a few bugs in the existing code, but otherwise progress is smooth and can continue at this pace and style

Here are changes we plan to implement in the next sprint:
   * We will not change our development style, this is working and will remain working for the future sprints


## Cloud Storage before and after video link
   * https://drive.google.com/drive/folders/1YltXn8dlKvrEedFnS1TsHf-gVB0M02mt?usp=sharing
   