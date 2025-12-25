// hooks/index.ts
import { AppDispatch, RootState } from "@/lib/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import type { RootState, AppDispatch } from "@/app/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
