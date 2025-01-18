import { useState } from "react";

export default function ProductForm() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [products, setProducts] = useState([]);
  const [nextId, setNextId] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    const newProduct = {
      id: nextId,
      name: productName,
      price: parseFloat(productPrice).toFixed(2),
      image: productImage,
    };

    setProducts([...products, newProduct]);
    setNextId(nextId + 1);

    setProductName("");
    setProductPrice("");
    setProductImage("");
  }

  function handleDelete(productId) {
    if (window.confirm("คุณแน่ใจหรือไม่ที่จะลบสินค้านี้?")) {
      setProducts(products.filter((product) => product.id !== productId));
    }
  }

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-lg font-bold mb-4">เพิ่มข้อมูลสินค้า</h2>

        <div className="grid grid-cols-3 gap-4 items-center">
          <label htmlFor="productName" className="text-right font-medium">
            ชื่อสินค้า:
          </label>
          <input
            id="productName"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border border-gray-300 p-2 col-span-2 w-full max-w-xs"
            placeholder="กรอกชื่อสินค้า"
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <label htmlFor="productPrice" className="text-right font-medium">
            ราคา:
          </label>
          <input
            id="productPrice"
            type="number"
            step="0.01"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="border border-gray-300 p-2 col-span-2 w-full max-w-xs"
            placeholder="กรอกราคา"
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <label htmlFor="productImage" className="text-right font-medium">
            รูปภาพ:
          </label>
          <input
            id="productImage"
            type="text"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            className="border border-gray-300 p-2 col-span-2 w-full max-w-xs"
            placeholder="URL รูปภาพ"
            required
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            บันทึก
          </button>
          <button
            type="button"
            onClick={() => {
              setProductName("");
              setProductPrice("");
              setProductImage("");
            }}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            เคลียร์
          </button>
        </div>
      </form>

      <h3 className="text-lg font-bold mt-6">รายการสินค้า</h3>
      <table className="border-collapse border border-blue-400 w-full mt-4">
        <thead>
          <tr className="bg-black-100">
            <th className="border border-blue-300 px-2">No.</th>
            <th className="border border-blue-300 px-2">ชื่อสินค้า</th>
            <th className="border border-blue-300 px-2">ราคา</th>
            <th className="border border-blue-300 px-2">รูปภาพสินค้า</th>
            <th className="border border-blue-300 px-2">ดำเนินการ</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} className="text-center">
              <td className="border border-gray-300 px-2">{index + 1}</td>
              <td className="border border-gray-300 px-2">{product.name}</td>
              <td className="border border-gray-300 px-2">{product.price}</td>
              <td className="border border-gray-300 px-2">
                <img
                  src={product.image}
                  alt="product"
                  className="h-8 w-8 object-cover mx-auto"
                />
              </td>
              <td className="border border-gray-300 px-2">
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-black px-2 py-1 rounded"
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
