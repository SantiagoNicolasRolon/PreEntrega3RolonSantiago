const articulos = document.getElementById("articulos");
const guardarCarrito = document.getElementById("guardarCarrito");
const contenedorCarrito = document.getElementById("contenedorCarrito");
const conteoCarrito = document.getElementById("conteoCarrito");

// INDEX //

const mostrarProductos = (mostrarJoyas) => {
    articulos.innerHTML = '';

    mostrarJoyas.forEach((Joya) => {
        const contenido = document.createElement("article");

        contenido.innerHTML = `
        <div class="productos">
            <h2>${Joya.nombre}</h2>
            <img src="${Joya.img}">
            <b>Precio: ${Joya.precio}$</b>
            <button>Comprar</button>
        </div>    
        `;
        articulos.append(contenido);

        contenido.querySelector('button').addEventListener('click', () => {
            const repetir = carrito.some((repetirJoya) => repetirJoya.id === Joya.id);

            if (repetir === true) {
                carrito.map((J) => {
                    if (J.id === Joya.id) {
                        J.stock++;
                    }
                });
            } else {
                carrito.push({
                    id: Joya.id,
                    nombre: Joya.nombre,
                    precio: Joya.precio,
                    categoria: Joya.categoria,
                    img: Joya.img,
                    stock: Joya.stock,
                });
            }
            cantidadEnCarrito();
            guardarLocal();
        });
    });
};



const filtrarJoyas = (categoria) => {
    const mostrarJoyas = joyas.filter(Joya => Joya.categoria === categoria)
    mostrarProductos(mostrarJoyas)
};

const filtroTodo = document.getElementById('filtroTodo');
const filtroAritos = document.getElementById('filtroAritos');
const filtroDijes = document.getElementById('filtroDijes');
const filtroPulceras = document.getElementById('filtroPulceras');

filtroTodo.addEventListener('click', () => {
    mostrarProductos(joyas)
});
filtroAritos.addEventListener('click', () => {
    filtrarJoyas('aritos')
});
filtroDijes.addEventListener('click', () => {
    filtrarJoyas('dijes')
});
filtroPulceras.addEventListener('click', () => {
    filtrarJoyas('pulceras')
});

mostrarProductos(joyas)

// CARRITO //

const guardarLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    contenedorCarrito.style.display = "flex";
    const carritoHeader = document.createElement("div");
    carritoHeader.className = "carrito-header"
    carritoHeader.innerHTML = `
    <h2>Carrito de compras.</h2>
    `
    contenedorCarrito.append(carritoHeader);

    const botonCarrito = document.createElement("p");
    botonCarrito.innerText = "Cerrar";
    botonCarrito.addEventListener("click", () => {
        contenedorCarrito.style.display = "none";
    })

    carritoHeader.append(botonCarrito);

    carrito.forEach((Carro) => {
        const contenidoDeCarrito = document.createElement("article")
        contenidoDeCarrito.className = "carritodecompras"
        contenidoDeCarrito.innerHTML = `
            <img src="${Carro.img}">
            <h2>${Carro.nombre}</h2>
            <b>Precio: ${Carro.precio}$</b>
            <p>Unidades: ${Carro.stock}</p>
            <p>Total: ${Carro.stock * Carro.precio}</p>
            <span class="quitarprod"> ❌ </span>
        `
        contenedorCarrito.append(contenidoDeCarrito);

        const borrar = contenidoDeCarrito.querySelector(".quitarprod");

        borrar.addEventListener("click", () => {
            borrarProd(Carro.id)
        });
    });
    const total = carrito.reduce((A, E) => A + E.precio * E.stock, 0);
    const totalApagar = document.createElement("div");
    totalApagar.className = "totalApagar";
    totalApagar.innerHTML = `<p>Total a pagar:</p><p>${total} $</p>`;
    contenedorCarrito.append(totalApagar);
};

guardarCarrito.addEventListener("click", mostrarCarrito);

const borrarProd = (id) => {
    const encontrarID = carrito.find((e) => e.id === id);

    carrito = carrito.filter((buscarID) => {
        return buscarID !== encontrarID;
    });
    cantidadEnCarrito();
    guardarLocal();
    mostrarCarrito();
};

const cantidadEnCarrito = () => {
    conteoCarrito.style.display = "block";

    const carritoCantidad = carrito.length;
    localStorage.setItem("carritoCantidad", JSON.stringify(carritoCantidad));

    conteoCarrito.innerText = JSON.parse(localStorage.getItem("carritoCantidad"));
};

cantidadEnCarrito();