import { createContext, useContext, useReducer, type ReactNode } from 'react'

const MOCK_USER = 'root@pomodoro.com'
const MOCK_PASSWORD = '123456'

type AuthState = {
    isAuthenticated: boolean
    username: string | null
}

type AuthAction =
  | { type: 'LOGIN'; payload: string }
  | { type: 'LOGOUT' }

const initialState: AuthState = {
    isAuthenticated: false,
    username: null,
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'LOGIN':
            return { isAuthenticated: true, username: action.payload }
        case 'LOGOUT':
            return { isAuthenticated: false, username: null }
        default:
            return state
    }
}

type AuthContextType = {
    state: AuthState
    login: (username: string, password: string) => boolean
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthContextProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, initialState)

    function login(username: string, password: string): boolean {
        if (username === MOCK_USER && password === MOCK_PASSWORD) {
            dispatch({ type: 'LOGIN', payload: username })
            return true
        }
        return false
    }

    function logout() {
        dispatch({ type: 'LOGOUT' })
    }

    return (
        <AuthContext.Provider value={{ state, login, logout }}>
        {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de AuthContextProvider')
    }
    return context
}