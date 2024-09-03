![image000000](https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp/assets/94017159/74284537-cd48-43fc-bcd5-ad61ff504776)
# Walk the Hills

### Quick Description
If you enjoy exploring Pullman and are curious about others' opinions on the various available routes, the Walk the Hills application is tailored for you.

### Additional Information
This project will enable users to input both their starting location and their destination, after which they will receive a list of potential routes to reach that destination. Each route will come with reviews, submitted by other users, individuals who have previously traveled that route. Additionally, the app will provide information on whether a route is considered safe for nighttime travel. The primary focus of the app is the Pullman area, and we hope that over time, it will gather data on the most frequently used routes. This data could potentially help the Pullman community to make informed decisions about investing in and improving the paths that are traveled the most.

## Installation

### Prerequisites
The user must have the following in order to run the application.
* On your Windows, Mac, or Linux device, select the following link: [Visual Studio Code Download](https://code.visualstudio.com/download)

![gnome-shell-screenshot-8dbung](https://github.com/mfoot123/Walk-The-Hills-Web-Application/blob/main/walking-directions-app/docs/images/vscodeDownload.png)

After this, you will select the necessary download file for your OS and open up Visual Studio Code on your computer. Once complete, you can proceed to "Installation Steps"

### Add-ons
Google Maps API: We use the Google Maps API to access their library of mapping and locations that are already available within Google Maps. Their API allows us to create our application to use their features such as routes, mapping, places, and environment. 

### Installation Steps
1. Open Visual Studio Code (VS Code). Your display should look like the image down below
![gnome-shell-screenshot-ekf2mq](https://github.com/mfoot123/Walk-The-Hills-Web-Application/blob/main/walking-directions-app/docs/images/vscodeHomeScreen.png)
2. Open terminal in VS Code
* Windows and Linux: Ctrl + ` (backtick)
* Mac: Cmd + ` (backstick)
* Or just manually click on "Terminal" then "New Terminal"
  
It should look similar to the image. (Green Lettering before '$' is different for every device)
![gnome-shell-screenshot-97dcp6](https://github.com/mfoot123/Walk-The-Hills-Web-Application/blob/main/walking-directions-app/docs/images/vscodeNewTerminal.png)

3. Enter the following in your terminal for a quick installation:
![gnome-shell-screenshot-92409g](https://github.com/mfoot123/Walk-The-Hills-Web-Application/blob/main/walking-directions-app/docs/images/vscodeInstallation.png)
   * Linux:
       * `sudo apt update`
       * `sudo apt install npm nodejs`
   * Mac:
       * `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
       * `brew install node`
   * Windows:
       * Go here and install https://nodejs.org/en
       * Run the installer and follow the on-screen instructions to install Node.js and npm.
         
4. Or install npm by following the steps on this website that give more specific details depending on your preferred operating system
     * Click on Link: [Install npm and node.js](https://kinsta.com/blog/how-to-install-node-js/)
     * On the side, go to your specific OS and follow the installation process.
       
5. Once installed, you can copy this to clone the repository: `git clone https://github.com/WSUCptSCapstone-F23-S24/cha-mobilefullstackapp.git` Then proceed to Functionality.
![gnome-shell-screenshot-ba5w0d](https://github.com/mfoot123/Walk-The-Hills-Web-Application/blob/main/walking-directions-app/docs/images/vscodeClone.png)

6. In VS code: Go to file->open folder->open "cha-mobilefullstackapp" folder
     * You should be directed back to VS Code with cha-mobilefullstackapp displayed at the top
8. Open Terminal again
     * Install React Scripts `npm i react-scripts`
     * Install React Google Maps `npm i @react-google-maps/api`
     * Install React Icons `npm i react-icons`
 
## Functionality
9. In the Terminal: 
* List out the files in the Directory: `ls`
* Change directory into "Walking-directions-app": `cd Walking-directions-app`
* Enter: `npm start` after this, your application will open up in your browser.

![gnome-shell-screenshot-7ghefe](https://github.com/mfoot123/Walk-The-Hills-Web-Application/blob/main/walking-directions-app/docs/images/appHome.png)

Enter Destination

![gnome-shell-screenshot-hnkg7r](https://github.com/mfoot123/Walk-The-Hills-Web-Application/blob/main/walking-directions-app/docs/images/appHomeWithDestination.png)

If you click on `Plan Route`, it asks for a location which will be your start point
If not and you select `Start` It will grab your current location
And choose whether you want to use the `Lowest Elevation` or `Shortest Distance`

![gnome-shell-screenshot-afncxs](https://github.com/mfoot123/Walk-The-Hills-Web-Application/blob/main/walking-directions-app/docs/images/appHomeRouteToggle.png)

Click on Green Arrow to get directions

![gnome-shell-screenshot-28h6us](https://github.com/mfoot123/Walk-The-Hills-Web-Application/blob/main/walking-directions-app/docs/images/appHomeRoute.png)

You can then click on a Marker to review
* Either Review Whole route or a Path
    * Review a path which grabs two markers and reviews the path in-between them
      
![gnome-shell-screenshot-4joyhz](https://github.com/mfoot123/Walk-The-Hills-Web-Application/blob/main/walking-directions-app/docs/images/appHomeMarker.png)
![gnome-shell-screenshot-65qokp](https://github.com/mfoot123/Walk-The-Hills-Web-Application/blob/main/walking-directions-app/docs/images/appHomeReviewSubmission.png)

* Open inspector mode to see the Reviewed path being returned for the database to grab in it's tokenized form
* Go to ConvertString function in Review.js to see more
  
![gnome-shell-screenshot-cy6bic](https://github.com/mfoot123/Walk-The-Hills-Web-Application/blob/main/walking-directions-app/docs/images/appHomeReviewData.png)

## Additional Documentation
* [Project Description](https://github.com/mfoot123/Walk-The-Hills-Web-Application/blob/main/walking-directions-app/docs/Project_Description_Finite_Cipher.pdf)

## License
The rights to the Walk the Hills Application belong to Adam, Mitchell, and Juan. Link:
[License](https://github.com/mfoot123/Walk-The-Hills-Web-Application/blob/main/LICENSE.txt)
