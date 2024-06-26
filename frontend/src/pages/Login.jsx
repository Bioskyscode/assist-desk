import { useEffect, useState } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { login, reset } from "../features/auth/authSlice"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
            toast.clearWaitingQueue()
        }

        // Redirect user when logged in
        if (isSuccess || user) {
            toast.success(`You are now logged in as ${user.name}`)
            toast.clearWaitingQueue()
            navigate("/")
        }

        dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email,
            password
        }
        dispatch(login(userData))
    }

    if (isLoading) {
        <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Please login to get support</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>

                    <div className="form-group">
                        <input type="email" className="form-control" id="email"
                            name="email" value={email} onChange={onChange}
                            placeholder="Enter your email" required
                        />
                    </div>

                    <div className="form-group">
                        <input type="password" className="form-control" id="password"
                            name="password" value={password} onChange={onChange}
                            placeholder="Enter your password" required
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login