# Sprint x Report (9/25/21 - 11/1/2021)

## What's New (User Facing)
 * Rerouting now clears prior routes complexly before drawing any new routes
 * Pins can be dropped on the map at intersections and selected
 * A database exists to store collected data
 * A dark mode toggle was implemented
 * text instructions viewable
 * text instructions collapsible
 * Clear Route wiping pin drops has been fixed

## Work Summary (Developer Facing)
This development cycle was a maze of deeper documentation on using the Google Maps API and a lot of back-end development. Much of what was completed is not listed in the what's new section as it is not user facing work. A server has been initialized and placed in a different environment. The server is now ready to be communicated with by the central app so that we can store information and report all information tracking as requested by teh client. This was a whirlwind of exploration as we dove into various documents on how to establish a server connection and how to best implement our own database. Eventually the use of a simple C interface was landed on using a custom C++ style data structure. This allows us to easily interpret strings sent over the terminal in a trusted backend network. We also spent a long time reading over hte Google Maps API documents to fix dozens of bugs put in place by another bug "fix" originally thought functional. The hardest part about this sprint was managing  to do things with only 2 developers while the third failed to meet any of his metrics. 

## Unfinished Work
One issue created for this sprint is left incomplete. This issue "pin drop comments" was assigned to JJ along with 2 other tasks. None of the tasks were completed though he continually reported he was making progress. Half way through the sprint ti was made clear that no progress had been made except some hacky solutions presented as a bug fix. This bug fix ended up creating new bugs that trickled into Mitch's work. It was decided that his tasks would be taken over by Mitch and Adam. However, the two developer's were unable to complete all JJ's tasks before the deadline. As such, this task has been moved to next sprint for further work. Knowing in advance the need for the extra development time by Mitch and Adam we except to make up lost time next sprint by planning ahead for potential failures. 

## Completed Issues/User Stories
Here are links to the issues that we completed in this sprint:

 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/16
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/24
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/25
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/28
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/30
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/34
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/35
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/36
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/36
 
 ## Incomplete Issues/User Stories
 Here are links to issues we worked on but did not complete in this sprint:
 
 * https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/issues/23 <<Third Team member did not follow his PIP>>
 
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
  * We increased the codebase by more than 10 times its original size
  * We accomplished over 70% of our semester 1 code Goals
  * Our Client was very happy with the results so far
 
Here's what we'd like to improve:
   * Mitch and Adam will need to work twice as hard to compensate for JJ's falterings
   * The Javascript is still in largely one file and needs to be organized to follow good code standards.
   * The C and Javascript need communicate so tests can be written for their cross communications
  
Here are changes we plan to implement in the next sprint:
   * Client communication protocols will be implemented
   * Javascript will have functional breakdowns to follow OO design practice
   * Adam and Mitch will have hands on live code demos as a team to keep communication strong