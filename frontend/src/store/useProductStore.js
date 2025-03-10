import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const useProductStore = create((set, get) => ({
    // State variables
    products: [],
    loading: false,
    error: null,

    // Fetch products from API
    fetchProducts: async () => {
        set({ loading: true });

        try {
            const response = await axios.get(`${BASE_URL}/api/products`);
            set({ products: response.data.data, error: null });
        } catch (err) {
            const errorMessage =
                err?.response?.status === 429
                    ? "Too many requests. Please try again later."
                    : "An error has occurred. Please try again later.";

            set({ error: errorMessage, products: [] });
        } finally {
            set({ loading: false });
        }
    },
    
    deleteProduct: async (id) => {
        set({loading: true});
        try {
            await axios.delete(`${BASE_URL}/api/products/${id}`);
            set(prev => ({products: prev.products.filter(product => product.id !== id)}));
        } catch (error) {
            console.log("Error deleting a product",error);
        }
    }

}));
