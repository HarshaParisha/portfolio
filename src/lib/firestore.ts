import {
  initializeApp,
  getApps,
  cert,
  applicationDefault,
} from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// Robust Firebase Admin initialization
let adminApp: any;
try {
  if (getApps().length === 0) {
    // Prefer a JSON service account string if provided
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      try {
        const sa = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        adminApp = initializeApp({ 
          credential: cert(sa),
          projectId: 'onestopai-subscribers' // Your Firebase project ID
        });
        console.log('Firebase Admin initialized from FIREBASE_SERVICE_ACCOUNT JSON');
      } catch (err) {
        console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT JSON:', err);
        throw err;
      }
    } else if (
      process.env.FIREBASE_PRIVATE_KEY &&
      process.env.FIREBASE_CLIENT_EMAIL
    ) {
      // Use individual env vars with hardcoded project ID
      const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
      adminApp = initializeApp({
        credential: cert({
          projectId: 'onestopai-subscribers', // Your Firebase project ID
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey,
        }),
        projectId: 'onestopai-subscribers' // Ensure project ID is set
      });
      console.log('Firebase Admin initialized from individual FIREBASE_* env vars');
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      // Let the SDK pick up ADC from GOOGLE_APPLICATION_CREDENTIALS
      adminApp = initializeApp({ 
        credential: applicationDefault(),
        projectId: 'onestopai-subscribers' // Your Firebase project ID
      });
      console.log('Firebase Admin initialized using application default credentials');
    } else {
      // Use default with explicit project ID
      console.log('🔧 Using default credentials with explicit project ID: onestopai-subscribers');
      adminApp = initializeApp({
        projectId: 'onestopai-subscribers' // Your Firebase project ID
      });
    }
  } else {
    adminApp = getApps()[0];
  }
} catch (error) {
  console.error('Firebase Admin initialization error:', error);
  // If anything fails, rethrow so the caller can handle it explicitly
  throw error;
}

// Initialize Admin Firestore
const adminDb = getFirestore(adminApp);

// Store subscriber in Firestore using Admin SDK
export async function storeSubscriber(email: string) {
  try {
    // Check if email already exists
    const subscribersRef = adminDb.collection('subscribers');
    const querySnapshot = await subscribersRef.where('email', '==', email).get();
    
    if (!querySnapshot.empty) {
      console.log("📧 Email already subscribed:", email);
      return { success: false, message: "Email already subscribed!" };
    }

    // Add new subscriber
    const docRef = await subscribersRef.add({
      email: email,
      subscribedAt: FieldValue.serverTimestamp(),
      status: "active"
    });
    
    console.log("✅ Subscriber added to Firestore with ID:", docRef.id);
    return { success: true, message: "Successfully subscribed!", id: docRef.id };
    
  } catch (error) {
    console.error("❌ Error storing subscriber:", error);
    return { success: false, message: "Failed to store subscription data." };
  }
}

// Get all subscribers (optional - for admin use)
export async function getAllSubscribers() {
  try {
    const querySnapshot = await adminDb.collection('subscribers').get();
    const subscribers: any[] = [];
    
    querySnapshot.forEach((doc) => {
      subscribers.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return subscribers;
  } catch (error) {
    console.error("❌ Error fetching subscribers:", error);
    return [];
  }
}
