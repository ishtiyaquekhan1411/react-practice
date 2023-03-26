import { Link } from 'react-router-dom';

const Products = () => {
    return (
        <section>
            <h1>The Products page</h1>
            <ul>
                <li>
                    <Link to="/products/p1">A Book</Link>
                    {/* Link is used to define html link which won't refresh the application if link is click as it does if (a hyperlink) tag is used. */}
                </li>
                <li>
                    <Link to="/products/p2">A Carpet</Link>
                    {/* This won't apply any CSS of the element. */}
                </li>
                <li>
                    <Link to="/products/p3">An Online Course</Link>
                </li>
            </ul>
        </section>
    )
}

export default Products;