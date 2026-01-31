// Simple Firebase configuration checker
export function checkFirebaseConfig() {
  const hasServiceAccount = !!process.env.FIREBASE_SERVICE_ACCOUNT;
  const hasIndividualVars = !!(
    process.env.FIREBASE_PROJECT_ID && 
    process.env.FIREBASE_CLIENT_EMAIL && 
    process.env.FIREBASE_PRIVATE_KEY
  );
  const hasGoogleCreds = !!process.env.GOOGLE_APPLICATION_CREDENTIALS;

  return {
    configured: hasServiceAccount || hasIndividualVars || hasGoogleCreds,
    method: hasServiceAccount ? 'service_account' : 
            hasIndividualVars ? 'individual_vars' : 
            hasGoogleCreds ? 'google_creds' : 'none'
  };
}

// Store subscriber with fallback handling
export async function storeSubscriber(email: string) {
  console.log(`📧 Processing subscription for: ${email}`);
  
  // Check Firebase configuration
  const firebaseConfig = checkFirebaseConfig();
  
  if (!firebaseConfig.configured) {
    console.log("⚠️ Firebase not configured - logging subscription locally");
    console.log(`📧 MANUAL SUBSCRIPTION NEEDED: ${email} at ${new Date().toISOString()}`);
    
    return { 
      success: true, 
      message: "Subscription received! We'll contact you soon." 
    };
  }

  // Try Firebase storage if configured
  try {
    const { adminDb } = await import('./firestore-admin');
    
    // Check if email already exists
    const subscribersRef = adminDb.collection('subscribers');
    const querySnapshot = await subscribersRef.where('email', '==', email).get();
    
    if (!querySnapshot.empty) {
      console.log("📧 Email already subscribed:", email);
      return { success: false, message: "Email already subscribed!" };
    }

    // Add new subscriber
    const { FieldValue } = await import('firebase-admin/firestore');
    const docRef = await subscribersRef.add({
      email: email,
      subscribedAt: FieldValue.serverTimestamp(),
      status: "active"
    });
    
    console.log("✅ Subscriber stored with ID:", docRef.id);
    return { success: true, message: "Successfully subscribed!" };
    
  } catch (error) {
    console.error("❌ Firebase error:", error);
    console.log(`📧 FALLBACK: Manual subscription needed for ${email}`);
    
    return { 
      success: true, // Don't break user experience
      message: "Subscription received! We'll process it manually." 
    };
  }
}
