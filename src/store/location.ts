import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations } from "../constants";

const DEFAULT_LOCATION = locations.work

const useLocationStore = create(
    immer((set) => ({
        activeLocation: DEFAULT_LOCATION, 

        setActiveLocation: (location: any) => 
            set((state: any) => {
                if (location === undefined) return
                state.activeLocation = location
            }),

        resetActiveLocation: () => 
            set((state: any) => {
                state.activeLocation = DEFAULT_LOCATION
            })
    }))
)

export default useLocationStore