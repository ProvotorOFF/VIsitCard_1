import styles from './Header.module.css'
import logo from '../../assets/logo.svg'
import SelectUser from '../SelectUser/SelectUser'

export default function Header() {
	return (
		<>
			<img className={styles.logo} src={logo} alt='Логотип журнала'></img>
			<SelectUser />
		</>

	)
}