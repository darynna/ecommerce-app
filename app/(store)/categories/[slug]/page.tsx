import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProctsByCatetegory } from "@/sanity/lib/products/getProctsByCatetegory";
import ProductsView from "@/components/ProductsView"

async function CategoriesPage(
    {params} : {params: Promise<{slug: string}> }
) {
    const { slug } = await params;

    const productsData = await getProctsByCatetegory(slug);
  const products = productsData ?? []; 
    const categories = await getAllCategories();

    return <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-center">
                {slug
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}{" "}
                Collection
            </h1>
            <ProductsView products={products} categories={categories} />
        </div>
    </div>
    
};

export default CategoriesPage
