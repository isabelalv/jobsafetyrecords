const app = new Vue({
    el: '#recordList',
    data: {
        responseAvailable: false,
        recordList: [],
    },
    beforeCreate: function() {
        this.responseAvailable = false;
            fetch("http://localhost:3000/jsas/", {
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
                this.recordList = response;
            })
            .catch(err => {
                console.log(err);
            });
    },

});