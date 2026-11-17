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
   id:     short name with no spaces (used in the page link, so never change it after sharing)
   status: "upcoming" or "done"
   photos: shots("name", 12) loads photos/events/name-1.jpg, name-2.jpg ... up to 12.
           Photos that don't exist are skipped, so just add files and name them in order.
   description: the summary shown on the event's page. Edit these to match the real event. */
function shots(name, max) {
  var list = [];
  for (var i = 1; i <= max; i++) list.push("photos/events/" + name + "-" + i + ".jpg");
  return list;
}

const EVENTS = [
  {
    id: "freshmen-day", title: "BSIT Freshmen Day", date: "TBA", status: "upcoming",
    description: "A welcome event for the incoming BSIT students, where the Alliance introduces its officers, activities, and the BSIT community."
  },
  {
    id: "membership-drive", title: "Alliance Membership Drive", date: "April 2027", status: "upcoming",
    description: "The yearly drive that invites BSIT students to officially join the Alliance and take part in its projects."
  },
  {
    id: "mlbb", title: "17th Founding Anniversary: Mobile Legends Tournament", date: "2026", status: "done",
    photos: shots("mlbb", 12),
    description: "An esports tournament held for the Alliance's 17th Founding Anniversary, where teams from the BSIT community competed in Mobile Legends."
  },
  {
    id: "balik-sinta-booth", title: "Balik Sinta 2026: BSIT Alliance Booth", date: "2026", status: "done",
    photos: shots("balik-sinta-booth", 12),
    description: "The Alliance's booth during Balik Sinta 2026, where officers and members met students and shared what BSIT Alliance is about."
  },
  {
    id: "balik-sinta-exhibit", title: "Balik Sinta 2026: BSIT Exhibit", date: "2026", status: "done",
    photos: shots("balik-sinta-exhibit", 12),
    description: "The BSIT exhibit at Balik Sinta 2026, showcasing the projects and work of BSIT students."
  }
];

/* ---------- APPROVAL LETTERS ----------
   file: the PDF inside the letters/ folder (lowercase, no spaces, like letters/mlbb-approval.pdf)
   Delete any line whose PDF you haven't added yet. */
const LETTERS = [
  { title: "Approval Letter: BSIT Official Departmental Shirt",           date: "2026", file: "letters/bsit-official-dept-shirt-approval.pdf" }
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