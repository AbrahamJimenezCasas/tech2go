 export const ProductDetail = ({ product }) => {
  return (
    <section className="md:flex">
      <article className="md:shrink-0">
        <img
          className="h-48 w-full object-cover md:h-full md:w-48"
          src={product.imageUrl}
          alt={product.nombre}
        ></img>
      </article>
      <article className="p-8">
        
        
        
        <p className="block mt-1 text-lg leading-tight font-medium text-black">
          Nombre {product.nombre}
        </p>
        <article className="uppercase tracking-wide text-sm text-electric-violet-500 font-semibold">
        Categoria {product.categoria}
        </article>
        <p className="mt-2 text-dark">
          Descripción {product.descripcion}
        </p>
        <p className="mt-2 text-slate-900 font-bold">
          Precio: {product.precio} €
        </p>
        <p className="mt-2 text-slate-500">
          Localidad: {product.localidad}
        </p>

      </article>
    </section>
  );
};

