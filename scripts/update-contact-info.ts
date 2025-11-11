import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAj4RQYwRBx_GU_MtOQnI1bLoDV-5P2rFQ",
  authDomain: "cmkhomeservices-9eb2f.firebaseapp.com",
  projectId: "cmkhomeservices-9eb2f",
  storageBucket: "cmkhomeservices-9eb2f.firebasestorage.app",
  messagingSenderId: "1026673043730",
  appId: "1:1026673043730:web:7e3e22edea0daa2b99d11c",
  measurementId: "G-KCZJ0VTDCH"
};

async function updateContactInfo() {
  console.log('🔧 Initializing Firebase...');
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  try {
    const settingsRef = doc(db, 'settings', 'app');
    
    console.log('📖 Reading current settings...');
    const settingsSnap = await getDoc(settingsRef);
    
    if (!settingsSnap.exists()) {
      console.log('⚠️  No settings document found in Firestore');
      return;
    }

    const currentSettings = settingsSnap.data();
    console.log('Current contact info:');
    console.log('  Email:', currentSettings.contactEmail);
    console.log('  Phone:', currentSettings.contactPhone);
    console.log('  Address:', currentSettings.contactAddress);

    console.log('\n📝 Updating contact information...');
    
    await updateDoc(settingsRef, {
      contactEmail: 'info@cmkhomeservices.com',
      contactPhone: '+1 (786) 380-7579',
      contactAddress: '7950 NW 53rd St Suite 337\nMiami, FL 33166',
      businessName: 'CMK Home Services LLC',
      supportHours: 'Mon-Sat 8:00 AM - 7:00 PM EST',
      emailFrom: 'info@cmkhomeservices.com',
      emailFromName: 'CMK Home Services',
      notificationEmail: 'info@cmkhomeservices.com'
    });

    console.log('✅ Contact information updated successfully!');
    console.log('\nNew contact info:');
    console.log('  Email: info@cmkhomeservices.com');
    console.log('  Phone: +1 (786) 380-7579');
    console.log('  Address: 7950 NW 53rd St Suite 337, Miami, FL 33166');
    console.log('  Business Hours: Mon-Sat 8:00 AM - 7:00 PM EST');

  } catch (error) {
    console.error('❌ Error updating settings:', error);
    throw error;
  }
}

updateContactInfo()
  .then(() => {
    console.log('\n✨ Done! Please refresh your browser to see the changes.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed:', error);
    process.exit(1);
  });
