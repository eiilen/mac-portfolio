import dayjs from 'dayjs'
import { locations, navIcons, navLinks } from '../constants'
import useWindowStore from '../store/window'
import useLocationStore from '../store/location'

const Navbar = () => {
    const { openWindow } = useWindowStore() as any
    const { setActiveLocation } = useLocationStore() as any
    const handleClick = (type: string) => {
        if (type === "finder") { setActiveLocation(locations.work) }
        openWindow(type)
    }
  return (
    <nav>
        <div>
            <img src='/images/logo.svg' />
            <p className='font-bold'>Hua Cheng's Portfolio</p>

            <ul>
                {navLinks.map((item) => (
                    <li key={item.id} onClick={() => handleClick(item.type)}>
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