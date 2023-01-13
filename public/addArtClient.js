let photo = {};

//when submit button is clicked for adding a art page
function submit(){

	//get the values from the pug file
	photo.name = document.getElementById("name").value;
    photo.year = document.getElementById("year").value;
    photo.category = document.getElementById("category").value;
    photo.description = document.getElementById("description").value;
    photo.image = document.getElementById("image").value;
    photo.medium = document.getElementById("medium").value;
	
	let req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState==4 && this.status==200){
			//alert("vendor saved");
		}
	}

   //console.log(user)

    
        
    

    	//Send a POST request to the server containing the art data
	req.open("POST", `/artists/:id/artist`);
	req.setRequestHeader("Content-Type", "application/json");
	//req.setRequestHeader("Content-Type", "text/html");
	req.send(JSON.stringify(photo));

    location.href = "http://localhost:3000/artists";
	
}