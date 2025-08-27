// functions/src/index.ts
import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const resetRsvps = onCall(async (request) => {
    const uid = request.auth?.uid;              // ✅ v2 puts auth on request
    if (!uid) {
        throw new HttpsError("unauthenticated", "You must be signed in");
    }

    const isAdmin = (await db.doc(`admins/${uid}`).get()).exists;
    if (!isAdmin) {
        throw new HttpsError("permission-denied", "Admins only");
    }

    const snap = await db.collection("rsvps").get();
    const batch = db.batch();
    snap.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();

    return { ok: true, count: snap.size };
});
