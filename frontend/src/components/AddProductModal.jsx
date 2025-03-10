import { PackageIcon } from "lucide-react";
import { useProductStore } from "../store/useProductStore";

function AddProductModal(){
    const {addProduct, formData, setFormData} = useProductStore();
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
                                <input type="text" name="name" placeholder="Product name" className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200" 
                                value={formData.name} 
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                        </div>
                        {/* CONTINUE BELOW - ADD PRODUCT PRICE  */}
                    </div>
                </form>
            </div>
        </dialog>
    )
}
export default AddProductModal;