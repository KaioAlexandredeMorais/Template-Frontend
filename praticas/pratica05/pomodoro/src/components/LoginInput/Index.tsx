import { forwardRef, type InputHTMLAttributes } from 'react'
import styles from './styles.module.css'

type LoginInputProps = InputHTMLAttributes<HTMLInputElement> & {
    id: string
    label: string
}

export const LoginInput = forwardRef<HTMLInputElement, LoginInputProps>(
    ({ id, label, ...rest }, ref) => {
        return (
            <div className={styles.inputGroup}>
                <label htmlFor={id} className={styles.label}>
                {label}
                </label>
                <input
                id={id}
                ref={ref}
                className={styles.input}
                {...rest}
                />
            </div>
        )
    }
)