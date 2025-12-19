import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "../constants"

const useWindowStore = create(
    immer((set) => ({
        windows: WINDOW_CONFIG,
        nextZIndex: INITIAL_Z_INDEX + 1,

        openWindow: (windowKey: string, data = null) => set((state: any) => {
            const win = state.windows[windowKey]
            if (!win) return
            win.isOpen = true
            win.zIndex = state.nextZIndex
            win.data = data ?? win.data
            
            state.nextZIndex++
        }),
        
        closeWindow: (windowKey: string) => set((state: any) => {
            const win = state.windows[windowKey]
            if (!win) return
            win.isOpen = false
            win.zIndex = INITIAL_Z_INDEX
            win.data = null
        }),
        
        focusWindow: (windowKey: string) => set((state: any) => {
            const win = state.windows[windowKey]
            win.zIndex = state.nextZIndex++
        })
    }))
)

export default useWindowStore