import express from "express";
import {ProductManager} from "./ProductManager.js";

const MP = new ProductManager("../products.json");

const app = express();

app.use(express.urlencoded({extended:true}))

app.get("/", async (req, res) => {
    res.send(await MP.getProducts()); 
});

app.get("/productos", async (req, res) =>{
    const limit = req.query.limit;
    const prodParaMostrar = await MP.getProducts();

    if (!limit)
        return res.send(prodParaMostrar);

    res.send(prodParaMostrar.slice(0,limit));
});

app.get("/producto/:idProducto", async (req, res) => {
    const idProducto = req.params.idProducto;
    
    let producto = await MP.getProductById(idProducto);

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



