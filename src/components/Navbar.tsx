import dayjs from 'dayjs'
import { navIcons, navLinks } from '../constants'

const Navbar = () => {
  return (
    <nav>
        <div>
            <img src='/images/logo.svg' />
            <p className='font-bold'>Hua Cheng's Portfolio</p>

            <ul>
                {navLinks.map((item) => (
                    <li key={item.id}>
                        <p>{item.name}</p>
                    </li>
                ))}
            </ul>
        </div>

        <div>
            <ul>
                {navIcons.map((icon) => (
                    <li key={icon.id}>
                        <img src={icon.img} className='icon-hover' alt={`icon-${icon.id}`} />
                    </li>
                ))}
            </ul>

            <time>{dayjs().format('ddd MMM D h:mm A')}</time>
        </div>
    </nav>
  )
}

export default Navbar