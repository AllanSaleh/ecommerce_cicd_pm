import { useQuery } from "react-query"
import { fetchCategories, fetchProducts } from "../api/api"
import { useState } from "react"
import { Product } from "../types/types"
import ProductCard from "./ProductCard"
import { Link } from "react-router-dom"

const Home = () => {
    const { data: products } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts
    })

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories
    })

    console.log("products: ", products)
    console.log("categories: ", categories)
    const [selectedCategory, setSelectedCategory] = useState('')

    const getFilteredProducts = () => {
        if (selectedCategory) {
            return products?.filter((product: Product) => product.category === selectedCategory)
        }
        return products
    }

    const filteredProducts = getFilteredProducts()

  return (
    <div>
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories?.map((category: string) => (
                <option key={category} value={category}>{category}</option>
            ))}
        </select>
        <Link to={'/cart'}>Cart</Link>
        <div>
            {filteredProducts?.map((product: Product) => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
        <h1>End of Home</h1>
    </div>
  )
}
export default Home