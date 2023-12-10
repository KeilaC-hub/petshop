import { NavLink } from 'react-router-dom';

import { useAuthentication } from '../hooks/useAuthentication';

import { useAuthValue } from '../context/AuthContext';

import styles from './Navbar.module.css'

const NavbarComponent = () => {
    const {user} = useAuthValue();
    const {logout} = useAuthentication();

  return (
    
    <nav className={styles.navbar}>
        <NavLink to='/' className={styles.brand}>
            <strong>Petshop</strong>
        </NavLink>
        <ul className={styles.link_list}>
            <li>
                <NavLink to='/'className={({isActive}) => (isActive ? styles.active : '')}>Home</NavLink>
            </li>
            {!user && (
                <>
                <li>
                    <NavLink to='/login'className={({isActive}) => (isActive ? styles.active : '')}>Entrar</NavLink>
                </li> 
                <li>
                    <NavLink to='/register'className={({isActive}) => (isActive ? styles.active : '')}>Cadastrar</NavLink>
                </li> 
                </>                  
            )}  
            {user && (
                <>
                <li>
                    <NavLink to='/posts/create'className={({isActive}) => (isActive ? styles.active : '')}>Novo cadastro</NavLink>
                </li> 
                <li>
                    <NavLink to='/dashboard'className={({isActive}) => (isActive ? styles.active : '')}>Cadastros</NavLink>
                </li> 
                </>                
            )}                    
            {user && (
                <li>
                    <button onClick={logout}>Sair</button>
                </li>
            )}
        </ul>
    </nav>
  )
}

export default NavbarComponent