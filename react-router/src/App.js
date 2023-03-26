import { Route, Switch, Redirect } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Products from './pages/Products';
import MainHeader from './components/MainHeader';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <div>
      <MainHeader />
      <main>
        <Switch>
          {/* Switch tells router to only render first component from matched route, eg. either /products or /products/:productId. */}
          <Route path="/" exact>
            <Redirect to="/welcome" />
            {/* Redirect will redirect the url to the path provided in the option. */}
            {/* exact is important here, otherwise every route will be match and it will be infinite and incorrect. */}
          </Route>
          <Route path="/welcome" >
            {/* Route is used to define route for react */}
            <Welcome />
          </Route>
          <Route path="/products" exact>
            {/* exact tells react route to only match if /products is entered in URL. not any wildcard like /products/12 */}
            <Products />
          </Route>
          <Route path="/products/:productId" >
            {/* :/productId is dynamic params which can be searched in respective component using useParams. */}
            <ProductDetail />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
