import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { api } from '../lib/api'

const useUser = () => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    const login = (email, password) => new Promise(async (resolve, reject) => {
        try {
            const { data: data } = await api.post('/api/v1/rest-auth/login/', { email, password })
            const { user, key } = data;
            resolve(user);
            if (data.key) {
                Cookies.set('token', key, { expires: 60 })
                api.defaults.headers.Authorization = `Token ${key}`
                setUser(user)
                // window.location.pathname = '/dashboard'
                router.push('/dashboard')
            }
        } catch (e) {
            reject(e.response);
        }
    })

    const logout = () => {
        Cookies.remove('token')
        setUser(null)
        delete api.defaults.headers.Authorization
        // window.location.pathname = '/login'
        router.push('/login')
    }

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('token')
            if (token) {
                api.defaults.headers.Authorization = `Token ${token}`
                const { data: user } = await api.get('/api/v1/rest-auth/user/')
                if (user) setUser(user);
            } else {
                router.push('/login')
                return
            }
            setLoading(false)
        }

        loadUserFromCookies()
    }, [])


    return { user, logout, login, loading }
}

export { useUser }