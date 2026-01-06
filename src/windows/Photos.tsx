import { Mail, Search } from "lucide-react"
import WindowControls from "../components/WindowControls"
import WindowWrapper from "../hoc/WindowWrapper"
import useWindowStore from "../store/window"
import { gallery, photosLinks } from "../constants"

const Photos = () => {
  const { openWindow } = useWindowStore() as any
  return (
    <>
    <div id="window-header">
      <WindowControls target="photos" />
      <div className="w-full flex justify-end items-center gap-3 text-gray-500">
        <Mail className="icon" />
        <Search className="icon" />
      </div>
    </div>

    <div className="flex w-full">
      <div className="sidebar">
        <h2>Photos</h2>

        <ul>
          {photosLinks.map((photo) => (
            <li key={photo.id}>
              <img src={photo.icon} alt={photo.icon} />
              <p>{photo.title}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="gallery">
          <ul>
            {gallery.map((photo) => (
              <li key={photo.id} onClick={() => openWindow("imgfile", {id: photo.id, name: "Gallery image", icon: "images/image.png", kind: "file", fileType: "img", imageUrl: photo.img})}>
                <img src={photo.img} alt={`gallery image ${photo.id}`} />
              </li>
            ))}
          </ul>
      </div>
    </div>
    </>
  )
}

const PhotosWindow = WindowWrapper(Photos, "photos")

export default PhotosWindow