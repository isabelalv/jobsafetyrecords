const app = new Vue({
    el: '#recordContent',
    data: {
        responseAvailable: false,
        steps: [],
        recordTitle: '',
    },
    // gathers data from the database given the record ID passed in the URL
    beforeCreate: function() {
        this.responseAvailable = false;
        var record_id = "";
        if (window.location.toString().includes("id=")){
            record_id = window.location.toString().split("id=")[1];
        }else{
            alert("Invalid record");
            window.location.href = 'home.html';
        }
            // this URL should be changed after local testing
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
    methods: {
        // deletes the on-page record from the database
        deleteRecord: function (event) {
            var record_id = "";
            if (window.location.toString().includes("id=")){
                record_id = window.location.toString().split("id=")[1];
            }else{
                alert("Invalid record");
                window.location.href = 'home.html';
            }
            var requestOptions = {
                method: 'DELETE',
                redirect: 'follow'
                };
                // this URL should be changed after local testing
                fetch("http://localhost:3000/jsa/" + record_id, requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));

                window.location.href = 'home.html';
        }
    }
});
