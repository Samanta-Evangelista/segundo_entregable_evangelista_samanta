import express from "express";

const app = express();

app.use(express.urlencoded({extended:true}))


const productos = [
    { id: 1, nombre: "Agua mineral", categoria: "bebidas", stock: 2, precio: 500 },
    { id: 2, nombre: "Jugo Baggio", categoria: "bebidas", stock: 7, precio: 280 },
    { id: 3, nombre: "Alfajor Blanco", categoria: "golosinas", stock: 18, precio: 150 },
    { id: 4, nombre: "Alfajor Nrgro", categoria: "golosinas", stock: 13, precio: 150 },
    { id: 5, nombre: "Tutucas", categoria: "golosinas", stock: 20, precio: 250 },
    { id: 6, nombre: "Chupetin Pico dulce", categoria: "golosinas", stock: 30, precio: 150 },
    { id: 7, nombre: "Palitos salados", categoria: "snacks", stock: 25, precio: 350 },
    { id: 8, nombre: "Papas Fritas", categoria: "snacks", stock: 17, precio: 450 },
    { id: 9, nombre: "Chizitos", categoria: "snacks", stock: 17, precio: 450 },
    { id: 10, nombre: "coca-cola", categoria: "Bebidas", stock: 17, precio: 750 },
]

app.get("/", (req, res) =>{
    res.send(productos);
});

app.get("/productos", (req, res) =>{
        res.send(productos);
});

app.get("/productos", (req, res) =>{
    const limit = parseInt(req.query.limit)||5;
    const primerosProductos=productos.slice(0,limit)
    res.send(primerosProductos);
});

app.get("/:idProducto", (req, res) => {
    const idProducto=req.params.idProducto;

    let producto = productos.find(producto => producto.id == idProducto);

    if (!producto){
        return res.send({
            error: "Producto no encontrado"
        });
    }
    res.send({producto});
})


app.listen(8080, () =>{
    console.log('Servidor activo en http://localhost:8080');
})



