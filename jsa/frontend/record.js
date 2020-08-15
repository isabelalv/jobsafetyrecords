const app = new Vue({
    el: '#recordContent',
    data: {
        responseAvailable: false,
        steps: [],
        recordTitle: '',
    },
    beforeCreate: function() {
        this.responseAvailable = false;
        var record_id = "";
        if (window.location.toString().includes("id=")){
            record_id = window.location.toString().split("id=")[1];
        }else{
            alert("Invalid record");
            window.location.href = 'home.html';
        }
            fetch("http://localhost:3000/jsa/" + record_id, {
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