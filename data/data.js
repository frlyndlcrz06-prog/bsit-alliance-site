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
  { name: "Gieshan Alcantara", position: "1st Year Representative", photo: "photos/1styr-rep.jpg" }
  { name: "Ariane Nicole Acedera", position: "1st Year Representative", photo: "photos/1styr-repp.jpg" }
  { name: "Crystelle Joy Brezuela", position: "2nd Year Representative", photo: "photos/2ndyr-rep.jpg" }
  { name: "Eury Dausin", position: "2nd Year Representative", photo: "photos/2ndyr-repp.jpg" }
  { name: "Kyle Lowell Pronto", position: "3rd Year Representative", photo: "photos/3rdyr-rep.jpg" }
  { name: "Neil Clarence Montana", position: "4th Year Representative", photo: "photos/4thyr-rep.jpg" }
];

/* ---------- EVENTS ----------
   status: "upcoming" or "done"     date: any text, like "November 16, 2026" */
const EVENTS = [
  { title: "BSIT Freshmen Day",                 date: "TBA", status: "upcoming" },
  { title: "Balik Sinta 2026: BSIT Alliance Booth",   date: "", status: "done" },
  { title: "Balik Sinta 2026: BSIT Exhibit",          date: "", status: "done" }
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
