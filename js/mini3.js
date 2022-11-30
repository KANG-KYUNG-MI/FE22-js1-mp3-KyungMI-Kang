const button = document.querySelector('#button');
const div = document.querySelector('#country')
button.addEventListener('click', getName); // 1

function getName(event) { // 2

    div.innerHTML = "" // to remove old searchings when searching a new language
    event.preventDefault();
    const input = document.querySelector('#country-lang');
    console.log(input.value);

    const countryLang = input.value.toLowerCase();
    console.log(countryLang);
    input.value = '';
    input.focus();


    fetchCountryName(countryLang); // 3
}

function fetchCountryName(countryLang) { // 4

    const url = `https://restcountries.com/v3.1/lang/${countryLang}`;
    console.log(url);

    fetch(url) // 5

        .then(response => {
            console.log(response);

            // if(response.status >=200 && response.status < 300){
            // return response.json()}
            // else {throw 'datan gick inte att hamta';}
            // })

            if (response.ok) {
                return response.json();
            }

            else { throw new Error('Network response was not ok'); }
        })


        .then(displayCountry)

        .catch((error) => {
            // message of wrong searching for a language on the web page
            console.log(error.name);
            const p = document.createElement('p');
            p.innerText = 'Do it right again, please!'
            div.appendChild(p);
        })
}

let indexBiggestPop = 0;
function displayCountry(countryData) {
   
// to get the information on countries to use the official language
    for (i = 0; i < countryData.length; i++) {
        console.log(countryData);

// to be marked for the country to have the biggest population
        let group = document.createElement('div');
        group.className="name"
        div.appendChild(group)


        const img = document.createElement('img');
        img.src = countryData[i].flags.png;
        // png. svg is OBJECTs key name!
        group.appendChild(img);


        const h3Name = document.createElement('h3');
        h3Name.innerText = '1- ' + countryData[i].name.official;
        
        group.appendChild(h3Name);

        const h3Subregion = document.createElement('h3');
        h3Subregion.innerText = '2-  ' + countryData[i].subregion;
        group.appendChild(h3Subregion);

        const h3Capital = document.createElement('h3')
        h3Capital.innerText = '3-  ' + countryData[i].capital;
        group.appendChild(h3Capital);

        const h3Population = document.createElement('h3')
        h3Population.innerText = `4-  ` + countryData[i].population;
        group.appendChild(h3Population);

        if (countryData[i].population > countryData[indexBiggestPop].population) {

            console.log(indexBiggestPop = i);
        }
        //document.querySelector('#flag').innerHTML = '';
        // it prevents from piling up.
    }
    //  coloring for the country to have the biggest poplulation
    //document.getElementsByClassName("name")[indexBiggestPop].style= 'background-color:skyblue';
    document.getElementsByClassName('name')[indexBiggestPop].style.backgroundColor= 'aqua';
}

