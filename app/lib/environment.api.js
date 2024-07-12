const firebaseUrl = 'https://firebase.google.com/';

export const apiKey = checkValue(
  process.env.NEXT_PUBLIC_API_KEY,
  'NEXT_PUBLIC_API_KEY',
  firebaseUrl
);

export const authDomain = checkValue(
  process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  'NEXT_PUBLIC_AUTH_DOMAIN',
  firebaseUrl
);

export const projectId = checkValue(
  process.env.NEXT_PUBLIC_PROJECT_ID,
  'NEXT_PUBLIC_PROJECT_ID',
  firebaseUrl
);

export const storageBucket = checkValue(
  process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  'NEXT_PUBLIC_STORAGE_BUCKET',
  firebaseUrl
);

export const messagingSenderId = checkValue(
  process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  'NEXT_PUBLIC_MESSAGING_SENDER_ID',
  firebaseUrl
);

export const appId = checkValue(
  process.env.NEXT_PUBLIC_APP_ID,
  'NEXT_PUBLIC_APP_ID',
  firebaseUrl
);

export const measurementId = checkValue(
  process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  'NEXT_PUBLIC_MEASUREMENT_ID',
  firebaseUrl
);

function checkValue(value, errorMessage, url) {
  if (value === undefined) {
    throw new Error(
      `Missing Environment Variable: ${errorMessage}\n\nVisit ${url} to learn how you can generate your own API keys`
    );
  }
  return value;
}
