import React from "react"
import { Link, useNavigate } from "react-router-dom"

const Nav = () => {
    const auth = localStorage.getItem('user')
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        alert("Logout Succesfull")
        navigate('/signup')
    }
    const update = () => {
      navigate('/')
    }
    return (
        <div className="nav-ul">
            <img
            alt='logo'
            className="logo1"
            src='https://d1csarkz8obe9u.cloudfront.net/posterpreviews/e-commerce-logo-design-template-5dcf2e4daab6379d4824c6dc04e26f17_screen.jpg?ts=1645336764'/>
            
            {auth ? <ul >
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link onClick={update} to="/">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <Link style={{color: 'bisque', textDecoration:'none'}} onClick={logout} to="/signup">Logout</Link>
            </ul> :
                <ul><li><Link to="/signup">Sign up</Link></li>
                    <li><Link to="/login">login</Link></li></ul>
            }
        </div>
    )
}
export default Nav