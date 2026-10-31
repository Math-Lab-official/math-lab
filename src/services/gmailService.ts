/**
 * Gmail Service for Math Lab
 * Connects directly to Gmail REST API (v1) using in-memory OAuth 2.0 access token.
 * Token is strictly maintained in-memory and NEVER persisted to localStorage or sessionStorage.
 */

export interface SendEmailOptions {
  to: string;
  cc?: string;
  bcc?: string;
  subject: string;
  bodyText?: string;
  bodyHtml?: string;
  fromName?: string;
}

export interface GmailProfile {
  emailAddress: string;
  messagesTotal: number;
  threadsTotal: number;
  historyId: string;
}

export interface SentMessageRecord {
  id: string;
  threadId: string;
  to: string;
  subject: string;
  sentAt: number;
  snippet?: string;
}

// In-memory token storage (NEVER store in localStorage or sessionStorage)
let inMemoryAccessToken: string | null = null;
let inMemoryUserEmail: string | null = null;

export const setInMemoryToken = (token: string | null, email: string | null = null) => {
  inMemoryAccessToken = token;
  if (email) inMemoryUserEmail = email;
  if (!token) inMemoryUserEmail = null;
};

export const getInMemoryToken = (): string | null => inMemoryAccessToken;
export const getInMemoryUserEmail = (): string | null => inMemoryUserEmail;

/**
 * Encodes a string to RFC 4648 Base64URL safe format
 */
function toBase64Url(str: string): string {
  // UTF-8 encode before base64 to preserve accents, math symbols (∑, ∫, etc.)
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Builds standard RFC 2822 MIME message
 */
export function buildRfc2822Message({
  to,
  cc,
  bcc,
  subject,
  bodyText,
  bodyHtml,
  fromName,
}: SendEmailOptions, fromEmail?: string): string {
  const boundary = `====_MathLabBoundary_${Date.now().toString(16)}====`;
  const fromHeader = fromName && fromEmail 
    ? `From: =?UTF-8?B?${btoa(unescape(encodeURIComponent(fromName)))}?= <${fromEmail}>`
    : fromEmail ? `From: <${fromEmail}>` : '';

  const headers = [
    `To: ${to}`,
    fromHeader,
    cc ? `Cc: ${cc}` : '',
    bcc ? `Bcc: ${bcc}` : '',
    `Subject: =?UTF-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ].filter(Boolean).join('\r\n');

  const plainPart = [
    `--${boundary}`,
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    bodyText || (bodyHtml ? bodyHtml.replace(/<[^>]+>/g, ' ') : ''),
    '',
  ].join('\r\n');

  const htmlContent = bodyHtml || `<div style="font-family: sans-serif; line-height: 1.6;">${(bodyText || '').replace(/\n/g, '<br/>')}</div>`;

  const htmlPart = [
    `--${boundary}`,
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    htmlContent,
    '',
  ].join('\r\n');

  const closing = `--${boundary}--\r\n`;

  return `${headers}\r\n\r\n${plainPart}${htmlPart}${closing}`;
}

/**
 * Sends an email using Gmail REST API
 * Requires an active in-memory OAuth 2.0 access token with gmail.send scope.
 */
export async function sendGmailMessage(
  options: SendEmailOptions,
  providedToken?: string
): Promise<{ id: string; threadId: string }> {
  const token = providedToken || inMemoryAccessToken;
  if (!token) {
    throw new Error('No Gmail access token found. Please connect your Google account with Gmail permissions.');
  }

  const senderEmail = inMemoryUserEmail || undefined;
  const rawMime = buildRfc2822Message(options, senderEmail);
  const rawBase64Url = toBase64Url(rawMime);

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      raw: rawBase64Url,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || `Gmail API error (${response.status}): ${response.statusText}`;
    throw new Error(message);
  }

  const data = await response.json();
  return {
    id: data.id,
    threadId: data.threadId,
  };
}

/**
 * Creates a draft in the user's Gmail mailbox
 */
export async function createGmailDraft(
  options: SendEmailOptions,
  providedToken?: string
): Promise<{ id: string; message: { id: string } }> {
  const token = providedToken || inMemoryAccessToken;
  if (!token) {
    throw new Error('No Gmail access token found. Please connect your Google account with Gmail permissions.');
  }

  const senderEmail = inMemoryUserEmail || undefined;
  const rawMime = buildRfc2822Message(options, senderEmail);
  const rawBase64Url = toBase64Url(rawMime);

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/drafts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: {
        raw: rawBase64Url,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || `Gmail API error (${response.status}): ${response.statusText}`;
    throw new Error(message);
  }

  return await response.json();
}

/**
 * Fetches user Gmail profile info (email address, messages count)
 */
export async function getGmailProfile(providedToken?: string): Promise<GmailProfile> {
  const token = providedToken || inMemoryAccessToken;
  if (!token) {
    throw new Error('No Gmail access token available.');
  }

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Failed to fetch profile (${response.status})`);
  }

  return await response.json();
}
