import useWindowStore from "../store/window"

const WindowControls = ({ target }: any) => {
  const { closeWindow } = useWindowStore() as any


  return (
    <div id="window-controls">
        <div className="close" onClick={() => closeWindow(target)} />
        <div className="minimize" />
        <div className="maximize" />
    </div>
  )
}

export default WindowControls