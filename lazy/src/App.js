import { Link,Redirect } from 'react-router-dom';
import Routes from './Routes';

require('dotenv').config()
require("./App.css");

function App() {
  return (
    <div className="App" >
      
<div className="bg">
        <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
  <header class="mb-auto">
    <div>
      <h1 class="float-md-start mb-0">Lazy Market</h1>
    </div>
  </header>

  <main class="px-3">
    <div>
    <h1 className="h">Lazy Market</h1>
    <p class="lead main_bac">Your Shopping Journey Start from here!!! <hr /> What you waiting for?</p>
    <p class="lead">
      <Link  class="btn btn-lg btn-secondary fw-bold border-white bg-white font-1" to="/home">Let's go</Link>
    </p>
    </div>
  </main>

  <footer class="mt-auto text-white-50">
     </footer>
</div>

</div>

      </div>
  )

}

export default App;/*

<div className="bg">
        <h1 color="#ffffff">Lazy Market</h1>
      </div>*/