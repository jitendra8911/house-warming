export type RsvpStatus = "going" | "not_going" | "maybe";

export interface Rsvp {
    id?: string;            // doc id
    name: string;
    email?: string;
    phone?: string;

    status: RsvpStatus;     // going | not_going | maybe
    additionalGuests?: number;

    // NEW optional arrival info (only meaningful when status === "going")
    arrivalAirport?: string;
    arrivalDate?: string;   // ISO yyyy-mm-dd
    arrivalTime?: string;   // HH:mm

    note?: string;          // optional notes for not_going/maybe
    createdAt?: number;
    updatedAt?: number;
}
