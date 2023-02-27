'use strict';

/*
 *  APELLIDOS
 */

const productos = [
    {
        id: 1,
        nombre: 'Auriculares Redragon Pandora',
        descripcion: 'Auriculares blancos',
        precio: 5000,
        imagen: '../Productos/auri-pandora.jpeg',
        categoria: 'Auriculares',
    },
    {
        id: 2,
        nombre: 'Auriculares League of Legends',
        descripcion: 'Marca: Logitech',
        precio: 10000,
        imagen: '../Productos/auri-lol.jpg',
        categoria: 'Auriculares',
    },
    {
        id: 3,
        nombre: 'Mouse Gamer',
        descripcion: 'Marca: Logitech',
        precio: 6000,
        imagen: '../Productos/mouse-logi.jpg',
        categoria: 'Mouse',
    },
    {
        id: 4,
        nombre: 'Mouse League of Legends',
        descripcion: 'Marca: Logitech',
        precio: 5000,
        imagen: '../Productos/mouse-lol.jpg',
        categoria: 'Mouse',
    },
    {
        id: 5,
        nombre: 'Teclado T-Dagger',
        descripcion: 'Teclado mecanico T-Dagger Bora',
        precio: 8000,
        imagen: '../Productos/teclado-bora.jpg',
        categoria: 'Teclado',
    },
    {
        id: 6,
        nombre: 'Teclado Redragon',
        descripcion: 'Teclado mecanico redragon blanco',
        precio: 9000,
        imagen: '../Productos/teclado-redragon.png',
        categoria: 'Teclado',
    },
];

let carrito = [];
let productosFiltrados = productos;
let html = document.querySelector('#productos')
let carritoBoton = document.getElementById('ver')
let modalCarro = document.querySelector('#modalCarrito')
let span = document.getElementsByClassName('cerrar')[0];
let vaciarCarrito = document.getElementById('vaciar')
let avanzarCarrito = document.getElementById('avanzarCompra')
let quitar = document.getElementById('quitar')
let modalDatos = document.querySelector('#datos')
let span2 = document.getElementsByClassName('cerrar')[1]


let storage = localStorage.getItem('Productos')

let selectCategoria = document.getElementById('categorias');


selectCategoria.addEventListener('change', cambiarCategoria);

carritoBoton.addEventListener('click', modal)
span.addEventListener('click', cerrar)
vaciarCarrito.addEventListener('click', vaciar)
avanzarCarrito.addEventListener('click', avanzar)
span2.addEventListener('click', cerrar2)



if(storage){
    carrito = JSON.parse(storage)
    document.querySelector('#item span').innerText = carrito.length 
    let precio = carrito.reduce((acumulador, objeto)=>{
        return acumulador + objeto.precio
    }, 0) 
    document.querySelector('#dinero span').innerText = precio
}

renderizar();
function renderizar(){
    productosFiltrados.forEach(producto => {
        let cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.setAttribute('id', producto.id)
        cardDiv.style.width = '20rem';
        cardDiv.style.height = '35rem';
        
        

        let cardImg = document.createElement('img')
        cardImg.setAttribute('src', producto.imagen)
        cardImg.classList.add('card-img-top');

        
        let div2 = document.createElement('div')
        div2.classList.add('card-body')

        

        let cardH5 = document.createElement('h5')
        cardH5.textContent = producto.nombre
        cardH5.classList.add('card-title', 'text-center')
        cardH5.setAttribute('pinga', producto.nombre)
        

        let cardDescription = document.createElement('p')
        cardDescription.textContent = producto.descripcion
        cardDescription.classList.add('card-text', 'text-center')

        let cardPrecio = document.createElement('p')
        cardPrecio.textContent = '$' + producto.precio
        cardPrecio.classList.add('card-text', 'text-center')
        cardPrecio.setAttribute('id', producto.precio)

        let cardCategoria = document.createElement('p')
        cardCategoria.textContent = 'Categoria: ' + producto.categoria
        cardCategoria.classList.add('card-text', 'text-center')
        
        let cardBtn = document.createElement('button')
        cardBtn.textContent = 'Agregar'
        cardBtn.setAttribute('id', producto.id)
        

        cardDiv.append(cardImg)
        cardDiv.append(div2)
        div2.append(cardH5)
        div2.append(cardDescription)
        div2.append(cardPrecio)
        div2.append(cardCategoria)
        div2.append(cardBtn)

        html.append(cardDiv)
        
        cardBtn.addEventListener('click', () => agregarProducto(producto))
    });
}

function agregarProducto(producto){

    let productoEncontrado = carrito.find((obj) => obj.nombre === producto.nombre);

    if (!productoEncontrado){
        carrito.push(    
            {
                ...producto,
                cantidad: 1
            }
        )
    } else {
        productoEncontrado.cantidad += 1;
    }

    recargar();
}


function modal(){
    document.getElementById('carritoLista').innerHTML = ''
   
    modalCarro.style.display = 'block'
    
    carrito.forEach(producto => {
        let prodLi = document.createElement('li');
        prodLi.classList.add('card')
        prodLi.style.width = '30rem';
        prodLi.style.height = '40rem';
        prodLi.style.color = 'black';

        let spanImg = document.createElement('img');
        spanImg.setAttribute('src', producto.imagen)
        spanImg.style.height = '30rem'
        spanImg.classList.add('card-img-top');
        let spanNombre = document.createElement('span');
        spanNombre.textContent = producto.nombre
        let spanPrecio = document.createElement('span');
        spanPrecio.textContent = '$' + producto.precio
        let spanCantidad = document.createElement('span');
        spanCantidad.textContent = 'Cantidad: ' + producto.cantidad
        let quitar = document.createElement('button');
        quitar.style.width = '100%';
        quitar.textContent = '♻';
        quitar.addEventListener('click', () => borrar(producto.nombre))
        
        prodLi.append(spanImg)
        prodLi.append(spanNombre)
        prodLi.append(spanPrecio)
        prodLi.append(spanCantidad)
        prodLi.append(quitar)
        document.querySelector('#carritoLista').append(prodLi)
    });
}

function cambiarCategoria(event){
    html.innerHTML = "";
    event.preventDefault();

    if(event.target.value == ""){
        productosFiltrados = productos;
    }else{
        productosFiltrados = productos.filter(product => product.categoria === event.target.value);
        promocion()
    }
    renderizar();
}


function promocion() {
    let promo = document.getElementById('promo');
    let texto1 = document.getElementById('promo-texto');

    let randomIndex = Math.floor(Math.random() * productosFiltrados.length);
    let productoRandom = productosFiltrados[randomIndex];

    let precioDescuento = productoRandom.precio / 2;

    texto1.innerText = `50% OFF en ${productoRandom.nombre}\nPrecio nuevo: $${precioDescuento}`;

    let proBtn = document.getElementById('proBtn');
    proBtn.addEventListener('click', () => agregarProducto(
        {
            ...productoRandom,
            nombre: productoRandom.nombre + ' - 50% OFF',
            precio: precioDescuento
        }
    ));
    
    promo.style.display = 'flex';

    setTimeout(() => {
        promo.style.display = 'none';
    }, 10000);
}

function borrar(prodNombre){
    carrito = carrito.filter(prod => prod.nombre !== prodNombre);
    recargar();
    modal()
}

function vaciar(){
    carrito = [];
    localStorage.removeItem('Productos')
    recargar();
    modal();
}

function avanzar(){
    document.getElementById('compra').innerHTML = ''
    modalDatos.style.display = 'block'

    carrito.forEach(producto => {
        let buyLi = document.createElement('li');
        buyLi.classList.add('card')
        buyLi.style.width = '30rem';
        buyLi.style.height = '40rem';
        buyLi.style.color = 'black';

        let spanImg2 = document.createElement('img');
        spanImg2.setAttribute('src', producto.imagen)
        spanImg2.style.height = '30 rem'
        spanImg2.classList.add('card-img-top');
        let spanNombre2 = document.createElement('span');
        spanNombre2.textContent = producto.nombre
        let spanPrecio2 = document.createElement('span');
        spanPrecio2.textContent = 'Precio: $' + producto.precio
        let spanCantidad2 = document.createElement('span');
        spanCantidad2.textContent = 'Cantidad: ' + producto.cantidad

        document.querySelector('#compra').append(buyLi)
        buyLi.append(spanImg2)
        buyLi.append(spanNombre2)
        buyLi.append(spanPrecio2)
        buyLi.append(spanCantidad2)
        
        
    });

    let divF = document.createElement('div')
    divF.classList.add('mb-3')


    let label1 = document.createElement('label')
    label1.classList.add('form-label')
    label1.textContent = 'Nombre'

    let input1 = document.createElement('input')
    input1.classList.add('form-control')
    input1.setAttribute('type', 'text')
    input1.setAttribute('required', 'true')
    input1.style.margin = '0px 0px 10px 0px'

    let label2 = document.createElement('label')
    label2.classList.add('form-label')
    label2.textContent = 'Telefono'

    let input2 = document.createElement('input')
    input2.classList.add('form-control')
    input2.setAttribute('type', 'number')
    input2.setAttribute('required', 'true')
    input2.style.margin = '0px 0px 10px 0px'

    let label3 = document.createElement('label')
    label3.classList.add('form-label')
    label3.textContent = 'E-mail'

    let input3 = document.createElement('input')
    input3.classList.add('form-control')
    input3.setAttribute('type', 'email')
    input3.setAttribute('required', 'true')
    input3.style.margin = '0px 0px 10px 0px'

    let label4 = document.createElement('label')
    label4.classList.add('form-label')
    label4.textContent = 'Lugar de entrega'

    let input4 = document.createElement('input')
    input4.classList.add('form-control')
    input4.style.margin = '0px 0px 10px 0px'
    input4.setAttribute('required', 'true')

    let label5 = document.createElement('label')
    label5.classList.add('form-label')
    label5.textContent = 'Fecha de entrega'
    
    let input5 = document.createElement('input')
    input5.classList.add('form-control')
    input5.setAttribute('type', 'date')
    input5.setAttribute('required', 'true')
    input5.style.margin = '0px 0px 10px 0px'

    let label6 = document.createElement('label')
    label6.classList.add('form-label')
    label6.textContent = 'Método de pago'
    
    let select1 = document.createElement('select')
    select1.classList.add('form-control')
    select1.setAttribute('required', 'true')
    select1.style.margin = '0px 0px 10px 0px'

    select1.addEventListener('change', (event) => cuotas(event, divF))
    
    let option1 = document.createElement('option')
    option1.setAttribute('value', 'efectivo')
    option1.innerText = 'Efectivo';
    let option2 = document.createElement('option')
    option2.setAttribute('value', 'credito')
    option2.innerText = 'Tarjeta de crédito';
    let option3 = document.createElement('option')
    option3.setAttribute('value', 'debito')
    option3.innerText = 'Tarjeta de débito';
    
    let btnSubmit = document.createElement('button')
    btnSubmit.classList.add('btn', 'btn-primary')
    btnSubmit.textContent = 'COMPRAR';
    btnSubmit.setAttribute('type', 'submit')


    
    let formulario = document.querySelector('form')
    formulario.innerHTML = ''
    formulario.addEventListener('submit', gracias);
    formulario.append(divF, btnSubmit);
    divF.append(label1, input1, label2, input2, label3, input3, label4, input4, label5, input5, label6, select1);
    select1.append(option1, option2, option3);

    recargar();
    modal();
}

function cuotas(event, padre) {
    let selectCuotas = document.getElementById('selectCuotas');

    if(event.target.value === 'credito') {
        let select2 = document.createElement('select')
        select2.id = 'selectCuotas';
        select2.classList.add('form-control')
        select2.setAttribute('required', 'true')
        select2.style.margin = '0px 0px 10px 0px'
        
        let option4 = document.createElement('option')
        option4.setAttribute('value', 'cuota1')
        option4.innerText = '3 cuotas';
        let option5 = document.createElement('option')
        option5.setAttribute('value', 'cuota2')
        option5.innerText = '6 cuotas';
        let option6 = document.createElement('option')
        option6.setAttribute('value', 'cuota3')
        option6.innerText = '12 cuotas';

        padre.append(select2)
        select2.append(option4, option5, option6)
    } else {
        if(selectCuotas)
            padre.removeChild(selectCuotas);
    }
}

function cerrar(){
    modalCarro.style.display = 'none'
    
}
function cerrar2(){
    modalDatos.style.display = 'none'
}

function cerrar3(){
    modalGracias.style.display = 'none'
}

function gracias(evento){
    evento.preventDefault()
    carrito = []
    localStorage.removeItem('Productos')
    Swal.fire(
        'Gracias por su compra!',
        '',
        'success'
      )

    recargar()
    
    modalCarro.style.display = 'none'
    modalDatos.style.display = 'none'
}

function recargar(){
    localStorage.setItem('Productos', JSON.stringify(carrito))
    document.querySelector('#item span').innerText = carrito.length   
    let total = 0
    carrito.map((obj) => {
        total += obj.precio * obj.cantidad
    })
    document.querySelector('#dinero span').innerText = total
}