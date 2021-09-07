let nameValue = document.querySelector('#names')
let submit = document.querySelector('.submit')
let sub = document.querySelector('.sub')
let view = document.querySelector('.view')
let message = document.querySelector('.message')
let label = document.querySelector('#label')

let ul = document.querySelector('ul')
let namesArrray;
function names() {
    label.style.display = "inline-block";
    nameValue.style.display = "inline-block";
    submit.style.display = "none";
    sub.style.display = "inline-block";
}
submit.addEventListener('click', names);

function addNames() {
    if (nameValue.value === "") {
        message.innerHTML = "Please provide names"
    }
    else {
        namesArrray = nameValue.value.split(',');
        message.innerHTML = "Your provided names are submited";
        console.log(namesArrray)
    }
}
sub.addEventListener('click', addNames);


function list() {
    for (var i = 0; i < namesArrray.length; i++) {
        let li = document.createElement('li');
        li.innerHTML = namesArrray[i];
        li.style.textTransform = 'capitalize'
        ul.appendChild(li)
    }
}

view.addEventListener('click', list)