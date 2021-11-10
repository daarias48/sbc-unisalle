const form = document.querySelector('.form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    
    const dato = {'myData': formData.get('dato')}
    fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dato)
    })
        .then((response) => {
            return response.json()
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.log(err))



})