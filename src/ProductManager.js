import fs from "fs";

export class ProductManager {
    #id = 0;
    constructor(path) {
        this.products = [];
        this.path = path;
    }


    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            this.products = await this.getProducts(); 

            const product = {
                id: this.#id++,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }

            this.products.find(product => product.code === code) ? console.error('Codigo del producto repetido!') : this.products.push(product);

            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
            console.log('Producto agregado!');

            return product;
        } catch (error) {
            console.error('Error al agregar producto', error);
        }

    }

    async getProducts() {
        try {
            const products = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(products);
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    async getProductById(id) {
        try {
            this.products = await this.getProducts();
            const productFound = this.products.find(product => product.id === id)
            return productFound ? productFound : console.error('ID no encontrado', error);
        } catch (error) {
            console.error('Error al obtener producto por ID: ', error);
        }
    }

    async updateProduct(id, update) {
        try {
            this.products = await this.getProducts();
            const product = await this.getProductById(id);

            if (product) {

                const updateProduct = {
                    ...product,
                    ...update,
                    id 
                }

                
                const updateProducts = this.products.map(product => (product.id === id) ? updateProduct : product);

                await fs.promises.writeFile(this.path, JSON.stringify(updateProducts, null, '\t'));
                console.log('Producto actualizado!');

                return updateProduct;
            }
            else {
                console.error('No se encontró ningún producto con el ID especificado', error);
            }
        } catch (error) {
            console.error('Error al actualizar producto', error);
        }
    }

    async deleteProduct(id) {
        try {
            const product = await this.getProductById(id);

            if (product) {
                this.products = await this.getProducts();

                const products = this.products.filter(product => product.id != id);

                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                console.log('Producto eliminado!');
            }
            else {
                console.error('No se encontró producto con el ID especificado');
            }

        } catch (error) {
            console.error('Error al eliminar producto', error);
        }
    }
}
