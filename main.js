/* City Dashboard

In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente:
Nome completo della città e paese da  /destinations?search=[query]
(result.name, result.country, nelle nuove proprietà city e country).
Il meteo attuale da /weathers?search={query}
(result.temperature e result.weather_description nella nuove proprietà temperature e weather).
Il nome dell’aeroporto principale da /airports?search={query}
(result.name nella nuova proprietà airport).
Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.
Attenzione: le chiamate sono delle ricerche e ritornano un’array ciascuna, di cui devi prendere il primo risultato (il primo elemento).
Note del docente
Scrivi la funzione getDashboardData(query), che deve:
Essere asincrona (async).
Utilizzare Promise.all() per eseguire più richieste in parallelo.
Restituire una Promise che risolve un oggetto contenente i dati aggregati.
Stampare i dati in console in un messaggio ben formattato.
Testa la funzione con la query "london"

*/

// funzione di supporto
async function fetchJson(url){
  const response = await fetch(url);
  const obj = await response.json();
  return obj;
}

const getDashboardData = async (query) => {
  // togliamo await dai fetch così da poter eseguire in parallelo grazie a Promise.all()
  const cityResponse = fetchJson(`http://localhost:3333/destinations?search=${query}`);
  const weatherResponse = fetchJson(`http://localhost:3333/weathers?search=${query}`);
  const airportResponse = fetchJson(`http://localhost:3333/airports?search=${query}`);
  
  // array di promises
  const promises = [cityResponse, weatherResponse, airportResponse];
  // destrutturiamo il risultato del Promise.all()
  const [ destinations, weathers, airports ] = await Promise.all(promises);

  return {
    "city": destinations[0].name,
    "country": destinations[0].country, 
    "weather": weathers[0].weather_description,
    "temperature": weathers[0].temperature,
    "airport": airports[0].name
  };
}

(async () => {
  const data = await getDashboardData("london");
  console.log(data);
  console.log(
    `${data.city} is in ${data.country}.\n` +
    `Today there are ${data.temperature} degrees and the weather is ${data.weather}\n` +
    `The main airport of ${data.city} is ${data.airport}`
  )
}) ();