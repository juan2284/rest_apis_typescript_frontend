import { ActionFunctionArgs, Form, useNavigate, redirect, useFetcher } from "react-router-dom";
import { formatCurrency } from "../helpers";
import type { Product } from "../types";
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProp = {
  product: Product
}

export async function action ({params}: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect('/');    
  }
}

export default function ProductDetails({product}: ProductDetailsProp) {

  const fetcher = useFetcher();
  const navigate = useNavigate();
  const isAvailable = product.availability;

  return (
    <tr className="border-b ">
      <td className="p-1 text-sm text-gray-800">
        {product.name}
      </td>
      <td className="p-1 text-sm text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-1 text-sm text-gray-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer hover:bg-slate-200`}
          >
            {isAvailable ? 'Available' : 'Not Available'}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-1 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => navigate(`/products/${product.id}/edit`)}
            className="bg-sky-600 hover:bg-sky-700 text-white rounded-md w-full p-2 uppercase font-bold text-xs text-center"
          >
            Editar
          </button>

          <Form
            className="w-full"
            method="POST"
            action={`products/${product.id}/delete`} // Este action tiene que ser el mismo path que tiene la ruta que definimos en el router para que funcione correctamente.
            onSubmit={(e) => {
              if (!confirm('¿Eliminar?')) {
                e.preventDefault();
              }
            }}
          >
            <input
              type="submit"
              value='Eliminar'
              className="bg-red-600 hover:bg-red-700 text-white rounded-md p-2 w-full uppercase font-bold text-xs text-center"
            />
          </Form>
        </div>
      </td>
    </tr>
  )
}
