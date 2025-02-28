const ProductDetail = ({ product }) => {
  return (
    <article className="md:flex">
      <section className="md:shrink-0">
        <img
          className="h-48 w-full object-cover md:h-full md:w-48"
          src={product.imageUrl}
          alt={product.nombre}
        ></img>
      </section>
      <section className="p-8">
        <section className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          {product.categoria}
        </section>
        <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
          {product.nombre}
        </h1>
        <p className="mt-2 text-slate-500">
          {product.descripcion}
        </p>
        <p className="mt-2 text-slate-900 font-bold">
          Precio: {product.precio} €
        </p>
        <p className="mt-2 text-slate-500">
          Localidad: {product.localidad}
        </p>
      </section>
    </article>
  );
};

export default ProductDetail;