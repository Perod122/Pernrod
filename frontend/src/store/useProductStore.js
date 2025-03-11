import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000";

export const useProductStore = create((set, get) => ({
    // State variables
    products: [],
    loading: false,
    error: null,

    //form state
    formData: {
        name: "",
        price: "",
        image: "",
    },

    setFormData: (formData)=> set({formData}),
    resetForm: () => set({formData: {name: "", price: "", image: ""}}),

    addProduct: async (e) => {
        e.preventDefault();
        set({loading: true});
        try {
            const {formData} = get();
            await axios.post(`${BASE_URL}/api/products`, formData);
            await get().fetchProducts();
            get().resetForm
            toast.success("Product added successfully");
            document.getElementById("add-product-modal").close();
        } catch (error) {
            toast.error("Something went wrong. Please try again later.");
        }finally{
            set({loading: false});
        }
    },
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
            toast.success("Product deleted successfully");
        } catch (error) {
            console.log("Error deleting a product",error);
            toast.error("Something went wrong. Please try again later.");
        }finally{
            set({loading: false});
        };
    }

}));
