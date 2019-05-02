let form = document.forms[0];
let errors = form.querySelectorAll('[data-error]');
let btn = document.querySelector('.button button');
let ulBox = document.querySelector('ul.errors');


function isEmpty(field){
    return field.value !== ""
}

function isAtList(field, min){
    return field.value.length >= min
}

function isMail(field){
    return field.value.indexOf("@") !== -1
}

function resetErrorBox() {
    ulBox.innerHTML = '';
}

function displayErrors(err){
    if (!ulBox){
        ulBox = document.createElement('ul');
        ulBox.classList.add('errors');
    }

    err.forEach(element => {
        let li = document.createElement('li');
        li.textContent = element;
        ulBox.appendChild(li);
    });
    form.parentNode.insertBefore(ulBox, form);
}

function displaySubmit(){
    if (ulBox) {
        resetErrorBox()
    }
    btn.disabled = true;
    form.removeEventListener('submit', submitForm, false);
    let submitBox = document.createElement('div');
    submitBox.textContent = "Success!!! thx for message";
    submitBox.classList.add('success');
    form.parentNode.insertBefore(submitBox, form);
}

function submitForm(e) {
    e.preventDefault();
    let arrError = [];
    for (let i = 0; i < errors.length; i++) {
        let field = errors[i];
        let isValid = false;
        if (field.type === "text"){
            isValid = isEmpty(field);           
        } else if (field.type === "email"){
            isValid = isMail(field)
        } else if (field.type === "select-one") {
            isValid = isEmpty(field);
        } else if (field.type === "textarea") {
            isValid = isAtList(field, 3);
        }
        if(!isValid){
            field.classList.add("error")          
            arrError.push(field.dataset.error)
        }else{
            field.classList.remove("error")
        }
    }

    if(arrError.length){
        displayErrors(arrError);
    }else{
        // form.submit();
        displaySubmit();
    }
}

form.addEventListener('submit', submitForm, false);

