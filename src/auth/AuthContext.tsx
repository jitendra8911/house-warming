import React, { createContext, useEffect, useMemo, useState, useContext } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import {getDoc, doc} from "firebase/firestore";
type AuthCtx = { user: User | null; loading: boolean; isAdmin: boolean };
const Ctx = createContext<AuthCtx>({ user: null, loading: true, isAdmin: false });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        return onAuthStateChanged(auth, async (u) => {
            setUser(u);
            if (u) {
                // 🔑 Check if UID exists in admins collection
                const snap = await getDoc(doc(db, "admins", u.uid));
                setIsAdmin(snap.exists());
            } else {
                setIsAdmin(false);
            }
            setLoading(false);
        });
    }, []);

    const value = useMemo(() => ({ user, isAdmin, loading }), [user, isAdmin, loading]);
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useAuth = () => useContext(Ctx);
