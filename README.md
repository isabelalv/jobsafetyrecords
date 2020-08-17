# Job Safety Analysis Records Library

This application allows a safety manager of some facility to maintain a library of JSA (Job Safety Analysis) records. For each activity conducted at the facility, there is a record containing the activity under analysis, and a collection of jobs steps, each with a set of recommended controls.

#### What is a JSA?
A JSA (sometimes called a JHA) is used by EHS (Environmental Health and Safety) professionals to record hazards that exist in the workplace as they correspond to specific tasks a worker would perform. By identifying controls for known hazards and reviewing them regularly with staff, risks associated with known hazards can be mitigated
and reduced.

For more information, consult this booklet https://www.osha.gov/Publications/osha3071.pdf

#### What makes a good hazard scenario?

* __Environment:__ 
    * Where it is happening?
* __Exposure:__ 
    * Who or what it is happening to?
* __Trigger:__ 
    * What precipitates the hazard?
* __Consequence:__ 
    * The outcome that would occur should it happen
* __Likelihood:__ 
    * How likely is it that the hazard will occur? 

### Installation instructions:

1. Install Node JS on your machine (https://nodejs.org/en/download/) 
2. Execute the following command: `npm install --save-dev nodemon`
3. Execute the following command: `npm install express --save`
4. Execute the following command: `npm install mongoose --save`
5. Execute the following command: `npm install cors --save`
6. Clone the present repository onto your machine.
7. Navigate to the `jsa` folder inside the cloned repository.
----
8. Install MongoDB (https://www.mongodb.com/try/download/community)
9. Using the Compass utility (which was installed in step 8), create a new database called `JSAdb`.
10. Inside the new database, create a new collection called `jsas`.
11. In a command prompt or other console window, run the command `mongod`. If you are using Windows, you may need to do one of the following:
    1. Modify your PATH variable (if it was not modified by the installer), to include the path to the MongoDB `bin` folder. This will be in the location where you chose to install MongoDB.
    2. Change your working directory to be the MongoDB `bin` directory, and run the `mongod` command from there. If you do this, you will not need to add the location to the PATH.
12. Run the `mongo` command. Leave the console window open.
13. In a separate console window, navigate to the `jsa` folder under the cloned repository.
14. Run `npm run start` to start your Node JS server. You should get a couple warnings, but no errors.
---
15. At this point, you should be able to open the `home.html` file in the `frontend` directory of the repo with a modern browser of your choice and navigate around the application.