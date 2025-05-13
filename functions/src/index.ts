import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Initialize Firebase Admin SDK
if (admin.apps.length === 0) {
  admin.initializeApp();
}

// Dynamically import the convertCode flow
// This is important because the flow file might have 'use server' which is Next.js specific
// and Firebase Functions environment is Node.js.
async function loadConvertCodeFlow() {
  // Adjust the path if your project structure for Genkit flows is different
  // The path should be relative to the `functions/lib` directory after compilation
  const { convertCode: convertCodeFn } = await import("../../src/ai/flows/code-conversion");
  return convertCodeFn;
}

export const convertCode = functions.https.onRequest(async (request, response) => {
  // Set CORS headers to allow requests from your web app
  // In production, restrict this to your app's domain for security.
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight OPTIONS requests
  if (request.method === "OPTIONS") {
    response.status(204).send("");
    return;
  }

  if (request.method !== "POST") {
    response.status(405).send("Method Not Allowed");
    return;
  }

  try {
    const convertCodeFunction = await loadConvertCodeFlow();
    const input = request.body; // Assuming the request body contains ConvertCodeInput

    if (!input || typeof input.sourceCode !== 'string' || typeof input.sourceLanguage !== 'string' || typeof input.targetLanguage !== 'string') {
      response.status(400).send({ error: "Invalid input: sourceCode, sourceLanguage, and targetLanguage are required." });
      return;
    }

    const result = await convertCodeFunction(input);
    response.status(200).send(result);
  } catch (error: any) {
    console.error("Error in convertCode Firebase Function:", error);
    // Check if the error object has a message property
    const errorMessage = error.message || "An unknown error occurred during code conversion.";
    response.status(500).send({ error: "Code conversion failed.", details: errorMessage });
  }
});
