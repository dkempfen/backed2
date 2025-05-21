import { ProductService } from '../services/products.service.js';

const service = new ProductService();

export const fetchAllProducts = async (req, res) => {
  try {
    const allProducts = await service.getAll();
    return res.json(allProducts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

export const fetchProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await service.getById(pid);
    if (!product) {
      return res.status(404).json({ error: 'No se encontró el producto' });
    }
    return res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el producto' });
  }
};

export const addProduct = async (req, res) => {
  try {
    const newProduct = await service.create(req.body);
    return res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

export const modifyProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const updatedProduct = await service.update(pid, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado para actualizar' });
    }
    return res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const deleted = await service.delete(pid);
    if (!deleted) {
      return res.status(404).json({ error: 'No se encontró el producto a eliminar' });
    }
    return res.json({ message: 'El producto fue eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

