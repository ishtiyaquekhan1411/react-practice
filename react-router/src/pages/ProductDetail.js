import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { productId } = useParams(); 
    // It is used to get the dynamic params of the URL passed using /:productId

    return (
        <section>
            <h1>Product Detail</h1>
            <p>{productId}</p>
        </section>
    )
}

export default ProductDetail;