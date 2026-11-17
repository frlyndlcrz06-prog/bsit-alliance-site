/* ============================================================
   THIS IS THE ONLY FILE OFFICERS NEED TO EDIT.
   Keep the quotes "" and commas , exactly as they are.
   ============================================================ */

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61577821588105";

/* ---------- OFFICERS ----------
   photo: put the image file inside the /photos folder and write its name here.
   If the photo is missing, the card shows the person's initials instead. */
const OFFICERS = [
  { name: "Alaiza Nicole Caranto", position: "President",       photo: "photos/president.jpg" },
  { name: "Froilyn Alvarado", position: "Vice President",  photo: "photos/vice-president.jpg" },
  { name: "Glayza Malan", position: "Secretary",       photo: "photos/secretary.jpg" },
  { name: "Rose Gelyn Guilleno", position: "Treasurer",       photo: "photos/treasurer.jpg" },
  { name: "Glyza Aleah Tolentino", position: "Auditor",         photo: "photos/auditor.jpg" },
  { name: "Gieshan Alcantara", position: "1st Year Representative", photo: "photos/1styr-rep.jpg" },
  { name: "Ariane Nicole Acedera", position: "1st Year Representative", photo: "photos/1styr-repp.jpg" },
  { name: "Crystelle Joy Brezuela", position: "2nd Year Representative", photo: "photos/2ndyr-rep.jpg" },
  { name: "Eury Dausin", position: "2nd Year Representative", photo: "photos/2ndyr-repp.jpg" },
  { name: "Kyle Lowell Pronto", position: "3rd Year Representative", photo: "photos/3rdyr-rep.jpg" },
  { name: "Neil Clarence Montana", position: "4th Year Representative", photo: "photos/4thyr-rep.jpg" }
];

/* ---------- MOTTO (shown on the landing page) ---------- */
const MOTTO = ["EXCELLENCE", "INNOVATION", "INTEGRITY"];

/* ---------- EVENTS ----------
   status: "upcoming" or "done"     date: any text
   photos: 2 to 3 files inside photos/events/  (missing photos show a colored placeholder)
   description: shown when a visitor clicks the event. Edit these to match the real event. */
const EVENTS = [
  {
    title: "BSIT Freshmen Day", date: "TBA", status: "upcoming",
    description: "A welcome event for the incoming BSIT students, where the Alliance introduces its officers, activities, and the BSIT community."
  },
  {
    title: "Alliance Membership Drive", date: "April 2027", status: "upcoming",
    description: "A drive that invites BSIT students to officially join the Alliance and take part in its projects."
  },
  {
    title: "17th Founding Anniversary: Mobile Legends Tournament", date: "June 2026", status: "done",
    photos: ["photos/events/mlbb-1.jpg", "photos/events/mlbb-2.jpg", "photos/events/mlbb-3.jpg"],
    description: "An esports tournament held for the PUP Calauan Campus' 17th Founding Anniversary, where teams from all programs of PUPC community competed in Mobile Legends."
  },
  {
    title: "Balik Sinta 2026: BSIT Alliance Booth", date: "August 25, 2026", status: "done",
    photos: ["photos/events/balik-sinta-booth-1.jpg", "photos/events/balik-sinta-booth-2.jpg", "photos/events/balik-sinta-booth-3.jpg"],
    description: "The Alliance's booth during Balik Sinta 2026, where officers and members met students and shared what BSIT Alliance is about."
  },
  {
    title: "Balik Sinta 2026: BSIT Exhibit", date: "2026", status: "done",
    photos: ["photos/events/balik-sinta-exhibit-1.jpg", "photos/events/balik-sinta-exhibit-2.jpg"],
    description: "The BSIT exhibit at Balik Sinta 2026, showcasing the projects and work of BSIT students."
  }
];

/* ---------- ANNOUNCEMENTS (newest first) ---------- */
const ANNOUNCEMENTS = [
  { title: "Welcome to the new Alliance website", date: "March 2026", body: "Announcements, events, and officer updates will be posted here." }
];

/* ---------- FUNDS (summary only, this site is public) ---------- */
const FUNDS = {
  asOf: "November 2026",
  collected: 9070,
  spent: 8161.25
};
