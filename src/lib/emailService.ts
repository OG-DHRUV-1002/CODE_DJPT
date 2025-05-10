
// 'use server'; // Add this if you intend to call it from Server Components/Actions

/**
 * @fileOverview Email sending service.
 *
 * This is a placeholder implementation.
 * For actual email sending, you would integrate with a service like
 * SendGrid, Nodemailer, Resend, or Firebase's own email capabilities (e.g., via Extensions).
 */

export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

/**
 * Sends an email when a session ends.
 * This is a mock implementation. Replace with actual email sending logic.
 * @param userEmail The email address of the user.
 * @returns A promise that resolves when the email is "sent" or rejects on error.
 */
export async function sendSessionEndEmail(userEmail: string): Promise<void> {
  if (!userEmail) {
    console.error("sendSessionEndEmail: No userEmail provided.");
    // Optionally throw an error or return a specific status
    // throw new Error("No userEmail provided for session end notification.");
    return;
  }

  const emailOptions: EmailOptions = {
    to: userEmail,
    subject: "Your CODE_DJPT Session Has Ended",
    text: `Hello,

Your session on CODE_DJPT may have ended or become inactive.
If you experience any issues, please consider refreshing the page.

Thank you,
The CODE_DJPT Team`,
    html: `<p>Hello,</p>
<p>Your session on CODE_DJPT may have ended or become inactive.</p>
<p>If you experience any issues, please consider refreshing the page.</p>
<p>Thank you,<br/>The CODE_DJPT Team</p>`,
  };

  console.log(`Mock email sent to ${emailOptions.to}:`);
  console.log(`Subject: ${emailOptions.subject}`);
  console.log(`Body: ${emailOptions.text}`);

  // In a real implementation, you would use an email sending library or service here.
  // Example (conceptual):
  // try {
  //   await emailService.send(emailOptions);
  //   console.log(`Session end email successfully sent to ${userEmail}`);
  // } catch (error) {
  //   console.error(`Failed to send session end email to ${userEmail}:`, error);
  //   throw error; // Re-throw to allow the caller to handle it
  // }

  // For this mock, we'll just resolve the promise.
  return Promise.resolve();
}

/**
 * A generic function to send an email.
 * This is a mock implementation.
 * @param options EmailOptions object.
 * @returns A promise that resolves when the email is "sent" or rejects on error.
 */
export async function sendEmail(options: EmailOptions): Promise<void> {
  console.log(`Mock email sent to ${options.to}:`);
  console.log(`Subject: ${options.subject}`);
  console.log(`Text: ${options.text}`);
  if (options.html) {
    console.log(`HTML: ${options.html}`);
  }
  return Promise.resolve();
}
