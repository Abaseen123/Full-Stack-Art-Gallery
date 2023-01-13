let user = {};

//when submit button is clicked for adding a user page/ login page
function submit(){

	//get the values from the pug file
	user.artist = document.getElementById("artist").value;
    user.password = document.getElementById("password").value;
	
	let req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState==4 && this.status==200){
			alert("added");
		}
	}



   console.log(user)

    
        
    

    	//Send a POST request to the server containing the user acount data
	req.open("POST", `/artists`);
	req.setRequestHeader("Content-Type", "application/json");
	//req.setRequestHeader("Content-Type", "text/html");
	req.send(JSON.stringify(user));

    //redirect
    location.href = "http://localhost:3000/index";
	
}