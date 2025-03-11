import { DollarSign, PackageIcon, PlusCircleIcon } from "lucide-react";
import { useProductStore } from "../store/useProductStore";

function AddProductModal(){
    const {addProduct, formData, setFormData, loading} = useProductStore();
    return (
        <dialog id="add-product-modal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    X
                    </button>
                </form>

                <h3 className="text-xl font-bold mb-8">Add a new product</h3>
                <form onSubmit={addProduct} className="space-y-6">
                    <div className="grid gap-6">
                        <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base font-medium">Name</span>
                                </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                <PackageIcon className="size-5" />
                                </div>
                                <input type="text" placeholder="Product name" className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200" 
                                value={formData.name} 
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                        </div>
                        {/* ADD PRODUCT PRICE  */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base font-medium">Price</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                    <DollarSign className="size-5" />
                                </div>
                                <input 
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Product price" 
                                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200" 
                                value={formData.price} 
                                onChange={(e) => setFormData({...formData, price: e.target.value})}
                                />
                            </div>
                        </div>
                        {/* ADD PRODUCT IMAGE URL  */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base font-medium">Image</span> 
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                    <PackageIcon className="size-5" />
                                </div>
                                <input 
                                type="text"  
                                placeholder="https://example.com/image.jpg" 
                                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200" 
                                value={formData.image} 
                                onChange={(e) => setFormData({...formData, image: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                    {/* MODAL ACTIONS  */}
                    <div className="modal-action">
                        <form method="dialog">
                        <button  className="btn btn-ghost">
                            Cancel
                        </button>
                        </form>
                        <button 
                        type="submit" 
                        className="btn btn-primary min-w-[120px]"
                        disabled={!formData.name || !formData.price || !formData.image || loading}
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-sm"/>
                            ) : (
                                <>
                                <PlusCircleIcon className="size-5 mr-2" />
                                Add Product
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>
                    Close
                </button>
            </form>
        </dialog>
    )
}
export default AddProductModal;