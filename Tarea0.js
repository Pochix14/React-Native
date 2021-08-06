// Objectos Pinguino
var gunter = {
    name: "Gunter",
    origin: "Adventure Time",
    canFly: false,
    sayHello: function () {
        console.log("QUACK!!!");
    }
};

var ramon = {
    name: "Ramón",
    origin: "Happy Feet",
    canFly: true,
    sayHello: function () {
      console.log("Estoy encantado de conocerle.");
    }
  };
  
  var fred = {
    name: "Fred",
    origin: "Sitting Ducks",
    canFly: false,
    sayHello: function () {
      console.log("Hi there!");
    }
  };

  // 1.
  // Arreglo de pinguinos
  var pinguinos = [gunter, ramon, fred];

  // 2.
  // Ciclo que itera el arreglo e imprime el nombre del pinguino
  console.log("1. Nombre de pinguinos: ");
  for (let i = 0; i < pinguinos.length; ++i) {
      console.log(pinguinos[i].name);
  }
  console.log("\n");

  // 3.
  // Imprime la longitud del arreglo
  console.log("2. Imprime la longitud del arreglo: ");
  console.log("La longitud del arreglo es: %i pinguinos", pinguinos.length);
  console.log("\n");

  // 4.
  // Ciclo que itera el arreglo y agrega una propieda con valor aleatorio
  for (let i = 0; i < pinguinos.length; ++i) {
      let valor = Math.floor((Math.random() * (5 - 0 + 1)) + 0); 
      pinguinos[i].numberOfFeet = valor;
  }

  // 5.
  // Ciclo que itera el arreglo e imprime si un pinguino puede volar
  console.log("5. Imprime cuales pinguinos pueden volar:");
  for (let i = 0; i < pinguinos.length; ++i) {
      if (pinguinos[i].canFly) {
          console.log("%s puede volar!", pinguinos[i].name);
      }
  }
  console.log("\n");

  // 6.
  // Ciclo para devolver un arreglo con los pinguinos que tienen mas de 2 pies
  let resultado = [];
  for (let i = 0; i < pinguinos.length; ++i) {
    if (pinguinos[i].numberOfFeet > 2) {
        resultado.push(pinguinos[i]);
    }
  }
  //console.log(resultado);

  // 7.
  // Lista de comidas para agregar a cada pinguino
  let comidas = ["manzana", "chocolate", "pastel"];
  for (let i = 0; i < pinguinos.length; ++i) {
      pinguinos[i].favoriteFoods = comidas;
  }
  //console.log(pinguinos);

  // 8.
  // Itera el arreglo e imprimir la segunda comida favorita de cada pinguino
  console.log("8. Imprime la segunda comida favorita de cada pinguino:");
  for (let i = 0; i < pinguinos.length; ++i) {
      console.log(pinguinos[i].favoriteFoods[1]);
  }
  console.log("\n");

  // 9.
  // Ciclo que itera el arreglo y cambia el ultimo elemento de la lista de comidas por 'piñas'
  for (let i = 0; i < pinguinos.length; ++i) {
      let cantidadComidas = pinguinos[i].favoriteFoods.length;
      pinguinos[i].favoriteFoods[cantidadComidas - 1] = "piñas";
  }
  //console.log(pinguinos);

  // 10.
  // Ciclo que itera el arreglo e imprime cada comida favorita de cada pinguino
  console.log("10. Imprime cada comida favorita de cada pinguino:");
  for (let i = 0; i < pinguinos.length; ++i) {
      let cantidadComidas = pinguinos[i].favoriteFoods.length;
      for (let j = 0; j < cantidadComidas; ++j) {
          console.log(pinguinos[i].favoriteFoods[j]);
      }
      console.log("\n");
  }

  // 11.
  // Funcion que imita el comportamiento del array.find()
  // Para este caso, es encontrar el primer numero par del arreglo
  function find(arreglo, funcion) {
      for (let i = 0; i < arreglo.length; ++i) {
          if (funcion(arreglo[i])) {
              return arreglo[i];
              break;
          }
      }
  }

  function numeroPar(elemento) {
      if (elemento % 2 == 0) {
          return true;
      } else {
          return false;
      }
  }

  // Arreglo de prueba 
  const arreglo1 = [1,3,7,9,2,10];
  console.log("11. Imprime la imitacion del metodo array.find:");
  console.log(find(arreglo1, numeroPar));
  console.log("\n");


  // 12.
  // Funcion que imita el comportamiento del array.filter()
  // Para este caso, retorna un arreglo con todos los numeros impares
  function filter(arreglo, funcion) {
      let arregloResultado = [];
      for (let i = 0; i < arreglo.length; ++i) {
          if (funcion(arreglo[i])) {
              arregloResultado.push(arreglo[i]);
          }
      }
      return arregloResultado;
  }

  function numeroImpar(elemento) {
      if (elemento % 2 != 0) {
          return true;
      } else {
          return false;
      }
  }

    // Arreglo de prueba 
    const arreglo2 = [7,-4,9,1,20,84,100,203];

    console.log("12. Imprime la imiticacion del metodo array.filter");
    console.log(filter(arreglo2, numeroImpar));
    console.log("\n");