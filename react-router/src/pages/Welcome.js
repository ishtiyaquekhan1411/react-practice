import { Route } from 'react-router-dom';

const Welcome = () => {
  return (
    <section>
      <h1>The Welcome page</h1>
      <Route path="/welcome/new-user">
        {/* Nested route, we need to specify full path to ensure it will be loaded and below content will be displayed. */}
        <p>Welcome, New User!</p>
      </Route>
    </section>
  )
}

export default Welcome;