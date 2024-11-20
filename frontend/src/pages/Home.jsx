import Card from '../components/Card';
import { useGetProductsQuery } from '../slices/productsApiSlice';


const Home = () => {

    const { data:products , error , isLoading } = useGetProductsQuery();



    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error : {error}</div>

    return (
        <section className="flex justify-center mt-8 mb-8">
            <div className="grid gap-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product, index) => (
                    <Card key={index} product={product} />
                ))}
            </div>
        </section>

    )
}

export default Home
