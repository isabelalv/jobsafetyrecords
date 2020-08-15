const app = new Vue({
    el: '#recordContent',
    data: {
        // result: "",
        responseAvailable: false,
        steps: [],
        recordTitle: '',
    },
    beforeCreate: function() {
        this.responseAvailable = false;
            fetch("http://localhost:3000/jsa/5f37f84a3f046658184dbe31", {
                "method": "GET",
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            })
            .then(response => { 
                if(response.ok){
                    return response.json()    
                } else{
                    alert("Server returned " + response.status + " : " + response.statusText);
                }                
            })
            .then(response => {
                this.responseAvailable = true;
                this.steps = response.steps;
                this.recordTitle = response.activity;
            })
            .catch(err => {
                console.log(err);
            });
    },

});