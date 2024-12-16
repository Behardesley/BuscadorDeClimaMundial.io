const apiKey = 'f6a5aec557f8f5c49a61ecbed8608670'; // Tu clave API

document.getElementById('searchBtn').addEventListener('click', function() {
    const country = document.getElementById('country').value.trim();
    const city = document.getElementById('city').value.trim();

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ""; // Limpiar resultados anteriores

    if (country && city) {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la búsqueda de clima: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data.cod !== 200) {
                    throw new Error('Error: ' + data.message);
                }
                resultDiv.innerHTML = `
                    <h2>Clima en ${data.name}, ${data.sys.country}</h2>
                    <p>Temperatura: ${data.main.temp} °C</p>
                    <p>Descripción: ${data.weather[0].description}</p>
                `;
            })
            .catch(error => {
                resultDiv.innerHTML = `<p>${error.message}</p>`;
            });
    } else {
        alert('Por favor, ingresa un país y una ciudad.');
    }
});

// Evento para el botón de reset
document.getElementById('resetBtn').addEventListener('click', function() {
    document.getElementById('country').value = ''; // Limpiar el campo de país
    document.getElementById('city').value = ''; // Limpiar el campo de ciudad
    document.getElementById('result').innerHTML = ''; // Limpiar resultados
});