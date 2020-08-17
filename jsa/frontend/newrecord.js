var jsa = {
    activity: "",
    steps: []
}
// as a guide, this is the format expected by the database
// var step = {
//     description: "",
//     hazards: []
// }
// var hazard = {
//     title: "",
//     environment: "",
//     exposure: "",
//     trigger: "",
//     consequence: "",
//     likelihood: "", // enum: ['Very likely', 'Somewhat likely', 'Not likely']
//     risk_level: "", // enum: ['Almost no risk', 'Manageable risk', 'Extreme risk']
//     controls: []
// }

var currentStep = 0;
var currentNumHazards = 0;

// runs on page load, resets section visibility and jsa record
function loadSections(){
    document.getElementById("activity").style.display='block';
    document.getElementById("steps").style.display='none';
    document.getElementById("hazards").style.display='none';
    document.getElementById("submit").style.display='none';
    jsa = {
        activity: "",
        steps: []
    }
};

// based on the current section, moves to the next screen in the form
function nextSection(currentSection) {
    if(currentSection == "activity"){
        if(document.getElementById("activityInput").value != ""){
            document.getElementById("activity").style.display='none';
            jsa.activity = document.getElementById("activityInput").value;
            document.getElementById("steps").style.display='block';
        }else{
            alert("Activity description is required");
        } 
    }
    else if(currentSection == "steps"){
        var stepsList = document.getElementById("stepDescriptions").getElementsByClassName("stepInputs");
        if(stepsList[0].value != ""){
            document.getElementById("steps").style.display='none';
            jsa.steps.length = 0;        
            for (let i = 0; i < stepsList.length; i++) {
                if(stepsList[i].value != ""){
                    var thisStep = {description: stepsList[i].value, hazards: []};
                    jsa.steps.push(thisStep);
                }                  
            }
            document.getElementById("stepName").innerHTML = "1. " + jsa.steps[0].description;
            currentStep = 1;
            document.getElementById("hazards").style.display='block';
        }else{
            alert("A step description is required at least for the first step");
        }        
    }
    else if (currentSection == "hazards"){
        var validInput = validateHazards();
        if(validInput){
            //if this is not the last step, render the next step
            var totalSteps = jsa.steps.length;
            if(currentStep < totalSteps){
                document.getElementById("hazards").style.display='none';
                saveCurrentHazards(currentStep-1);
                currentStep = currentStep + 1;
                currentNumHazards = 0;
                document.getElementById("stepName").innerHTML = currentStep + ". " + jsa.steps[currentStep-1].description;
                document.getElementById("hazards").style.display='block';
            }
            //if this is the last step, render the submit screen
            else{
                document.getElementById("hazards").style.display='none';
                saveCurrentHazards(currentStep-1);
                document.getElementById("submit").style.display='block';
            }
        }
    }
};

// this method also clears all fields and resets the hazards div to its original state
function saveCurrentHazards(stepIndex){
    //for each hazard, go through every field and save them to the json object
    for (let j = 0; j < currentNumHazards; j++) {
        var currentHazard = document.getElementById("hazard"+ (j+1));
        var hazardToSave = {
            title: "",
            environment: "",
            exposure: "",
            trigger: "",
            consequence: "",
            likelihood: "", // enum: ['Very likely', 'Somewhat likely', 'Not likely']
            risk_level: "", // enum: ['Almost no risk', 'Manageable risk', 'Extreme risk']
            controls: []
        }
        hazardToSave.title = currentHazard.getElementsByClassName("hazardDescription")[0].value;
        currentHazard.getElementsByClassName("hazardDescription")[0].value = "";

        hazardToSave.environment = currentHazard.getElementsByClassName("hazardEnvironment")[0].value;
        currentHazard.getElementsByClassName("hazardEnvironment")[0].value = "";

        hazardToSave.exposure = currentHazard.getElementsByClassName("hazardExposure")[0].value;
        currentHazard.getElementsByClassName("hazardExposure")[0].value = "";

        hazardToSave.trigger = currentHazard.getElementsByClassName("hazardTrigger")[0].value;
        currentHazard.getElementsByClassName("hazardTrigger")[0].value = "";

        hazardToSave.consequence = currentHazard.getElementsByClassName("hazardConsequences")[0].value;
        currentHazard.getElementsByClassName("hazardConsequences")[0].value = "";

        hazardToSave.likelihood = document.querySelector("input[name = 'likelihood" + (j+1) + "']:checked").value;
        document.querySelector('input[name = "likelihood' + (j+1) + '"]:checked').checked = false;

        hazardToSave.risk_level = document.querySelector('input[name = "risk' + (j+1) + '"]:checked').value;
        document.querySelector('input[name = "risk' + (j+1) + '"]:checked').checked = false;

        // looping through controls to get their values 
        var controlsToSave = [];
        var currentControls = currentHazard.getElementsByClassName("controlInputs");
        for (let k = 0; k < currentControls.length; k++) {
            if(currentControls[k].value != ""){
                controlsToSave.push(currentControls[k].value);
            }
        }
        hazardToSave.controls = controlsToSave;
        
        // resetting controls to only a single empty text box
        var controlInputs = currentHazard.getElementsByClassName("controlInputs"+(j+1))[0];
        var controlToKeep = currentHazard.getElementsByClassName("controlInputs")[0];
        controlToKeep.value = "";
        controlInputs.innerHTML = "";//removes all child nodes
        controlInputs.appendChild(controlToKeep);

        jsa.steps[stepIndex].hazards.push(hazardToSave);
    }   

    // remove all but the first hazard table, which should be clear now
    for (let x = 2; x <= currentNumHazards; x++) {
        document.getElementById("hazard"+x).remove();
    }
    // hide the first hazard table
    document.getElementById("hazard1").style.display = "none";
};

// verifies that every visible field in the hazards div contains a value
function validateHazards(){
    //for each hazard, go through every required field and check if they are filled out
    for (let j = 0; j < currentNumHazards; j++) {
        var currentHazard = document.getElementById("hazard"+ (j+1));
        
        if(currentHazard.getElementsByClassName("hazardDescription")[0].value == ""){
            alert("Hazard description is required");
            return false;
        }

        if(currentHazard.getElementsByClassName("hazardEnvironment")[0].value == ""){
            alert("Hazard environment is required");
            return false;
        }
        
        if(currentHazard.getElementsByClassName("hazardExposure")[0].value == ""){
            alert("Hazard exposure is required");
            return false;
        }

        if(currentHazard.getElementsByClassName("hazardTrigger")[0].value == ""){
            alert("Hazard trigger is required");
            return false;
        }

        if(currentHazard.getElementsByClassName("hazardConsequences")[0].value == ""){
            alert("Hazard consequences are required");
            return false;
        }

        if(!document.querySelector("input[name = 'likelihood" + (j+1) + "']:checked")){
            alert("Hazard likelihood is required")
            return false;
        }

        if(!document.querySelector("input[name = 'risk" + (j+1) + "']:checked")){
            alert("Hazard risk is required")
            return false;
        }
    }
    return true;
};

// clones the step text box and adds the clone to the screen
function addStep(){
    var itm = document.getElementById("firstStep");
    var cln = itm.cloneNode(true);
    cln.id = "";
    cln.style.marginTop = "1%";
    cln.getElementsByClassName("stepInputs")[0].value = "";
    document.getElementById("stepDescriptions").appendChild(cln);
};

// removes the latest step text box
function removeStep(){
    document.getElementById("stepDescriptions").lastChild.remove();
};

// clones the hazard table and add the clone to the screen
function addHazard(){
    if(currentNumHazards == 0){
        document.getElementById("hazard1").style.display = "table";
        currentNumHazards = 1;
    }else{
        var itm = document.getElementById("hazard1");
        var cln = itm.cloneNode(true);
        //for each input in the clone, remove the value and change the class name
        currentNumHazards = currentNumHazards + 1;
        cln.id = "hazard" + currentNumHazards;

        cln.getElementsByClassName("hazardDescription")[0].value = "";

        cln.getElementsByClassName("hazardEnvironment")[0].value = "";

        cln.getElementsByClassName("hazardExposure")[0].value = "";

        cln.getElementsByClassName("hazardTrigger")[0].value = "";

        cln.getElementsByClassName("hazardConsequences")[0].value = "";

        // radio buttons are more complicated because they need IDs and class names
        var notLikely = cln.getElementsByClassName("notLikely1")[0];
        notLikely.id = "notLikely"+currentNumHazards;
        notLikely.classList.remove("notLikely1");
        notLikely.classList.add("notLikely"+currentNumHazards);
        notLikely.name = "likelihood"+currentNumHazards;
        notLikely.checked = false;
        var notLikelyLabel = cln.getElementsByClassName("notLikely1Label")[0];
        notLikelyLabel.id = "notLikely"+currentNumHazards+"Label";
        notLikelyLabel.classList.remove("notLikely1Label");
        notLikelyLabel.classList.add("notLikely"+currentNumHazards+"Label");
        notLikelyLabel.htmlFor = "notLikely"+currentNumHazards;

        var somewhatLikely = cln.getElementsByClassName("somewhatLikely1")[0];
        somewhatLikely.id = "somewhatLikely"+currentNumHazards;
        somewhatLikely.classList.remove("somewhatLikely1");
        somewhatLikely.classList.add("somewhatLikely"+currentNumHazards);
        somewhatLikely.name = "likelihood"+currentNumHazards;
        somewhatLikely.checked = false;
        var somewhatLikelyLabel = cln.getElementsByClassName("somewhatLikely1Label")[0];
        somewhatLikelyLabel.id = "somewhatLikely"+currentNumHazards+"Label";
        somewhatLikelyLabel.classList.remove("somewhatLikely1Label");
        somewhatLikelyLabel.classList.add("somewhatLikely"+currentNumHazards+"Label");
        somewhatLikelyLabel.htmlFor = "somewhatLikely"+currentNumHazards;

        var veryLikely = cln.getElementsByClassName("veryLikely1")[0];
        veryLikely.id = "veryLikely"+currentNumHazards;
        veryLikely.classList.remove("veryLikely1");
        veryLikely.classList.add("veryLikely"+currentNumHazards);
        veryLikely.name = "likelihood"+currentNumHazards;
        veryLikely.checked = false;
        var veryLikelyLabel = cln.getElementsByClassName("veryLikely1Label")[0];
        veryLikelyLabel.id = "veryLikely"+currentNumHazards+"Label";
        veryLikelyLabel.classList.remove("veryLikely1Label");
        veryLikelyLabel.classList.add("veryLikely"+currentNumHazards+"Label");
        veryLikelyLabel.htmlFor = "veryLikely"+currentNumHazards;

        var almostNoRisk = cln.getElementsByClassName("almostNoRisk1")[0];
        almostNoRisk.id = "almostNoRisk"+currentNumHazards;
        almostNoRisk.classList.remove("almostNoRisk1");
        almostNoRisk.classList.add("almostNoRisk"+currentNumHazards);
        almostNoRisk.name = "risk"+currentNumHazards;
        almostNoRisk.checked = false;
        var almostNoRiskLabel = cln.getElementsByClassName("almostNoRisk1Label")[0];
        almostNoRiskLabel.id = "almostNoRisk"+currentNumHazards+"Label";
        almostNoRiskLabel.classList.remove("almostNoRisk1Label");
        almostNoRiskLabel.classList.add("almostNoRisk"+currentNumHazards+"Label");
        almostNoRiskLabel.htmlFor = "almostNoRisk"+currentNumHazards;

        var manageableRisk = cln.getElementsByClassName("manageableRisk1")[0];
        manageableRisk.id = "manageableRisk"+currentNumHazards;
        manageableRisk.classList.remove("manageableRisk1");
        manageableRisk.classList.add("manageableRisk"+currentNumHazards);
        manageableRisk.name = "risk"+currentNumHazards;
        manageableRisk.checked = false;
        var manageableRiskLabel = cln.getElementsByClassName("manageableRisk1Label")[0];
        manageableRiskLabel.id = "manageableRisk"+currentNumHazards+"Label";
        manageableRiskLabel.classList.remove("manageableRisk1Label");
        manageableRiskLabel.classList.add("manageableRisk"+currentNumHazards+"Label");
        manageableRiskLabel.htmlFor = "manageableRisk"+currentNumHazards;

        var extremeRisk = cln.getElementsByClassName("extremeRisk1")[0];
        extremeRisk.id = "extremeRisk"+currentNumHazards;
        extremeRisk.classList.remove("extremeRisk1");
        extremeRisk.classList.add("extremeRisk"+currentNumHazards);
        extremeRisk.name = "risk"+currentNumHazards;
        extremeRisk.checked = false;
        var extremeRiskLabel = cln.getElementsByClassName("extremeRisk1Label")[0];
        extremeRiskLabel.id = "extremeRisk"+currentNumHazards+"Label";
        extremeRiskLabel.classList.remove("extremeRisk1Label");
        extremeRiskLabel.classList.add("extremeRisk"+currentNumHazards+"Label");
        extremeRiskLabel.htmlFor = "extremeRisk"+currentNumHazards;

        // remove all extra controls and clear value of the first one
        var controlInputs = cln.getElementsByClassName("controlInputs1")[0];
        var controlToKeep = cln.getElementsByClassName("controlInputs")[0];
        controlToKeep.value = "";
        controlInputs.innerHTML = "";//removes all child nodes
        controlInputs.appendChild(controlToKeep);
        controlInputs.id = "controlInputs"+currentNumHazards;
        controlInputs.classList.remove("controlInputs1");
        controlInputs.classList.add("controlInputs"+currentNumHazards);

        // the add and remove controls method calls contain parameters that need to be changed
        var addControl = cln.getElementsByClassName("addControl1")[0];
        addControl.setAttribute( "onclick", "addControl(" + currentNumHazards + ");");
        addControl.classList.remove("addControl1")
        addControl.classList.add("addControl"+currentNumHazards);

        var removeControl = cln.getElementsByClassName("removeControl1")[0];
        removeControl.setAttribute( "onclick", "removeControl(" + currentNumHazards + ");");
        removeControl.classList.remove("removeControl1")
        removeControl.classList.add("removeControl"+currentNumHazards);

        // add the clone to the screen
        document.getElementById("currentHazards").appendChild(cln);
    }
};

// removes the last instance of the hazard table. if it's the first one, hide it
function removeHazard(){
    if(currentNumHazards>1){
        currentNumHazards = currentNumHazards-1;
        document.getElementById("currentHazards").lastChild.remove();
        window.scrollTo(0, 0);
    }else if(currentNumHazards == 1){
        currentNumHazards = 0;
        document.getElementById("hazard1").style.display = "none";
        window.scrollTo(0, 0);
    }
};

// clones the control text box and add the clone to the given hazard table 
function addControl(hazardNum){
    var itm = document.getElementById("controlInputs"+hazardNum).getElementsByClassName("controlInputs")[0];
    var cln = itm.cloneNode(true);
    cln.id = "";
    cln.value = "";
    document.getElementById("controlInputs"+hazardNum).appendChild(cln);
};

// removes the last intance of the control text box from the given data table
function removeControl(hazardNum){
    if(document.getElementById("controlInputs"+hazardNum).childElementCount > 1){
        document.getElementById("controlInputs"+hazardNum).lastChild.remove();
    }
};

// VueJS Code
const app = new Vue({
    el: '#submit',
    data: {
        recordID: 0
    },
    methods: {
        submit: function (event) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify(jsa);

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };
            // this URL should be changed after local testing
            fetch("http://localhost:3000/jsas", requestOptions)
            .then(response => { 
                if(response.ok){
                    return response.json()    
                } else{
                    alert("Server returned " + response.status + " : " + response.statusText);
                }                
            })
            .then(response => {
                this.recordID = response._id;
                window.location.href = "record.html?id=" + this.recordID;
            })
            .catch(err => {
                console.log(err);
            });
            
        }
    }
});