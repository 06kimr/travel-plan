import { addDays, differenceInDays } from "date-fns";
import { FunctionComponent } from "react";
import { create } from "zustand";
import { Place } from "./types";

export interface PlanState {
  startDate: Date | null;
  endDate: Date | null;
  status: "period_edit" | "planning";
  dailyTimes: { startTime: string; endTime: string; date: Date }[];
  plannedPlaces: {
    place: Place;
    duration: number; //minutes
  }[];
  plannedAccommodations: Array<Place | null>;
}

type Action = {
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  setStatus: (status: PlanState["status"]) => void;
  setDailyTime: (
    index: number,
    time: string,
    type: "startTime" | "endTime"
  ) => void;
  addPlannedPlace: (place: Place, duration: number) => void;
  removePlannedPlace: (index: number) => void;
  setDurationForPlannedPlace: (index: number, duration: number) => void;
  addPlannedAccommodation: (place: Place) => void;
  removePlannedAccommodation: (index: number) => void;
};

export const usePlanStore = create<PlanState & Action>()((set, get) => ({
  startDate: null,
  endDate: null,
  status: "period_edit",
  dailyTimes: [],
  plannedPlaces: [],
  plannedAccommodations: [],

  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => {
    if (date) {
      const startDate = get().startDate!;
      const diff = differenceInDays(date, startDate) + 1;
      const dailyTimes = Array.from({ length: diff }, (_, i) => {
        return {
          startTime: "10:00",
          endTime: "22:00",
          date: addDays(startDate, i),
        };
      });
      set({
        dailyTimes,
        endDate: date,
        plannedAccommodations: Array.from({ length: diff - 1 }, () => null),
      });
    } else {
      set({ endDate: date, dailyTimes: [], plannedAccommodations: [] });
    }
  },
  setStatus: (status) => set({ status }),
  setDailyTime: (index, time, type) => {
    set((state) => ({
      dailyTimes: state.dailyTimes.map((dailyTime, i) =>
        i === index ? { ...dailyTime, [type]: time } : dailyTime
      ),
    }));
  },
  addPlannedPlace: (place: Place, duration: number) =>
    set((prev) => ({
      plannedPlaces: [...prev.plannedPlaces, { place, duration }],
    })),
  removePlannedPlace: (index) =>
    set((prev) => ({
      plannedPlaces: prev.plannedPlaces.filter((_, i) => i !== index),
    })),
  setDurationForPlannedPlace: (index: number, duration: number) =>
    set((prev) => ({
      plannedPlaces: prev.plannedPlaces.map((place, i) =>
        i === index ? { ...place, duration } : place
      ),
    })),
  addPlannedAccommodation: (place: Place) =>
    set((prev) => {
      const index = prev.plannedAccommodations.findIndex((p) => p === null);
      if (index === -1) return prev;
      return {
        plannedAccommodations: prev.plannedAccommodations.map((p, i) =>
          i === index ? place : p
        ),
      };
    }),
  removePlannedAccommodation: (index: number) =>
    set((prev) => ({
      plannedAccommodations: prev.plannedAccommodations.map((p, i) =>
        i === index ? null : p
      ),
    })),
}));

interface ModalState {
  modals: FunctionComponent<{ onClose: () => void }>[];
}

type ModalAction = {
  openModal: (modal: FunctionComponent<{ onClose: () => void }>) => void;
  closeModal: (index: number) => void;
  clearModals: () => void;
};

export const useModalStore = create<ModalState & ModalAction>()((set) => ({
  modals: [],
  openModal: (modal) =>
    set((state) => ({
      modals: [...state.modals, modal],
    })),
  closeModal: (index) =>
    set((state) => ({ modals: state.modals.filter((_, i) => i !== index) })),
  clearModals: () => set({ modals: [] }),
}));
