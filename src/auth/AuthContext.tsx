// src/auth/AuthContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth, db } from "../lib/firebase";

type AuthCtx = { uid: string | null; isAdmin: boolean; loading: boolean };
const Ctx = createContext<AuthCtx>({ uid: null, isAdmin: false, loading: true });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [uid, setUid] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
            if (user) {
                setUid(user.uid);
                const snap = await getDoc(doc(db, "admins", user.uid));
                setIsAdmin(snap.exists());
            } else {
                setUid(null);
                setIsAdmin(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = useMemo(() => ({ uid, isAdmin, loading }), [uid, isAdmin, loading]);
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useAuth = () => useContext(Ctx);