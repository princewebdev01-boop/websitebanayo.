import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc,
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { InquiryInput } from "./types";

// Dynamic configuration which prioritizes runtime environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAD3UC5BjH5NzpUBQ_1EbofbmbLngodWY4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "quatum-web-code.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "quatum-web-code",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "quatum-web-code.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "474915501781",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:474915501781:web:30666b4bcc29196d49d45c",
  measurementId: "G-W9YS6QNWRK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

// Error handle matching Section 3 of Firebase Integration skill
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write"
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null
    },
    operationType,
    path
  };

  const isRead = operationType === OperationType.GET || operationType === OperationType.LIST;

  if (isRead) {
    console.warn(`[Firestore Safe-Read Fallback] operation:${operationType} path:${path} - error:${errInfo.error}`);
  } else {
    console.error("Firestore Write Error Detailed info: ", JSON.stringify(errInfo));
    throw new Error(JSON.stringify(errInfo));
  }
}

/**
 * INQUIRIES API
 */
export async function submitInquiry(input: InquiryInput): Promise<void> {
  const inquiriesCollectionRef = collection(db, "inquiries");
  const newDocRef = doc(inquiriesCollectionRef);
  
  const payload = {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    company: input.company ? input.company.trim() : "",
    service: input.service,
    projectDetails: input.projectDetails.trim(),
    read: false,
    createdAt: serverTimestamp()
  };

  try {
    await setDoc(newDocRef, payload);
    console.log("Inquiry successfully saved under document ID:", newDocRef.id);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `inquiries/${newDocRef.id}`);
  }
}

export async function getInquiries(): Promise<any[]> {
  const inquiriesCol = collection(db, "inquiries");
  const q = query(inquiriesCol, orderBy("createdAt", "desc"));
  try {
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, "inquiries");
    return [];
  }
}

export async function markInquiryAsRead(id: string, read: boolean): Promise<void> {
  const docRef = doc(db, "inquiries", id);
  try {
    await updateDoc(docRef, { read });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `inquiries/${id}`);
  }
}

export async function deleteInquiry(id: string): Promise<void> {
  const docRef = doc(db, "inquiries", id);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `inquiries/${id}`);
  }
}

/**
 * PROJECTS API
 */
export async function getProjects(): Promise<any[]> {
  const projectsCol = collection(db, "projects");
  try {
    const snapshot = await getDocs(projectsCol);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, "projects");
    return [];
  }
}

export async function saveProject(project: any): Promise<void> {
  const docRef = doc(db, "projects", project.id);
  try {
    await setDoc(docRef, {
      ...project,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `projects/${project.id}`);
  }
}

export async function deleteProject(id: string): Promise<void> {
  const docRef = doc(db, "projects", id);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `projects/${id}`);
  }
}

/**
 * TESTIMONIALS API
 */
export async function getTestimonials(): Promise<any[]> {
  const testimonialsCol = collection(db, "testimonials");
  try {
    const snapshot = await getDocs(testimonialsCol);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, "testimonials");
    return [];
  }
}

export async function saveTestimonial(testimonial: any): Promise<void> {
  const docRef = doc(db, "testimonials", testimonial.id);
  try {
    await setDoc(docRef, {
      ...testimonial,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `testimonials/${testimonial.id}`);
  }
}

export async function deleteTestimonial(id: string): Promise<void> {
  const docRef = doc(db, "testimonials", id);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `testimonials/${id}`);
  }
}

/**
 * WEBSITE CONTENT API
 */
export async function getSiteContent(id: string): Promise<any | null> {
  const docRef = doc(db, "siteContent", id);
  try {
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `siteContent/${id}`);
    return null;
  }
}

export async function saveSiteContent(id: string, content: any): Promise<void> {
  const docRef = doc(db, "siteContent", id);
  try {
    await setDoc(docRef, {
      id,
      ...content,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `siteContent/${id}`);
  }
}
