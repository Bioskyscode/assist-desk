import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutReset, logout } from '../features/auth/authSlice'
import { toast } from 'react-toastify'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)
    
    const onLogout = () => {
        try {
            dispatch(logout())
            dispatch(logoutReset())
            navigate("/")
            toast.success(`${user.name}, you are now logged out`)
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <header className='header'>
            <div className='logo'>
                <Link to="/">Support Desk</Link>
                
            </div>
            <ul>
                {user ? <div className='userName'>{user.name}<button className='btn' onClick={onLogout}> <FaSignOutAlt /> Logout</button></div> 
                : <>
                <li>
                    <Link to="/login"><FaSignInAlt /> Login</Link>
                </li>
                <li>
                    <Link to="/register"><FaUser /> Register</Link>
                </li> 
                </>
                
                }
            </ul>
        </header>
    )
}

export default Header
