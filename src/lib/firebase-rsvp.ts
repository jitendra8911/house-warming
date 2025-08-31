import {
    collection, doc, getDocs, query, where, setDoc,
      deleteDoc
} from "firebase/firestore";
import { db,  } from "./firebase";
import type { Rsvp } from "../types/rsvp";

const RSVPS = "rsvps";

export async function saveRsvp(data: Rsvp) {
    // If you already have an id policy, keep it; here we use name+email key fallback
    const key = (data.email?.toLowerCase() || data.name.toLowerCase()).replace(/\s+/g, "_");
    const ref = doc(db, RSVPS, key);
    const payload: Partial<Rsvp> = {
        ...data,
        updatedAt: Date.now(),
    };
    // ensure createdAt set once
    await setDoc(ref, { createdAt: Date.now(), ...payload }, { merge: true });
}

export async function listGoingRsvps(): Promise<Rsvp[]> {
    const q = query(collection(db, RSVPS), where("status", "==", "going"));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...(d.data() as Rsvp) }));
}

export async function resetAllRsvps() {
    const snap = await getDocs(collection(db, RSVPS));
    // const snap = await getDocs(collection(db, "rsvps"));
    await Promise.all(snap.docs.map(d => deleteDoc(doc(db, "rsvps", d.id))));
}

