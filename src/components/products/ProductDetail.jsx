 export const ProductDetail = ({ product }) => {
  return (
    <section className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
      <article className="md:w-1/3 bg-gray-200 flex items-center justify-center p-6">
        <img
          className="h-48 w-full object-cover md:h-full md:w-48"
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
          Descripción: {product.descripcion}
        </p>
        <p className="mt-2 text-slate-900">
          Precio: {product.precio} €
        </p>
        <p className="mt-2 text-slate-500">
          Localidad: {product.localidad}
        </p>

      </article>
    </section>
  );
};

