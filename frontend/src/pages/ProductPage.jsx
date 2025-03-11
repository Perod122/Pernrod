import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import e from "cors";

function ProductPage(){
    const {
        currentProduct, 
        formData, 
        setFormData, 
        loading, 
        error, 
        fetchProduct, 
        updateProduct, 
        deleteProduct} = useProductStore();
    
        const navigate = useNavigate();
        const {id} = useParams();
        useEffect(() => {
            fetchProduct(id);
        }, [fetchProduct, id]);

        if (loading) {
            return (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="loading loading-spinner loading-lg"/>
                </div>
            );
        }

        if (error) {
            return (
                <div className="alert alert-error">
                    {error}
                </div>
            );
        }
     return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <button className="btn btn-ghost" onClick={() => navigate(-1)}>
                <ArrowLeftIcon className="size-5 mr-2" />
                Go back
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
                    <img src={currentProduct.image} alt={currentProduct.name} className="size-full object-cover" />
                </div>
                {/* PRODUCT FORM */}
                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-6">Edit Product</h2>

                        <form onSubmit={(e) => {e.preventDefault(); updateProduct(id);}} className="space-y-6">
                        
                        {/* PRODUCT NAME */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base font-medium">Product Name</span>
                            </label>
                                <input 
                                type="text" 
                                placeholder="Product name" 
                                className="input input-bordered w-full" 
                                value={formData.name} 
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                        </div>
                        {/* PRODUCT PRICE */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base font-medium">Price</span>
                            </label>
                            <input 
                            type="number" 
                            min="0" 
                            step="0.01" 
                            placeholder="Product price" 
                            className="input input-bordered w-full" 
                            value={formData.price} 
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                            />
                        </div>
                        {/* PRODUCT IMAGE URL */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base font-medium">Image</span>
                            </label>
                            <input 
                            type="text" 
                            placeholder="https://example.com/image.jpg" 
                            className="input input-bordered w-full" 
                            value={formData.image} 
                            onChange={(e) => setFormData({...formData, image: e.target.value})}
                            />
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     )
}

export default ProductPage;