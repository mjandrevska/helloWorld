//Function for the Login click event
function clickLoginButton(){
	$.post('http://localhost:3000/login', function(data){
		alert('The Login Btn is clicked');
	});
}

//function for the Sign Up click event
function clickSignUpButton(){
	$.post('http://localhost:3000/signup', function(data){
		alert('The Sign Up Btn is clicked');
	});
}