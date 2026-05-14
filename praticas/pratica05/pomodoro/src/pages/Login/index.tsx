import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'
import { LoginInput } from '../../components/LoginInput/Index'
import styles from './styles.module.css'

type ViewMode = 'login' | 'register' | 'recover'

export function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [feedback, setFeedback] = useState('')
    const [feedbackType, setFeedbackType] = useState<'success' | 'error' | 'info'>('info')
    const [viewMode, setViewMode] = useState<ViewMode>('login')
    const [isLoading, setIsLoading] = useState(false)
    const usernameRef = useRef<HTMLInputElement>(null)
    const { login } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        usernameRef.current?.focus()
    }, [viewMode])

    useEffect(() => {
        if (!feedback) return
        const timer = setTimeout(() => setFeedback(''), 2000)
        return () => clearTimeout(timer)
    }, [feedback])

    function handleLoginSubmit(event: React.FormEvent) {
        event.preventDefault()

        if (!username || !password) {
            setFeedback('Preencha todos os campos.')
            setFeedbackType('error')
            return
        }

        setIsLoading(true)

        setTimeout(() => {
            const success = login(username, password)

            if (success) {
                setFeedback('Login realizado com sucesso! Aguarde...')
                setFeedbackType('success')
                setTimeout(() => navigate('/home'), 1000)
            } else {
                setFeedback('Usuário ou senha incorretos.')
                setFeedbackType('error')
            }

            setIsLoading(false)
        }, 800)
    }

    if (viewMode === 'register') {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Criar conta</h1>
                    <p className={styles.simulationText}>
                        Em progresso...
                    </p>
                    <button
                        className={styles.linkButton}
                        onClick={() => setViewMode('login')}
                    >
                        ← Voltar
                    </button>
                </div>
            </div>
        )
    }

    if (viewMode === 'recover') {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Recuperar senha</h1>
                    <p className={styles.simulationText}>
                        Em progresso...
                    </p>
                    <button
                        className={styles.linkButton}
                        onClick={() => setViewMode('login')}
                    >
                        ← Voltar
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Chronos Pomodoro</h1>

                <form onSubmit={handleLoginSubmit} className={styles.form} noValidate>
                    <LoginInput
                        ref={usernameRef}
                        id="username"
                        label="E-mail"
                        type="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="usuario@pomodoro.com"
                        disabled={isLoading}
                    />

                    <LoginInput
                        id="password"
                        label="Senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••"
                        disabled={isLoading}
                    />

                    {/* Feedback */}
                    {feedback && (
                        <p className={`${styles.feedback} ${styles[feedbackType]}`}>
                        {feedback}
                        </p>
                    )}

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isLoading}
                        aria-label="Entrar no sistema"
                    >
                        {isLoading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <div className={styles.links}>
                    <button
                        className={styles.linkButton}
                        onClick={() => setViewMode('recover')}
                    >
                        Esqueci minha senha
                    </button>
                    <button
                        className={styles.linkButton}
                        onClick={() => setViewMode('register')}
                    >
                        Criar conta
                    </button>
                </div>
            </div>
        </div>
    )
}