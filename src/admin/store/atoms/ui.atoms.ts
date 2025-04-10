
import { atom } from 'jotai';

// UI visibility state
export const mainNavHiddenAtom = atom<boolean>(false);
export const iconOnlyModeAtom = atom<boolean>(false);
export const aiPanelVisibleAtom = atom<boolean>(false);
export const effectsPanelVisibleAtom = atom<boolean>(false);
export const recordingAtom = atom<boolean>(false);
export const frozenZonesAtom = atom<string[]>([]);

// Quick bar state
export const quickBarItemsAtom = atom<string[]>(["Users", "Roles", "Themes", "Settings"]);

// Drag and drop atoms
export const dragSourceAtom = atom<string | null>(null);
export const showDragOverlayAtom = atom<boolean>(false);
export const hoveredIconAtom = atom<string | null>(null);
