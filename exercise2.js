const jsonString = `
{
   "list": [
    {
     "name": "Petr",
     "age": "20",
     "prof": "mechanic"
    },
    {
     "name": "Vova",
     "age": "60",
     "prof": "pilot"
    }
   ]
  }
`;

const personsData = JSON.parse(jsonString);

console.log(personsData);