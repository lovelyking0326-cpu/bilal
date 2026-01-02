async function getContriesData(country) {
    try {
        const response = await fetch(
            `https://restcountries.com/v3.1/name/${country}`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('check', data)
        return data;
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
        throw error;
    }
}

async function fetchCountry() {
    try {
        const inputText = document.getElementById('countryInput').value
        const user = await getContriesData(inputText)
        mappedFun(user)
    } catch (err) {
        console.error('Error:', err);
    }

}
 const mappedFun = (country)=> {
    let comentsData = [...country ]
    const parentDiv = document.getElementById('container')
    comentsData.map(
        (item,index)=> {
            const newDiv = document.createElement('div')
            newDiv.innerHTML =
            `<h2> name: ${item.region}</h2>`
            parentDiv.append(newDiv);
        }
    )
 }
