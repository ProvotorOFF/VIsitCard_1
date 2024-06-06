import './CardButton.css'

export default function CardButton({ children, className, ...props }) {
	return <button {...props} className={`card-button ${className}`}>{children}</button>
}