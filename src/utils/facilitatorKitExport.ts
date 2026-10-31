import { OFFICIAL_EMAIL } from '../data/teamData';

export function downloadFacilitatorStarterKit() {
  const content = `# MATH LAB — LOCAL LAB FACILITATOR STARTER KIT & HANDBOOK
**Official Practical Guide for Community Facilitators & Student Leaders**
*Core Tagline: One Investigation → Multiple Levels → Shared Discovery*
*Contact: ${OFFICIAL_EMAIL} | Web: Math Lab Collaborative Inquiry*

---

## 1. INTRODUCTION & PEDAGOGICAL PHILOSOPHY

Welcome to Math Lab! Math Lab creates opportunities for people of all backgrounds to explore mathematics through open investigation, experimentation, problem-solving, and peer discussion.

Unlike traditional math clubs centered on speed-drills or contest rankings, a Local Math Lab is:
- **Low Floor, High Ceiling:** Accessible to novices with concrete examples, while challenging advanced students with rigorous open questions.
- **Inquiry-Driven:** Driven by student curiosity, hypotheses, and geometric or algebraic exploration.
- **Collaborative:** Solutions are developed through group whiteboard discussions and shared discovery.

### Facilitator Autonomy
Facilitators may explore any mathematical topics their participants find exciting (from grades K–12). However, every Local Lab is encouraged to spend at least one session per month on the active **National Investigation** and submit student conjectures to the national review digest.

---

## 2. A 4-STEP ROADMAP TO LAUNCHING YOUR CHAPTER

### Step 1: Secure a Host Location
Public libraries, school classrooms, and community centers (YMCA, homeschool co-ops) are ideal. Most public institutions provide meeting rooms free of charge for student-led educational activities.
- *Recommended Room Setup:* 1–2 large tables with chairs facing inward, and at least one whiteboard or flip chart.

### Step 2: Register Your Chapter
Submit your chapter registration on the Math Lab platform so your chapter appears on the nationwide directory and receives updated monthly investigation packets.

### Step 3: Promote Your First Session
Print and post flyers in hallways, library community boards, or classroom bulletin boards 10–14 days in advance. Announce through morning announcements and student group chats.

### Step 4: Host Session #1 (Keep It Concrete)
Begin with Level 1 of the current National Investigation. Focus on low-stakes pattern spotting, drawing pictures, and celebrating surprising conjectures.

---

## 3. 60-MINUTE STANDARD SESSION RUN-DOWN AGENDA

| Time | Phase | Focus & Facilitator Actions |
|---|---|---|
| **-30 min** | Room Setup | Arrange tables in pods, test markers, lay out scrap paper and colored pencils. |
| **00–10 min** | Arrival & Warmup | Welcome participants. Pose a single visual pattern or low-barrier puzzle on the whiteboard. |
| **10–30 min** | Small-Group Inquiry | Introduce the core investigation prompt. Participants work in pairs or groups of three. Facilitator walks around asking open-ended questions: *"What patterns do you notice?"*, *"Can you test a smaller case?"* |
| **30–45 min** | Group Discussion | Reconvene as a whole group. Invite pairs to sketch their diagrams on the board. Emphasize multiple distinct methods. |
| **45–55 min** | Rigorous Extensions | Introduce higher-level generalizations or edge cases. Challenge the group to construct an inductive argument or proof sketch. |
| **55–60 min** | Synthesis & Wrap-up | Photograph whiteboards. Note student questions to submit to the National Digest. Announce next session topic. |

---

## 4. TEMPLATE: VENUE OUTREACH EMAIL

*Copy and adapt this formal letter to email principals, department chairs, or head librarians:*

\`\`\`text
Subject: Request to Host a Student-Led Math Lab at [Name of Institution]

Dear [Contact Name],

My name is [Your Name], and I am organizing a local chapter of Math Lab to provide free opportunities for students in our community to explore mathematics through collaborative problem-solving and hands-on investigation.

Math Lab is a non-profit educational initiative following the principle "One Investigation → Multiple Levels → Shared Discovery." Rather than competitive test-prep, participants investigate compelling mathematical mysteries, formulate conjectures, and build visual intuition together in a low-pressure environment.

I am reaching out to ask whether [Institution Name] might have a meeting room or classroom available to host our group for 60 to 90 minutes on a recurring basis (e.g., [Preferred Day/Time, such as every other Wednesday at 3:45 PM]).

We would be delighted to coordinate with your team regarding scheduling, room safety protocols, supervision, and institutional guidelines.

Thank you very much for your time and for supporting community mathematical enrichment!

Sincerely,

[Your Name]
Local Lab Facilitator, Math Lab
[Your Phone Number / Email Address]
\`\`\`

---

## 5. TEMPLATE: SESSION INVITATION FLYER

\`\`\`text
======================================================
           MATH LAB: COLLABORATIVE INQUIRY
    One Investigation → Multiple Levels → Shared Discovery
======================================================

Curious about patterns, geometric puzzles, and mathematical mysteries?
Join our free, hands-on math exploration group!

• WHEN:  [Insert Date & Time, e.g., Saturday, Nov 14, 2:00 PM – 3:30 PM]
• WHERE: [Insert Room Name & Venue Address]
• WHO:   Open to all students! No contest experience required.
• COST:  100% Free

WHAT WE DO:
- Explore fascinating, unsolved, and visual math problems together
- Draw on whiteboards and test hypotheses with friends
- Share discoveries with a nationwide network of student math circles

Questions or RSVP: [Your Email]
Website: Math Lab Collaborative Inquiry
\`\`\`

---

## 6. TEN-POINT LAUNCH CHECKLIST

- [ ] 1. Identify 1–2 co-facilitators or peer organizers to share duties.
- [ ] 2. Secure a consistent meeting room with table space and whiteboard access.
- [ ] 3. Confirm supervisor/faculty sponsor approval if meeting in a school.
- [ ] 4. Register chapter with Math Lab National to receive monthly packets.
- [ ] 5. Set fixed recurring meeting time (weekly, bi-weekly, or monthly).
- [ ] 6. Post session invitation flyers 10–14 days prior to session #1.
- [ ] 7. Print 15–20 copies of Level 1 & Level 2 investigation prompts.
- [ ] 8. Procure dry-erase markers, graph paper, rulers, and colored pens.
- [ ] 9. Run the 60-minute session using the structured timeline above.
- [ ] 10. Photograph whiteboard solutions and submit to the National Review portal.

---
*Generated by Math Lab National Platform · ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}*
`;

  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `math-lab-facilitator-starter-kit-${new Date().toISOString().slice(0, 10)}.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
