import { useEffect, useState } from "react";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name:"", price:"", category:"", stock:"", image:""
  });

  const load = async ()=>{
    const res = await fetch("http://localhost:5000/api/products");
    setProducts(await res.json());
  };

  useEffect(()=>{ load(); }, []);

  const addProduct = async ()=>{
    await fetch("http://localhost:5000/api/products", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(form)
    });
    setForm({ name:"", price:"", category:"", stock:"", image:"" });
    load();
  };

  const deleteProduct = async (id)=>{
    await fetch(`http://localhost:5000/api/products/${id}`, { method:"DELETE" });
    load();
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-4">Admin Products</h1>

      {/* form */}
      <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Price" onChange={e=>setForm({...form,price:e.target.value})}/>
      <input placeholder="Category" onChange={e=>setForm({...form,category:e.target.value})}/>
      <input placeholder="Stock" onChange={e=>setForm({...form,stock:e.target.value})}/>
      <input placeholder="Image URL" onChange={e=>setForm({...form,image:e.target.value})}/>
      <button onClick={addProduct}>Add</button>

      {/* list */}
      {products.map(p=>(
        <div key={p._id} className="bg-white p-3 mt-3">
          {p.name} - ₹{p.price}
          <button onClick={()=>deleteProduct(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
