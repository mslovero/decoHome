
class Producto {
	constructor(producto, cantidad) {
		this.id = producto.id;
		this.marca = producto.marca;
		this.precio = producto.precio;
		this.cantidad = cantidad;
		this.precioTotal = producto.precio;
	}

	agregarUnidad() {
		this.cantidad++;
	}

	quitarUnidad() {
		this.cantidad--;
	}

	actualizarPrecioTotal() {
		this.precioTotal = this.precio * this.cantidad;
	}
}


const productos = [
	{
		id: 0,
		marca: "Banqueta Wishbone",
		descripcion: "Banqueta de madera",
		precio: 12000,
		img: "./img/banqueta-wishbone.jpg",
	},
	{
		id: 1,
		marca: "Biblioteca de Madera",
		descripcion: "Biblioteca",
		precio: 20000,
		img: "./img/biblioteca-madera.jpg",
	},
	{
		id: 2,
		marca: "Manta Nordica",
		descripcion: "Manta nordica artesanal",
		precio: 5000,
		img: "./img/manta-nordica.jpg",
	},
	{
		id: 3,
		marca: "Mesa de Arrime",
		descripcion: "Mesa de arrime",
		precio: 8000,
		img: "./img/MESA-ARRIME.jpg",
	},
	{
		id: 4,
		marca: "Juego de Comedor",
		descripcion: "Mesa estilo industril con sillas de chapa",
		precio: 90000,
		img: "./img/MESA-COMEDOR.jpg",
	},
	{
		id: 5,
		marca: "Silla Tolix",
		descripcion: "Silla de chapa",
		precio: 11000,
		img: "./img/silla-tolix.jpg",
	},
    {
		id: 6,
		marca: "Sillon Hesterfield",
		descripcion: "Sillon de cuero",
		precio: 80000,
		img: "./img/sillon-chesterfield.jpg",
	},
    {
		id: 7,
		marca: "Mesa Ratona Petiribi",
		descripcion: "Mesa ratona de madera petiribi",
		precio: 15000,
		img: "./img/mesa-ratona-cuadrada-petiribi-oro.jpg",
	},
    {
		id: 8,
		marca: "Lampara Colgante ",
		descripcion: "Lampara colgante",
		precio: 20000,
		img: "./img/Lampara-colgante-New-York-para-lampara-de-filamento-o-led-4.jpg",
	},
    {
		id: 9,
		marca: "Cortinas Tusor",
		descripcion: "Cortinas tela tusor",
		precio: 13000,
		img: "./img/CORTINAS-TUSOR.jpg",
	},
];

let carrito = [];


function obtenerPrecioTotal(array) {
	return array.reduce((total, elemento) => total + elemento.precioTotal, 0);
}

function agregarAlCarrito(idProducto) {
	let productoEnCarrito = carrito.find((elemento) => elemento.id === idProducto);

	if (productoEnCarrito) {
		let index = carrito.findIndex((elemento) => elemento.id === productoEnCarrito.id);

		carrito[index].agregarUnidad();
		carrito[index].actualizarPrecioTotal();
	} else {
		
		carrito.push(new Producto(productos[idProducto], 1));
	}

	swal("Producto agregado!", `Producto ${productos[idProducto].marca}`, "success");

	localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
	imprimirTabla(carrito);
}

function eliminarDelCarrito(id) {
	let producto = carrito.find((producto) => producto.id === id);

	let index = carrito.findIndex((element) => element.id === producto.id);

	if (producto.cantidad > 1) {
		carrito[index].quitarUnidad();
		carrito[index].actualizarPrecioTotal();
	} else {
		carrito.splice(index, 1);
	}

	swal("Producto eliminado con éxito", "", "success");

	localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
	imprimirTabla(carrito);
}

function eliminarCarrito() {
	carrito = [];
	localStorage.removeItem("carritoEnStorage");

	document.getElementById("carrito").innerHTML = "";
	document.getElementById("acciones-carrito").innerHTML = "";
}
function comprarCarrito() {
	carrito = [];
	localStorage.removeItem("carritoEnStorage");

	document.getElementById("carrito").innerHTML = "";
	document.getElementById("acciones-carrito").innerHTML = "";
}

function imprimirProductosEnHTML(array) {

	let contenedor = document.getElementById("contenedor");
	contenedor.innerHTML = "";

	for (const producto of array) {
	
		let card = document.createElement("div");

		card.innerHTML = `
        <div class="card text-center" style="width: 18rem;">
            <div class="card-body mx-auto">
                <img src="${producto.img}" id="" class="card-img-top img-fluid" alt="">
                <h2 class="card-title">${producto.marca}</h2>
                <h5 class="card-subtitle mb-2 text-muted">${producto.descripcion}</h5>
                <p class="card-text">$${producto.precio}</p>

                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button id="agregar${producto.id}" type="button" class="btn btn-dark"> Agregar </button>
                </div>
            </div>
        </div>      
        `;

		contenedor.appendChild(card);

		let boton = document.getElementById(`agregar${producto.id}`);

		boton.addEventListener("click", () => agregarAlCarrito(producto.id));
		
	}
}


function imprimirTabla(array) {
	let contenedor = document.getElementById("carrito");
	contenedor.innerHTML = "";

	let precioTotal = obtenerPrecioTotal(array);

	
	let tabla = document.createElement("div");


	tabla.innerHTML = `
        <table id="tablaCarrito" class="table table-striped">
            <thead>         
                <tr>
                    <th>Item</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Accion</th>
                </tr>
            </thead>

            <tbody id="bodyTabla">
            </tbody>
        </table>
    `;

	contenedor.appendChild(tabla);

	
	let bodyTabla = document.getElementById("bodyTabla");

	for (let producto of array) {
		let datos = document.createElement("tr");
		datos.innerHTML = `
                <td>${producto.marca}</td>
                <td>${producto.cantidad}</td>
                <td>$${producto.precioTotal}</td>
                <td><button id="eliminar${producto.id}" class="btn btn-dark">Eliminar</button></td>
      `;

		bodyTabla.appendChild(datos);

		let botonEliminar = document.getElementById(`eliminar${producto.id}`);
		botonEliminar.addEventListener("click", () => eliminarDelCarrito(producto.id));
		
	}

	let accionesCarrito = document.getElementById("acciones-carrito");
	accionesCarrito.innerHTML = `
		<h5>PrecioTotal: $${precioTotal}</h5></br>
		<button id="vaciarCarrito" onclick="eliminarCarrito()" class="btn btn-dark"> Vaciar Carrito</button>
		
	`
	;
}

function chequearCarritoEnStorage() {
	let contenidoEnStorage = JSON.parse(localStorage.getItem("carritoEnStorage"));

	if (contenidoEnStorage) {
		for (const objeto of contenidoEnStorage) {
			let producto = new Producto(objeto, objeto.cantidad);
			producto.actualizarPrecioTotal();
			carrito.push(producto);
		}

		imprimirTabla(carrito);
	}
}

function filtrarBusqueda(e) {
	e.preventDefault();

	
	let ingreso = document.getElementById("busqueda").value.toLowerCase();
	let filtro = productos.filter((elemento) => elemento.marca.toLowerCase().includes(ingreso));
	console.log(filtro);
	imprimirProductosEnHTML(filtro);
}


let btnFiltrar = document.getElementById("btnFiltrar");
btnFiltrar.addEventListener("click", filtrarBusqueda);


imprimirProductosEnHTML(productos);


chequearCarritoEnStorage();
//



let btn = document.querySelector('#getWeather');

        btn.addEventListener("click", () => {
            let key = "0ca063b746578ffb14d9f9455bdb165a";
            let city = document.querySelector('#cityname').value;
            city = encodeURIComponent(city)
            

            let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

            

            if (city != "") {
                fetch(url)
                    .then((data) => {
                        //console.log(data)
                        return data.json()
                    })
                    .then((clima) => {
                        //console.log(clima)
                        let temperatura = clima.main.temp;
                        //console.log(temperatura)
                        let tempC = temperatura - 273.15
                        let res = document.querySelector("#temperatura")
                        res.innerHTML = tempC.toFixed(0)

                        if (tempC < 10) {
                            res.className = "cold"
                        } else {
                            res.className = "hot"
                        }
                    })
                    .catch((err) => {
                        console.log("El error es " + err)
                    })
            }


        })