import WindowControls from "../components/WindowControls"
import { socials } from "../constants"
import WindowWrapper from "../hoc/WindowWrapper"

const Contact = () => {
  return (
    <>
    <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
    </div>

    <div className="p-5 space-y-5">
        <img src="/images/hua_cheng_4.png" alt="huacheng" className="w-20 rounded-b-full" />
        
        <h3>Let's Connect</h3>
        <p>Got shrines to burn? Heavenly officials to challenge? I'm in. But I only prioritize gege</p>
        <p>huacheng@communication.array</p>

        <ul>
            {socials.map((item) => (
                <li key={item.id} style={{ background: item.bg }}>
                    <a href={item.link} target="_blank" rel="noopener noreferer" title={item.text}> 
                        <img src={item.icon} alt={item.text} className="size-5" />
                        <p>{item.text}</p>
                    </a>
                </li>
            ))}
        </ul>
    </div>

    </>
  )
}

const ContactWindow = WindowWrapper(Contact, "contact")

export default ContactWindow