import express from "express";

const app = express();

app.use(express.urlencoded({extended:true}))


const products = [
    { id: 1, name: "Agua mineral", category: "bebidas", stock: 2, price: 500 },
    { id: 2, name: "Jugo Baggio", category: "bebidas", stock: 7, price: 280 },
    { id: 3, name: "Alfajor Blanco", category: "golosinas", stock: 18, price: 150 },
    { id: 4, name: "Alfajor Nrgro", category: "golosinas", stock: 13, price: 150 },
    { id: 5, name: "Tutucas", category: "golosinas", stock: 20, price: 250 },
    { id: 6, name: "Chupetin Pico dulce", category: "golosinas", stock: 30, price: 150 },
    { id: 7, name: "Palitos salados", category: "snacks", stock: 25, price: 350 },
    { id: 8, name: "Papas Fritas", category: "snacks", stock: 17, price: 450 },
    { id: 9, name: "Chizitos", category: "snacks", stock: 17, price: 450 },
    { id: 10, name: "coca-cola", category: "Bebidas", stock: 17, price: 750 },
]

app.get("/", (req, res) =>{
    res.send(products);
});

app.get("/products", (req, res) =>{
    const limit = req.query.limit;
    let products;

    if (limit == undefined)
        products = products;
    else
        products = products.slice(0,limit);

    res.send(products);
});

app.get("/producto/:idProducto", (req, res) => {
    const idProducto=req.params.idProducto;

    let producto = products.find(producto => producto.id == idProducto);

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



