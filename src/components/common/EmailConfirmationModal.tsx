import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Mail, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  ShieldCheck, 
  FileEdit,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SendEmailOptions } from '../../services/gmailService';

interface EmailConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  emailDetails: SendEmailOptions | null;
  onSuccess?: (result: { id: string; threadId?: string; type: 'sent' | 'draft' }) => void;
  title?: string;
  description?: string;
}

export const EmailConfirmationModal: React.FC<EmailConfirmationModalProps> = ({
  isOpen,
  onClose,
  emailDetails,
  onSuccess,
  title = 'Confirm Gmail Dispatch',
  description = 'Please review the email details below before sending from your connected Gmail account.',
}) => {
  const { isGmailConnected, googleUser, signInWithGoogle, sendEmail, saveDraft, isConnecting } = useAuth();
  const [status, setStatus] = useState<'idle' | 'sending' | 'saving_draft' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successInfo, setSuccessInfo] = useState<{ id: string; type: 'sent' | 'draft' } | null>(null);

  if (!isOpen || !emailDetails) return null;

  const handleSend = async () => {
    setStatus('sending');
    setErrorMessage('');
    try {
      const res = await sendEmail(emailDetails);
      setStatus('success');
      setSuccessInfo({ id: res.id, type: 'sent' });
      if (onSuccess) {
        onSuccess({ id: res.id, threadId: res.threadId, type: 'sent' });
      }
    } catch (err: any) {
      console.error('Failed to send email:', err);
      setStatus('error');
      setErrorMessage(err?.message || 'Failed to send email via Gmail.');
    }
  };

  const handleSaveDraft = async () => {
    setStatus('saving_draft');
    setErrorMessage('');
    try {
      const res = await saveDraft(emailDetails);
      setStatus('success');
      setSuccessInfo({ id: res.id, type: 'draft' });
      if (onSuccess) {
        onSuccess({ id: res.id, type: 'draft' });
      }
    } catch (err: any) {
      console.error('Failed to save draft:', err);
      setStatus('error');
      setErrorMessage(err?.message || 'Failed to save draft to Gmail.');
    }
  };

  const handleConnectGoogle = async () => {
    const success = await signInWithGoogle();
    if (!success) {
      setErrorMessage('Could not sign in to Google. Please check your browser popup settings.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden text-slate-800 dark:text-slate-100">
        
        {/* Top colored accent line */}
        <div className="h-1.5 bg-gradient-to-r from-[#ea4335] via-[#4285f4] to-[#34a853]" />

        <div className="p-6 sm:p-7">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/60 text-[#ea4335] flex items-center justify-center border border-red-100 dark:border-red-900/50">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display-bold text-lg font-bold text-slate-900 dark:text-white">
                  {title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {description}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              disabled={status === 'sending' || status === 'saving_draft'}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Connected Google Account Banner */}
          <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 shrink-0" />
              <div>
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">
                  Sending from Account:
                </span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {isGmailConnected && googleUser ? (
                    <span className="flex items-center gap-1.5">
                      {googleUser.displayName || 'Google User'} ({googleUser.email})
                    </span>
                  ) : (
                    <span className="text-amber-600 dark:text-amber-400">
                      Gmail account not yet connected
                    </span>
                  )}
                </span>
              </div>
            </div>

            {!isGmailConnected && (
              <button
                onClick={handleConnectGoogle}
                disabled={isConnecting}
                className="px-3 py-1.5 bg-[#4285f4] hover:bg-[#3367d6] text-white font-bold text-xs rounded-lg shadow-2xs transition flex items-center gap-1.5 shrink-0"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <span>Connect Gmail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Success State */}
          {status === 'success' ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                {successInfo?.type === 'sent' ? 'Email Successfully Sent!' : 'Draft Saved in Gmail!'}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                {successInfo?.type === 'sent'
                  ? `Your message was dispatched via Gmail API (ID: ${successInfo.id.slice(0, 10)}...). The recipient will see it directly in their inbox.`
                  : `Your draft was saved to your Gmail mailbox (ID: ${successInfo?.id.slice(0, 10)}...). You can review or send it at any time in Gmail.`}
              </p>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl shadow-xs transition"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Email Content Summary Box */}
              <div className="space-y-3 text-xs mb-5">
                <div className="grid grid-cols-4 gap-2 py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-500 dark:text-slate-400">To:</span>
                  <span className="col-span-3 font-mono text-slate-900 dark:text-slate-200 break-all select-all font-bold">
                    {emailDetails.to}
                  </span>
                </div>

                {emailDetails.cc && (
                  <div className="grid grid-cols-4 gap-2 py-1.5 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Cc:</span>
                    <span className="col-span-3 font-mono text-slate-700 dark:text-slate-300 break-all">
                      {emailDetails.cc}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-4 gap-2 py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-500 dark:text-slate-400">Subject:</span>
                  <span className="col-span-3 font-bold text-slate-900 dark:text-white">
                    {emailDetails.subject}
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">
                    Message Body Preview:
                  </span>
                  <div className="max-h-48 overflow-y-auto p-3.5 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-[11px] leading-relaxed text-slate-800 dark:text-slate-300 whitespace-pre-wrap select-all">
                    {emailDetails.bodyText || (emailDetails.bodyHtml ? emailDetails.bodyHtml.replace(/<[^>]+>/g, ' ') : '')}
                  </div>
                </div>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Error: </span>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={status === 'sending' || status === 'saving_draft'}
                  className="w-full sm:w-auto px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    disabled={!isGmailConnected || status === 'sending' || status === 'saving_draft'}
                    className="flex-1 sm:flex-initial px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Save as a draft in your Gmail account to send later"
                  >
                    {status === 'saving_draft' ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <FileEdit className="w-3.5 h-3.5 text-slate-500" />
                    )}
                    <span>Save Draft</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={!isGmailConnected || status === 'sending' || status === 'saving_draft'}
                    className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#ea4335] hover:bg-[#d93025] text-white font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending via Gmail...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send with Gmail</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};
