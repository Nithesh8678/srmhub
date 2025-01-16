import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  QueryConstraint,
  setDoc,
} from "firebase/firestore";
import { db } from "./config";
import { Event, EventFormData } from "../types/event";

// Collection References
const eventsRef = collection(db, "events");
const registrationsRef = collection(db, "registrations");

// Event Operations
export const addEvent = async (eventData: EventFormData) => {
  try {
    const docRef = await addDoc(eventsRef, {
      ...eventData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding event:", error);
    throw error;
  }
};

export const updateEvent = async (
  eventId: string,
  eventData: Partial<EventFormData>
) => {
  try {
    const eventRef = doc(db, "events", eventId);
    await updateDoc(eventRef, {
      ...eventData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export const deleteEvent = async (eventId: string) => {
  try {
    await deleteDoc(doc(db, "events", eventId));
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

export const getEvent = async (eventId: string) => {
  try {
    const eventDoc = await getDoc(doc(db, "events", eventId));
    if (eventDoc.exists()) {
      return { id: eventDoc.id, ...eventDoc.data() } as Event;
    }
    return null;
  } catch (error) {
    console.error("Error getting event:", error);
    throw error;
  }
};

export const getEvents = async (constraints: QueryConstraint[] = []) => {
  try {
    const q = query(eventsRef, ...constraints, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Event)
    );
  } catch (error) {
    console.error("Error getting events:", error);
    throw error;
  }
};

// Event Registration Operations
export const registerForEvent = async (eventId: string, userId: string) => {
  try {
    // Check if already registered
    const existingRegistration = await getDocs(
      query(
        registrationsRef,
        where("eventId", "==", eventId),
        where("userId", "==", userId)
      )
    );

    if (!existingRegistration.empty) {
      throw new Error("Already registered for this event");
    }

    // Add new registration
    await addDoc(registrationsRef, {
      eventId,
      userId,
      registeredAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error registering for event:", error);
    throw error;
  }
};

export const getEventRegistrations = async (eventId: string) => {
  try {
    const q = query(registrationsRef, where("eventId", "==", eventId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting event registrations:", error);
    throw error;
  }
};

export const getUserRegistrations = async (userId: string) => {
  try {
    const q = query(registrationsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting user registrations:", error);
    throw error;
  }
};

interface UserProfile {
  displayName: string;
  email: string;
  bio: string;
  phone: string;
  updatedAt: string;
  notificationPreferences: {
    eventUpdates: boolean;
    newNotices: boolean;
    registrationConfirmations: boolean;
  };
}

export const updateUserProfile = async (
  userId: string,
  data: Partial<UserProfile>
) => {
  try {
    const userRef = doc(db, "userProfiles", userId);
    await setDoc(
      userRef,
      {
        ...data,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const getUserProfile = async (
  userId: string
): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, "userProfiles", userId);
    const docSnap = await getDoc(userRef);
    return docSnap.exists() ? (docSnap.data() as UserProfile) : null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};
