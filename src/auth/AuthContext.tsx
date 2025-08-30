// src/auth/AuthContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged,  } from "firebase/auth";
import { auth, db } from "../lib/firebase";

type AuthCtx = { uid: string | null; isAdmin: boolean; loading: boolean };
const Ctx = createContext<AuthCtx>({ uid: null, isAdmin: false, loading: true });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [uid, setUid] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUid(user.uid);
                try {
                    const snap = await getDoc(doc(db, "admins", user.uid));
                    setIsAdmin(snap.exists());
                    console.log("[AUTHCTX] user is", user.uid, "admin:", snap.exists());
                } catch (err) {
                    console.warn("[AUTHCTX] admin check failed:", err);
                    setIsAdmin(false);
                }
            } else {
                setUid(null);
                setIsAdmin(false);
                console.log("[AUTHCTX] no user");
            }
            setLoading(false); // Set loading to false after the state is determined
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const value = useMemo(() => ({ uid, isAdmin, loading }), [uid, isAdmin, loading]);
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useAuth = () => useContext(Ctx);