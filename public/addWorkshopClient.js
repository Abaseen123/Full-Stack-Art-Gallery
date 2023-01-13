let user = {};

//when submit button is clicked for adding a workshop page
function submit(){

	//get the values from the pug file
	user.workshop = document.getElementById("workshop").value;
	
	let req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState==4 && this.status==200){
			alert("vendor saved");
		}
	}



   console.log(user)

    
        
    

    	//Send a POST request to the server containing the workshop data
	req.open("POST", `/workshopNames`);
	req.setRequestHeader("Content-Type", "application/json");
	//req.setRequestHeader("Content-Type", "text/html");
	req.send(JSON.stringify(user));

    location.href = "http://localhost:3000/index";
	
}