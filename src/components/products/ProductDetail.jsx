import { Button } from "../Button.jsx";

 export const ProductDetail = ({ product }) => {
  return (

    <section className="w-full min-h-screen bg-electric-violet-200 shadow-lg rounded-lg overflow-hidden mt-10 flex justify-center items-center">
        <article className="w-full md:w-1/3 bg-gray-200 flex items-center justify-center p-6">
        <img
          className="w-48  h-48 md:w-64  object-cover  rounded-lg"
          src={product.imageUrl}
          alt={product.nombre}
        ></img>
      </article>
      <article className="p-8">                
        <p className="text-lg leading-tight  text-electric-violet-500">
          Nombre: <p className="mt-1 text-black text-sm"> {product.nombre}</p>
        </p>
        <article className="mt-1 text-lg leading-tight text-electric-violet-500">
          Categoria: <p className ="mt-1 text-black text-sm"> {product.categoria}</p>
        </article>
        <p className="text-lg leading-tight text-electric-violet-500">
          Descripción: <p className ="mt-1 text-black text-sm"> {product.descripcion}</p>
        </p>
        <p className="text-lg leading-tight text-electric-violet-500">
          Precio:<p className ="mt-1 text-black text-sm">{product.precio} € </p>
        </p>
        <p className="text-lg leading-tight text-electric-violet-500">
          Localidad: <p className ="mt-1 text-black text-sm">{product.localidad}</p>
        </p>
        <Button
                            colors="bg-light hover:bg-electric-violet-50 text-electric-violet-800"
                            path="/usuarios/:"
                        > Solicitar Compra
                            
                        </Button>
      </article>
    </section>
  );
};

