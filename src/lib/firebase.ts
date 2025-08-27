// src/lib/firebase.ts
import { initializeApp, getApp, getApps } from "firebase/app";
import {
    getAuth,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    inMemoryPersistence,
    GoogleAuthProvider,
    signInWithRedirect,
    getRedirectResult,
    onAuthStateChanged,
    signOut,
    signInWithPopup,
    type User,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC_kD-M-V6s04DM5yz1P5zEzCUv3mpz1RM",
    authDomain: "house-warming-cbdc3.firebaseapp.com",
    projectId: "house-warming-cbdc3",
    storageBucket: "house-warming-cbdc3.firebasestorage.app",
    messagingSenderId: "334452702301",
    appId: "1:334452702301:web:9bde7b338e9e26ee2b61b4",
    measurementId: "G-20L23L60R1"
};

// ✅ ensure single instance (prevents HMR double-inits)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// ✅ persistence with safe fallbacks (handles Safari/ITP/private mode)
(async () => {
    try {
        await setPersistence(auth, browserLocalPersistence);
        console.log("[AUTH] persistence=local");
    } catch {
        try {
            await setPersistence(auth, browserSessionPersistence);
            console.log("[AUTH] persistence=session");
        } catch {
            await setPersistence(auth, inMemoryPersistence);
            console.log("[AUTH] persistence=memory");
        }
    }
})();

// TEMP: log auth state changes
onAuthStateChanged(auth, (u) => {
    console.log(
        "[AUTH] state:",
        u ? `uid=${u.uid}; providers=${u.providerData.map(p=>p.providerId).join(",")}` : "null"
    );
});

const provider = new GoogleAuthProvider();

export function adminLoginWithGoogleRedirect() {
    console.log("[AUTH] start redirect");
    return signInWithRedirect(auth, provider);
}

// ✅ process redirect FIRST, then wait for first auth event
export async function completeGoogleRedirectIfAny(): Promise<User | null> {
    try {
        const res = await getRedirectResult(auth);
        console.log("[AUTH] redirect result:", res?.user ? `uid=${res.user.uid}` : "none");
    } catch (e) {
        console.warn("[AUTH] redirect error:", e);
    }
    return await new Promise((resolve) => {
        const off = onAuthStateChanged(auth, (u) => {
            off();
            resolve(u ?? null);
        });
    });
}

export function logout() {
    console.log("[AUTH] signOut()");
    return signOut(auth);
}