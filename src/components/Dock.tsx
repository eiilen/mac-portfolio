import { Tooltip } from "react-tooltip"
import { useRef } from "react"
import { dockApps } from "../constants"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import useWindowStore from "../store/window"

const Dock = () => {
    const { openWindow, closeWindow, windows } = useWindowStore() as any
    const dockRef = useRef(null)

    useGSAP(() => {
        const dock = dockRef.current as any
        if(!dock) return () => {}

        const icons = dock.querySelectorAll(".dock-icon")

        const animateIcons = (mouseX: any) => {
            const {left} = dock.getBoundingClientRect()

            icons.forEach((icon: any) => {
                const {left: iconLeft, width} = icon.getBoundingClientRect()
                const center = iconLeft - left + width / 2
                const distance = Math.abs(mouseX - center)
                const intensity = Math.exp(-(distance ** 2.5) / 20000)

                gsap.to(icon, {
                    scale: 1 + 0.25 * intensity,
                    y: -15 * intensity,
                    duration: 0.2,
                    ease: 'power1.out'
                })
            })
        }

        const handleMouseMove = (e: any) => {
            const {left} = dock.getBoundingClientRect()

            animateIcons(e.clientX - left)
        }

        const resetIcons = () => icons.forEach((icon: any) => {
            gsap.to(icon, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: 'power1.out'
            })
        });

        dock.addEventListener("mousemove", handleMouseMove)
        dock.addEventListener("mouseleave", resetIcons)
        
        return () => {
            dock.removeEventListener("mousemove", handleMouseMove)
            dock.removeEventListener("mouseleave", resetIcons)
        }
    }, [])

    const toggleApp = (app: any) => {
        if (!app.canOpen) return

        const window = windows[app.id]

        if (!window) return
        
        if (window.isOpen) {
            closeWindow(app.id)
        } else {
            openWindow(app.id)
        }
    }
  return (
    <section id="dock">
        <div ref={dockRef} className="dock-container">
            {dockApps.map((app) => (
                <div key={app.id} className="relative flex justify-center">
                    <button type="button" className="dock-icon"
                        aria-label={app.name}
                        data-tooltip-id="dock-tooltip"
                        data-tooltip-content={app.name}
                        data-tooltip-delay-show={150}
                        disabled={!app.canOpen}
                        onClick={() => toggleApp({id: app.id, canOpen: app.canOpen})}
                        >
                        <img src={`/images/${app.icon}`} alt={app.name} loading="lazy" className={app.canOpen ? '' : 'opacity-60'} />
                    </button>
                </div>
            ))}

            <Tooltip id="dock-tooltip" place="top" className="tooltip" />
        </div>
    </section>
  )
}

export default Dock