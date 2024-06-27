import { Link } from "react-router-dom"


const Header = () => {
  return (
    <nav className="">
        <Link to={"/"}>
         <img src="./logo.png" alt="logo" className="h-20" />
        </Link>
        <div>
            
        </div>
    </nav>
  )
}

export default Header