import React, { useState, useEffect, useRef } from 'react';
import { LabTab } from '../../types';
import { LAB_CERTIFICATES, LabCertificateInfo } from '../../utils/certificateData';
import { renderCertificateToCanvas } from '../../utils/certificateCanvas';
import { 
  Award, 
  Download, 
  Printer, 
  X, 
  CheckCircle, 
  Share2, 
  Copy, 
  Check, 
  Sparkles,
  Layers,
  FileCheck
} from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { email: string; name: string } | null;
  initialLabId?: LabTab | 'all';
  completedLabIds?: LabTab[];
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  user,
  initialLabId = 'all',
  completedLabIds = [],
}) => {
  const [selectedLabId, setSelectedLabId] = useState<LabTab | 'all'>(initialLabId);
  const [studentName, setStudentName] = useState<string>(user?.name || 'Student Explorer');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync initialLabId when modal opens
  useEffect(() => {
    if (initialLabId) {
      setSelectedLabId(initialLabId);
    }
  }, [initialLabId, isOpen]);

  // Sync user name
  useEffect(() => {
    if (user?.name) {
      setStudentName(user.name);
    }
  }, [user]);

  // Format today's date
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  // Deterministic Credential ID
  const credentialId = `ML-${(selectedLabId || 'suite').toUpperCase()}-${Math.abs(
    (studentName + (selectedLabId || 'all')).split('').reduce((acc, char) => acc + char.charCodeAt(0), 1000)
  ).toString().padStart(6, '0')}`;

  const currentCert: LabCertificateInfo = (LAB_CERTIFICATES as Record<string, LabCertificateInfo>)[selectedLabId] || LAB_CERTIFICATES.all;

  // Render canvas whenever inputs change
  useEffect(() => {
    if (!isOpen) return;

    // Small delay to ensure canvas ref is mounted
    const timer = setTimeout(() => {
      if (canvasRef.current) {
        renderCertificateToCanvas(canvasRef.current, {
          studentName,
          certificate: currentCert,
          completionDate: todayFormatted,
          credentialId,
        });
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [isOpen, selectedLabId, studentName, todayFormatted, credentialId, currentCert]);

  if (!isOpen) return null;

  // Handler: Download PNG Image
  const handleDownloadImage = () => {
    if (!canvasRef.current) return;
    setIsDownloading(true);

    try {
      const dataUrl = canvasRef.current.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      const safeName = (studentName || 'Student').replace(/[^a-zA-Z0-9]/g, '_');
      const safeLab = currentCert.shortTitle.replace(/[^a-zA-Z0-9]/g, '_');
      link.download = `Math_Lab_Certificate_${safeLab}_${safeName}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to export certificate image:', err);
    } finally {
      setTimeout(() => setIsDownloading(false), 600);
    }
  };

  // Handler: Print / Save as PDF
  const handlePrintPDF = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      // Fallback: alert if popups are blocked
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Math Lab Certificate - ${currentCert.title}</title>
          <style>
            @page {
              size: landscape;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #fbf8f3;
              height: 100vh;
              overflow: hidden;
            }
            img {
              width: 100vw;
              height: 100vh;
              object-fit: contain;
              box-sizing: border-box;
            }
          </style>
        </head>
        <body>
          <img src="${dataUrl}" alt="Certificate of Mathematical Mastery" />
          <script>
            window.onload = function() {
              window.focus();
              setTimeout(function() {
                window.print();
              }, 400);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Handler: Copy credential ID
  const handleCopyCredential = () => {
    navigator.clipboard.writeText(credentialId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const availableOptions: { id: LabTab | 'all'; label: string }[] = [
    { id: 'all', label: '🏆 Full Suite Mastery (All Labs)' },
    { id: 'graphing', label: '01. Function & Graphing Studio' },
    { id: 'geometry', label: '02. Geometry & Unit Circle Studio' },
    { id: 'calculus', label: '03. Calculus & Riemann Sandbox' },
    { id: 'linear-algebra', label: '04. Linear Algebra Grid Studio' },
    { id: 'probability', label: '05. Statistics & Probability Lab' },
    { id: 'discrete', label: '06. Number Theory & Discrete Math' },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full my-auto shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0a192f] to-[#4a044e] text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <Award className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-300">
                  Official Credential
                </span>
                <span className="text-xs text-slate-400">&bull;</span>
                <span className="text-[11px] text-slate-300 font-medium">Math Lab Initiative</span>
              </div>
              <h2 className="font-display-bold text-lg sm:text-xl font-extrabold text-white">
                Certificate of Mathematical Mastery
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Customization Bar: Student Name & Lab Selector */}
        <div className="p-4 sm:p-5 bg-[#faf7f2] border-b border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Recipient Name (as it appears on certificate):
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Marie Curie or Euler"
              maxLength={45}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0077c8] text-xs shadow-2xs"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Select Laboratory Subject:
            </label>
            <select
              value={selectedLabId}
              onChange={(e) => setSelectedLabId(e.target.value as LabTab | 'all')}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0077c8] text-xs shadow-2xs cursor-pointer"
            >
              {availableOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Canvas Preview */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-slate-100/70">
          <div className="w-full max-w-3xl bg-white rounded-2xl p-2 sm:p-3 shadow-xl border border-slate-200 overflow-hidden">
            <div className="relative w-full aspect-[2000/1414] rounded-xl overflow-hidden bg-white shadow-inner flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="w-full h-full object-contain block shadow-xs"
              />
            </div>
          </div>

          {/* Quick Credential ID Info */}
          <div className="mt-3 flex items-center gap-3 text-xs text-slate-500 font-mono">
            <span>Credential ID: <strong className="text-slate-800">{credentialId}</strong></span>
            <button
              onClick={handleCopyCredential}
              className="inline-flex items-center gap-1 text-[#0077c8] hover:underline font-bold"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy ID</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal Footer: Action Buttons */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>High-resolution 2000×1414 landscape print-ready quality.</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handlePrintPDF}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadImage}
              disabled={isDownloading}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-[#0077c8] hover:bg-[#005fa3] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center justify-center gap-2 active:scale-98"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? 'Generating...' : 'Download Image (PNG)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
