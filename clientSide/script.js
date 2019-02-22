const form = document.querySelector("form");
const button = document.querySelector('button');
const toEmail = "YourEmailHere@example.com";

function getForm(){

	const email = document.querySelector('#Email').value;

	const subject = document.querySelector('#Subject').value;

	const name = document.querySelector('#Name').value;

	const date = document.querySelector('#Date').value;

	const message = document.querySelector('#Message').value;

	const body = "Greetings," 
	+ `%0D%0D%0D%09${message}`
	+ "%0D%0D%0D%0DSincerely,"
	+ `%0D${name}`
	+ `%0D%0D%0D From/Reply: ${email}`
	+ `%0D Date: ${date}`;

form.action = `mailto:${toEmail}?Subject=${subject}&body=${body}`;

}


button.addEventListener("click", getForm);