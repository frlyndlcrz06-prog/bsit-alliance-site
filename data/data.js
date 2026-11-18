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
    id: "freshmen-day", title: "BSIT Freshmen Day", date: "November 24, 2026", when: "2026-11-24T08:00", status: "upcoming",
    description: "A welcome event for the incoming BSIT students, where the Alliance introduces its officers, activities, and the BSIT community."
  },
  {
    id: "membership-drive", title: "Alliance Membership Drive", date: "April 2027", when: "2027-04-10T08:00", status: "upcoming",
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
  { title: "Welcome to the new Alliance website", date: "November 2026", tag: "Notice", isNew: true, body: "Announcements, events, and officer updates will be posted here." }
];

/* ---------- FUNDS (summary only, this site is public) ---------- */
const FUNDS = {
  asOf: "September 2026",
  collected: 9070,
  spent: 8161.25
};


/* ---------- FINANCIAL REPORT ----------
   Each row is: [date, description, income, expense, balance after the row]
   Use 0 where there is no income or no expense. */
const REPORT = {
  asOf: "Sept 2026",
  running: [
    { category: "Total Income", amount: 9070, note: "Total Accumulated Income" },
    { category: "Total Expenses", amount: 8161.25, note: "Total Expenditures Incurred" },
    { category: "Current Alliance Funds", amount: 908.75, note: "Remaining Balance Available for Future BSIT Alliance Activities and Programs.", highlight: true }
  ],
  sections: [
    {
      title: "Alliance Merch & Shirts",
      rows: [
        ["May 2026", "Alliance Shirt Contributions (₱350 x 10)", 3500, 0, 3500],
        ["May 2026", "Shirt Payment", 0, 3500, 0],
        ["May 2026", "Merch Contributions (₱50 x 9)", 450, 0, 450],
        ["May 2026", "Button Pins Expense (50 pcs + ₱44 sf)", 0, 294, 156],
        ["May 2026", "Sales of Merch (Batch 1 - 50 pcs @ ₱20)", 1000, 0, 1156],
        ["June 2026", "New Order of Merch (200 pcs + ₱104 sf)", 0, 1104, 52]
      ]
    },
    {
      title: "Founding Anniversary: Mobile Legends Tournament",
      rows: [
        ["June 2026", "Registration Fees (20 teams x ₱100)", 2000, 0, 2052],
        ["June 2026", "Event Expenses (Badges, Candies, Certs, Water, Burgers, Prizes, TV, Editor App)", 0, 1518, 534]
      ]
    },
    {
      title: "Balik Sinta Event",
      rows: [
        ["June 2026", "Founding Anniv Pin Sales (Batch 2 - 53 pcs x ₱20)", 1060, 0, 1594],
        ["August 2026", "Event Expenses (Food - Free Sopas & Materials)", 0, 1256.25, 337.75],
        ["August 2026", "Balik Sinta Pin Sales (Batch 2 - 34 pcs x ₱20)", 680, 0, 1017.75]
      ]
    },
    {
      title: "IT Activities & Merch Transactions (September 2026)",
      rows: [
        ["Sept. 8, 2026", "Sales of Merch (Button Pins - 5 pcs @ ₱20)", 100, 0, 1117.75],
        ["Sept. 9, 2026", "Cartolina Purchase (3 pcs @ ₱10)", 0, 30, 1087.75],
        ["Sept. 9, 2026", "Printing Expense (IT Homeroom Officers' Photos)", 0, 78, 1009.75],
        ["Sept. 11, 2026", "Cartolina Purchase (9 pcs @ ₱7)", 0, 63, 946.75],
        ["Sept. 14, 2026", "Birthday Banner", 0, 18, 928.75],
        ["Sept. 16, 2026", "Cleaning Brushes (50 pcs @ ₱6)", 0, 300, 628.75],
        ["Sept. 24, 2026", "Sales of Merch (Button Pins - 14 pcs @ ₱20)", 280, 0, 908.75]
      ]
    }
  ]
};


/* ---------- ABOUT US ---------- */
const EMAIL = "pupcc.bsitalliance@gmail.com";

const ABOUT = {
  preamble: "We, the BSIT Alliance of Polytechnic University of the Philippines, Calauan Campus imploring the aid of the Divine Providence, in full awareness of the nature and the extent to which we hereby bind ourselves towards fulfilling the ideas of democratic, participatory, student government under the guiding principle of unity in diversity as we unite to establish a federated alliance, do hereby ordain and promulgate this Constitution and By-Laws.",
  objectives: [
    "To establish an enduring BSIT Alliance that shall promote free, progressive, democratic and responsive alliance in PUP Calauan Campus.",
    "To uphold and protect BSIT student's rights, interest and welfare.",
    "To promote cooperation and good fellowship among Academic and Non-academic Organization BSIT Alliance, and with the University as a whole.",
    "To enhance the spirit of leadership and camaraderie.",
    "To establish the unification of all Academic and Non-Academic organization."
  ]
};