// Define la clase Producto
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Instancia del carrito
const carrito = {
    productos: [],
    total: 0,

    cargarCarritoDesdeLocalStorage() {
        const carritoGuardado = localStorage.getItem('carrito');
        const totalGuardado = localStorage.getItem('total');

        if (carritoGuardado && totalGuardado) {
            this.productos = JSON.parse(carritoGuardado);
            this.total = parseFloat(totalGuardado || 0);
        }

        this.actualizarCarrito();
    },

    guardarCarritoEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(this.productos));
        localStorage.setItem('total', this.total);
    },

    agregarProducto(nombre, precio, cantidadId) {
        const cantidadInput = document.getElementById(cantidadId);
        const cantidad = parseInt(cantidadInput.value);

        if (!isNaN(cantidad) && cantidad > 0) {
            const productoExistente = this.productos.find((producto) => producto.nombre === nombre);

            if (productoExistente) {
                productoExistente.cantidad += cantidad;
                this.total += precio * cantidad;
            } else {
                const nuevoProducto = new Producto(nombre, precio);
                nuevoProducto.cantidad = cantidad;  // Se asigna la cantidad directamente al producto
                this.productos.push(nuevoProducto);
                this.total += precio * cantidad;
            }

            this.actualizarCarrito();
            this.guardarCarritoEnLocalStorage();

            // Mostrar una alerta de éxito con SweetAlert
            Swal.fire({
                title: 'Producto Agregado',
                text: `${nombre} ha sido agregado al carrito.`,
                icon: 'success'
            });

            // Habilitar el botón de "Pagar" si hay productos en el carrito
            const pagarButton = document.getElementById('pagar');
            if (this.productos.length > 0) {
                pagarButton.removeAttribute('disabled');
            }
        } else {
            alert('Por favor, ingrese una cantidad válida.');
        }
    },

    eliminarDelCarrito(index) {
        this.total -= this.productos[index].precio * this.productos[index].cantidad;
        this.productos.splice(index, 1);
        this.actualizarCarrito();
        this.guardarCarritoEnLocalStorage();

        // Mostrar una alerta de éxito con SweetAlert
        Swal.fire({
            title: 'Producto Eliminado',
            text: 'El producto ha sido eliminado del carrito.',
            icon: 'success'
        });

        // Deshabilitar el botón de "Pagar" si no hay productos en el carrito
        const pagarButton = document.getElementById('pagar');
        if (this.productos.length === 0) {
            pagarButton.setAttribute('disabled', 'true');
        }
    },

    actualizarCarrito() {
        const listaCarrito = document.getElementById('lista-carrito');
        const totalCarrito = document.getElementById('total-carrito');
        listaCarrito.innerHTML = '';
        this.productos.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.nombre} - $${item.precio} - Cantidad: ${item.cantidad}`;
            const eliminarButton = document.createElement('button');
            eliminarButton.textContent = 'Eliminar';
            eliminarButton.onclick = () => this.eliminarDelCarrito(index);
            li.appendChild(eliminarButton);
            listaCarrito.appendChild(li);
        });
        totalCarrito.textContent = this.total.toFixed(2); // Asegúrate de mostrar el total con dos decimales
    },

    realizarCompra() {
        if (this.productos.length > 0) {
            // Realiza aquí la lógica de compra, por ejemplo, envío de datos al servidor, etc.

            // Limpia el carrito
            this.productos = [];
            this.total = 0;
            this.actualizarCarrito();
            this.guardarCarritoEnLocalStorage();

            // Mostrar una alerta de éxito con SweetAlert
            Swal.fire({
                title: 'Compra Realizada',
                text: 'La compra se ha realizado con éxito.',
                icon: 'success'
            });

            // Deshabilitar el botón de "Pagar" después de la compra
            const pagarButton = document.getElementById('pagar');
            pagarButton.setAttribute('disabled', 'true');
        }
    }
};

// Cargar el carrito desde el localStorage al cargar la página
carrito.cargarCarritoDesdeLocalStorage();