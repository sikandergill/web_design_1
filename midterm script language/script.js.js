// Answer-1

let r = Number(prompt('Provide the radius of the sphere'));

let volume = (4/3) * 3.14 * r * r * r;

alert('Volume of the sphere is '+ volume);


// Answer-2
let age = Number(prompt('Please provide your age'));

if(age >= 1 && age <= 19){
    alert('You are not a major yet.');
}

if(age >= 20 && age <= 45){
    alert('You are major, but not senior yet.');
}

if(age >= 46 && age <= 90){
    alert('You are senior, but not yet retired.');
}

else{
    alert('Please provide age below or equal to 90');
}


//Answer-3

var i = 1;
while(i <= 25){   
    alert("Bonjour");
    i = i + 1; 
}
