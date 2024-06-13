

const weatherForm = document.querySelector('form');
const searchValue = document.querySelector('input');
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const location = searchValue.value;
    msg1.textContent = 'Loading....'
    msg2.textContent = ''
    fetch("http://localhost:3000/weather?address="+ location).then((response)=>{
        response.json().then((data)=>{
            if (data.error) {
                msg1.textContent = data.error;
                console.log(data.error);
            }
            msg1.textContent = data.location;
            msg2.textContent = data.forcast.temperature; 
        })
    })
})
