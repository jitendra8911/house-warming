// src/auth/AuthContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth, db } from "../lib/firebase";
// import { completeGoogleRedirectIfAny } from "../lib/firebase";

type AuthCtx = { uid: string | null; isAdmin: boolean; loading: boolean };
const Ctx = createContext<AuthCtx>({ uid: null, isAdmin: false, loading: true });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [uid, setUid] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let alive = true;

        (async () => {
            try {
                // 1) Finish Google redirect handshake if we just returned from Google
                // const redirectedUser = await completeGoogleRedirectIfAny();
                if (!alive) return;

                // 2) Now wait for the FIRST auth state event (authoritative)
                const firstUser: User | null = await new Promise((resolve) => {
                    const off = onAuthStateChanged(auth, (u) => {
                        off();
                        resolve(u);
                    });
                });
                if (!alive) return;

                // 3) Update uid and admin status
                if (firstUser) {
                    setUid(firstUser.uid);
                    try {
                        const snap = await getDoc(doc(db, "admins", firstUser.uid));
                        setIsAdmin(snap.exists());
                        console.log("[AUTHCTX] user is", firstUser.uid, "admin:", snap.exists());
                    } catch (err) {
                        console.warn("[AUTHCTX] admin check failed:", err);
                        setIsAdmin(false);
                    }
                } else {
                    setUid(null);
                    setIsAdmin(false);
                    console.log("[AUTHCTX] no user after redirect/state");
                }
            } finally {
                if (alive) setLoading(false);
            }
        })();

        return () => { alive = false; };
    }, []);

    const value = useMemo(() => ({ uid, isAdmin, loading }), [uid, isAdmin, loading]);
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useAuth = () => useContext(Ctx);
