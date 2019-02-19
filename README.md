# api_project

#######Project Goals#######

Using a Random User Generator API (https://randomuser.me/) create information for 12 random "employees" to build a directory.

Request a JSON object and parse the data so the employees are listed in a grid with their thumbnail img, full name, email, & location.

Clicking on an employee's img or name will open a modal window with more detailed info.

JQuery can be used.

###### Project Instructions ######
1. Create your js files
2. Get and display 12 random users
    -Send a request to the API and use the response data to display basic info
        -image
        -first and last name
        -email
        -city or location
    -refer to mockups and comments in index.html for an example
3. Create a Modal Window
    - When any part of the employee item is clicked, a modal should pop up displaying:
        - Image
        - Name
        - Email
        - City or location
        - cell number
        - detailed address
        - birthday
    - Make sure there is a way to close the modal window
    - refer to mockups for example
4. Add good code mockups


######## EXTRA CREDIT #########
1. Add a Search Function
    - A way to filter the directory by name.
        - You'll need to adjust API request to retrieve a user nationality that will only return data in the English Alphabet
    - Should not request new information
2. Add a way to toggle back and forth between employees when modal is open.
    - there should be no erros at the beginning or end
3. Change the CSS to your liking

################# Style Changes ###################
- changed the font
- updated the color scheme for a desert theme for the cards and modals