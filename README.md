# Job Safety Analysis Records Library

This application allows a safety manager of some facility to maintain a library of JSA (Job Safety Analysis) records. For each activity conducted at the facility, there is a record containing the activity under analysis, and a collection of jobs steps, each with a set of recommended controls.

## What is a JSA?
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

## Installation instructions:

It is assumed you will be running these commands on a machine to which you have Administrator level access, and which has a reasonably open network policy.

We recommend that for this installation you use 4 different console windows or sessions and keep them all open. We will refer to them as follows:

* your "working console"
* your Node JS console
* your Mongo DB console
* your Vue JS console 

__Using your "working console":__

(installing and setting up Node JS)
1. Install Node JS on your machine (https://nodejs.org/en/download/) 
2. Execute the following command: `npm install --save-dev nodemon`
3. Execute the following command: `npm install express --save`
4. Execute the following command: `npm install mongoose --save`
5. Execute the following command: `npm install cors --save`
6. Clone the present repository onto your machine.

----
(installing and setting up Mongo DB)

7. Install Mongo DB (https://www.mongodb.com/try/download/community)
8. Using the Compass utility (which was installed in step 7), create a new database called `JSAdb`.
9. Inside the new database, create a new collection called `jsas`.
10. In a new command prompt or other console window, run the command `mongod`. If you are using Windows, you may need to do one of the following:
    1. Modify your PATH variable (if it was not modified by the installer), to include the path to the Mongo DB `bin` folder. This will be in the location where you chose to install Mongo DB.
    2. Change your working directory to be the Mongo DB `bin` directory, and run the `mongod` command from there. If you do this, you will not need to add the location to the PATH.
11. You may now close the window you opened in step 10.

---
(installing and setting up Vue JS)

12. Install Vue JS by running this command `npm install -g @vue/cli`.
13. Execute the following command: `npm i axios semantic-ui-css vue-flash-message`.
14. Execute the following command: `npm install --save vue-router`.

---
__Using your Mongo DB console:__

15. Run the `mongo` command. Leave the console window open.

__Using your Node JS console:__

16. Navigate to the `jobsafetyrecords\jsa\` folder under the cloned repository.
17. Run `npm run start` to start your Node JS server. You should get a couple warnings, but no errors.

__Using your Vue JS console:__

18. Navigate to the `jobsafetyrecords\jsa\jsavue` folder under the cloned repository.
19. Run `npm run serve` to begin serving your Vue JS frontend.
---
20. At this point, you should be able to navigate to http://localhost:8080/ with a modern browser of your choice and be able to use the application.