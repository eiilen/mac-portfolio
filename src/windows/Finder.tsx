import { Search } from "lucide-react"
import WindowControls from "../components/WindowControls"
import WindowWrapper from "../hoc/WindowWrapper"
import { locations } from "../constants"
import useLocationStore from "../store/location"
import useWindowStore from "../store/window"

const Finder = () => {
  const { openWindow } = useWindowStore() as any
  const { activeLocation, setActiveLocation } = useLocationStore() as any
  const openItem = (item: any) => {
    if (item.fileType === 'pdf') return openWindow("resume")
    if (item.kind === 'folder') return setActiveLocation(item)
    if (['fig', 'url'].includes(item.fileType) && item.href) return window.open(item.href, "_blank")
    
    openWindow(`${item.fileType}${item.kind}`, item)
}
  const renderList = (items: any[]) => items.map((item) => (
          <li key={item.id} className={item.id === activeLocation.id ? "active" : "not-active"}
            onClick={() => setActiveLocation(item)}>
            <img src={item.icon} className="w-4" alt={item.name} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
  ))
  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          <div>
            <h3>Favorites</h3>
            <ul>{renderList(Object.values(locations))}</ul>
          </div>

          <div>
            <h3>Work</h3>
            <ul>{renderList(locations.work.children)}</ul>
          </div>
        </div>

        <ul className="content">
          {activeLocation?.children.map((item: any) => (
            <li key={item.id} className={item.position}
              onClick={() => openItem(item)}>
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

const FinderWindow = WindowWrapper(Finder, "finder")

export default FinderWindow