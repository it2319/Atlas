const continent = document.getElementById('continent');
const modal = new bootstrap.Modal(document.getElementById('windowCountry'));
const modalHeader = document.getElementById("modal-header-content");
const modalBody = document.getElementById("modal-body-content");

async function getData(region) {
    const url = `https://restcountries.com/v3.1/region/${region}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
      let blocks = '';
      json.forEach((country) => {
        blocks += `
            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6">                
                <div class="card">
                    <img class="card-img-top" src="${country.flags.png}" alt="Vlajka">
                    <div class="card-body">
                      <h4 class="card-title">${country.name.common}</h4>
                      <p class="card-text">Počet obyvate: ${country.population}</p>
                      <a href="#" class="btn btn-info card-link"
                      data-name="${country.name.common}">Informace</a>
                    </div>
                </div>
            </div>            
        `;
      });
      listCountries.innerHTML = blocks;
      document.querySelectorAll('[data-name]').forEach(button => {
        button.addEventListener('click', () => {
          const countryName = button.getAttribute('data-name');
          const countryPopulation = button.getAttribute('data-name');
          modal.show();
          fetch(`https://restcountries.com/v3.1/name/${countryName}`)
          fetch(`https://restcountries.com/v3.1/name/${countryPopulation}`)
          .then(res => res.json())
          .then(data => {
            const country = data[0];
            modalHeader.innerHTML = `
            <h2>${country.name.common}</h4>
            `;
            modalBody.innerHTML = `
            <div class="d-flex flex-column flex-md-row gap-3">
              <div style="width: 250px;">
                <p class = "mb-4">Vlajka státu:</p>
                <img src="${country.flags.png}" class="img-fluid mb-4">
                <p>Počet obyvatel: ${country.population}</p>
              </div>
              <div class="flex-grow-1">
                <iframe src="https://www.google.com/maps?q=${country.name.common}&hl=cs&z=5&output=embed"
                  style="width: 100%; height: 300px; border: 0;"
                  allowfullscreen="" loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </div>
            `;
          })
          .catch(error => {
            console.log(`Nastala chyba: ${error}`);
          });
        });
      });
    } catch (error) {
      console.error(error.message);
    }
  }

continent.addEventListener('change', ()=> {
    getData(continent.value);
});

getData('europe');
