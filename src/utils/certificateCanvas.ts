import { LabCertificateInfo } from './certificateData';

interface GenerateCertificateOptions {
  studentName: string;
  certificate: LabCertificateInfo;
  completionDate: string;
  credentialId: string;
}

export const renderCertificateToCanvas = (
  canvas: HTMLCanvasElement,
  options: GenerateCertificateOptions
): void => {
  const { studentName, certificate, completionDate, credentialId } = options;

  const width = 2000;
  const height = 1414;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 1. Parchment Background with subtle warmth
  const bgGrad = ctx.createRadialGradient(
    width / 2, height / 2, 100,
    width / 2, height / 2, width * 0.7
  );
  bgGrad.addColorStop(0, '#ffffff');
  bgGrad.addColorStop(0.65, '#fbf9f4');
  bgGrad.addColorStop(1, '#f4ece1');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle geometric background watermark (compass and unit circle)
  ctx.save();
  ctx.translate(width / 2, height / 2 + 40);
  ctx.strokeStyle = 'rgba(0, 119, 200, 0.028)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 380, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 260, 0, Math.PI * 2);
  ctx.stroke();

  // Watermark 12 radial spokes
  for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI) / 6;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(angle) * 380, Math.sin(angle) * 380);
    ctx.stroke();
  }
  ctx.restore();

  // 2. Ornate Multi-Layer Border
  // Outer Deep Navy Border
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 14;
  ctx.strokeRect(50, 50, width - 100, height - 100);

  // Middle Gold Foil Accent
  ctx.strokeStyle = '#b8860b';
  ctx.lineWidth = 4;
  ctx.strokeRect(70, 70, width - 140, height - 140);

  // Thin Inner Navy Frame
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(82, 82, width - 164, height - 164);

  // Corner Ornaments (Classic collegiate corner brackets)
  const drawCorner = (x: number, y: number, rot: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rot * Math.PI) / 180);

    ctx.fillStyle = '#b8860b';
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#b8860b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(12, 0);
    ctx.lineTo(45, 0);
    ctx.moveTo(0, 12);
    ctx.lineTo(0, 45);
    ctx.stroke();

    // Diamond accent
    ctx.beginPath();
    ctx.moveTo(18, 18);
    ctx.lineTo(24, 12);
    ctx.lineTo(30, 18);
    ctx.lineTo(24, 24);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  };

  drawCorner(70, 70, 0);
  drawCorner(width - 70, 70, 90);
  drawCorner(width - 70, height - 70, 180);
  drawCorner(70, height - 70, 270);

  // 3. Top Header: Math Lab Brand
  ctx.textAlign = 'center';
  ctx.fillStyle = '#0077c8';
  ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '4px';
  ctx.fillText('MATH LAB • EDUCATIONAL INITIATIVE', width / 2, 135);

  ctx.fillStyle = '#64748b';
  ctx.font = '500 16px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('STUDENT-CENTERED MATHEMATICAL EXPLORATION & RESEARCH', width / 2, 162);

  // 4. Main Title
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 64px "EB Garamond", "Times New Roman", serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('Certificate of Mathematical Mastery', width / 2, 245);

  // Gold Decorative Line under title
  ctx.save();
  const gradLine = ctx.createLinearGradient(width / 2 - 300, 0, width / 2 + 300, 0);
  gradLine.addColorStop(0, 'rgba(184, 134, 11, 0)');
  gradLine.addColorStop(0.5, 'rgba(184, 134, 11, 1)');
  gradLine.addColorStop(1, 'rgba(184, 134, 11, 0)');
  ctx.strokeStyle = gradLine;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 280, 275);
  ctx.lineTo(width / 2 + 280, 275);
  ctx.stroke();

  // Small center diamond
  ctx.fillStyle = '#b8860b';
  ctx.beginPath();
  ctx.arc(width / 2, 275, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 5. "This certifies that"
  ctx.fillStyle = '#475569';
  ctx.font = 'italic 24px "EB Garamond", serif';
  ctx.letterSpacing = '1px';
  ctx.fillText('This official credential recognizes and certifies that', width / 2, 330);

  // 6. Student Name (Large prominent recipient name)
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 68px "EB Garamond", "Times New Roman", serif';
  ctx.letterSpacing = '1px';
  ctx.fillText(studentName || 'Student Explorer', width / 2, 420);

  // Underline for student name
  ctx.strokeStyle = '#0077c8';
  ctx.lineWidth = 2.5;
  const nameWidth = Math.max(ctx.measureText(studentName || 'Student Explorer').width + 60, 420);
  ctx.beginPath();
  ctx.moveTo(width / 2 - nameWidth / 2, 445);
  ctx.lineTo(width / 2 + nameWidth / 2, 445);
  ctx.stroke();

  // 7. Statement of Completion
  ctx.fillStyle = '#475569';
  ctx.font = '22px "EB Garamond", serif';
  ctx.fillText(
    'has actively investigated mathematical hypotheses, tested continuous invariants, and achieved verified mastery in',
    width / 2,
    500
  );

  // 8. Laboratory Title Card
  ctx.fillStyle = '#0077c8';
  ctx.font = 'bold 44px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText(certificate.title.toUpperCase(), width / 2, 570);

  // Category / Field pill
  ctx.fillStyle = '#0f172a';
  ctx.font = '600 18px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '1.5px';
  ctx.fillText(`FIELD: ${certificate.fieldOfStudy.toUpperCase()}`, width / 2, 610);

  // 9. Verified Competencies Box
  const boxW = 1200;
  const boxH = 260;
  const boxX = (width - boxW) / 2;
  const boxY = 645;

  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(boxX, boxY, boxW, boxH, 16);
  ctx.fill();
  ctx.stroke();

  // Competency box header
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '1.5px';
  ctx.textAlign = 'left';
  ctx.fillText('VERIFIED PRACTICAL & THEORETICAL COMPETENCIES:', boxX + 35, boxY + 40);

  // List competencies
  ctx.font = '500 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#334155';
  certificate.competencies.slice(0, 4).forEach((comp, idx) => {
    const itemY = boxY + 80 + idx * 42;
    // Blue checkmark glyph
    ctx.fillStyle = '#10b981';
    ctx.fillText('✓', boxX + 35, itemY);
    ctx.fillStyle = '#334155';
    ctx.fillText(comp, boxX + 65, itemY);
  });

  // 10. Official Gold Seal (Left-Center Bottom)
  const sealX = width / 2;
  const sealY = 1040;
  const sealR = 85;

  ctx.save();
  ctx.translate(sealX, sealY);

  // Outer serrated / scalloped circle for gold seal
  ctx.fillStyle = '#b8860b';
  ctx.beginPath();
  const teeth = 36;
  for (let i = 0; i < teeth; i++) {
    const angle = (i * Math.PI * 2) / teeth;
    const r = i % 2 === 0 ? sealR + 6 : sealR - 2;
    const px = Math.cos(angle) * r;
    const py = Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();

  // Inner Gold Disc
  ctx.fillStyle = '#d4af37';
  ctx.beginPath();
  ctx.arc(0, 0, sealR - 8, 0, Math.PI * 2);
  ctx.fill();

  // Seal Ring
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(0, 0, sealR - 16, 0, Math.PI * 2);
  ctx.stroke();

  // Seal Text
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '1.5px';
  ctx.fillText('OFFICIAL SEAL', 0, -28);

  ctx.font = 'bold 24px "EB Garamond", serif';
  ctx.fillText('MATH LAB', 0, 2);

  ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('VERIFIED MASTERY', 0, 26);
  ctx.fillText('★ ★ ★', 0, 44);

  ctx.restore();

  // 11. Signatures & Dates
  // Left: Directorate of Mathematics
  const sigLeftX = 340;
  const sigRightX = width - 340;
  const sigLineY = 1200;

  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(sigLeftX - 160, sigLineY);
  ctx.lineTo(sigLeftX + 160, sigLineY);
  ctx.stroke();

  // Script-style signature representation
  ctx.textAlign = 'center';
  ctx.fillStyle = '#0f172a';
  ctx.font = 'italic 28px "EB Garamond", serif';
  ctx.fillText('Math Lab Research Committee', sigLeftX, sigLineY - 14);

  ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillStyle = '#0f172a';
  ctx.fillText('ACADEMIC CURRICULUM DIRECTORATE', sigLeftX, sigLineY + 28);
  ctx.font = '500 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('National Mathematics Initiative', sigLeftX, sigLineY + 48);

  // Right: Date & Verification
  ctx.beginPath();
  ctx.moveTo(sigRightX - 160, sigLineY);
  ctx.lineTo(sigRightX + 160, sigLineY);
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(completionDate, sigRightX, sigLineY - 14);

  ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText('DATE OF MASTERY ISSUANCE', sigRightX, sigLineY + 28);
  ctx.font = '500 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText(`Credential ID: ${credentialId}`, sigRightX, sigLineY + 48);

  // 12. Bottom Watermark / Disclaimer
  ctx.textAlign = 'center';
  ctx.fillStyle = '#94a3b8';
  ctx.font = '12px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '0.5px';
  ctx.fillText(
    'Math Lab is an open-source educational non-profit initiative dedicated to tactile mathematical discovery.',
    width / 2,
    height - 75
  );
};
