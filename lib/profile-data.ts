export const CORP_NMLS = "1686046";
export const CORP_VANITY = "www.revolutionmortgage.com";

export type Details = {
  cell: string;
  officePhone: string;
  fax: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  teamName: string;
  applyNow: string;
  dprLink: string;
  vanity: string;
  states: string;
};

export type DetailKey = keyof Details;

export type Person = {
  id: string;
  label: string;
  inYext: boolean;
  name: string;
  email: string;
  title: string;
  nmls: string;
  address: { street: string; city: string; state: string; zip: string };
  details: Details;
  showPhoto: boolean;
};

export type FieldDef = {
  key: DetailKey;
  label: string;
  placeholder?: string;
  hint?: string;
  licensedOnly?: boolean;
  yextManaged?: boolean;
  alwaysShown?: boolean;
};

export const FIELDS: FieldDef[] = [
  { key: "cell", label: "Cell phone", hint: "10-digit US number. No extensions." },
  { key: "officePhone", label: "Office phone", hint: "10-digit US number. No extensions." },
  { key: "fax", label: "Fax", hint: "10-digit US number. No extensions." },
  { key: "linkedin", label: "LinkedIn URL", placeholder: "linkedin.com/in/yourname" },
  { key: "facebook", label: "Facebook URL", placeholder: "facebook.com/yourpage" },
  { key: "instagram", label: "Instagram URL", placeholder: "instagram.com/yourhandle" },
  { key: "teamName", label: "Team name", placeholder: "Optional, 60 characters max" },
  { key: "applyNow", label: "Apply Now link", placeholder: "Your personal application link", licensedOnly: true, yextManaged: true },
  { key: "dprLink", label: "Down Payment Resource link", placeholder: "Your DPR link", licensedOnly: true },
  { key: "vanity", label: "Personal web page", placeholder: CORP_VANITY, licensedOnly: true, yextManaged: true, alwaysShown: true },
  { key: "states", label: "Licensed states", placeholder: "FL, OH", hint: "Two-letter state codes separated by commas.", licensedOnly: true, yextManaged: true },
];

const empty: Details = {
  cell: "",
  officePhone: "",
  fax: "",
  linkedin: "",
  facebook: "",
  instagram: "",
  teamName: "",
  applyNow: "",
  dprLink: "",
  vanity: "",
  states: "",
};

export const PEOPLE: Person[] = [
  {
    id: "lo",
    label: "Jordan Sample: licensed loan officer",
    inYext: true,
    name: "Jordan Sample",
    email: "jsample@revolutionmortgage.com",
    title: "Loan Officer",
    nmls: "123456",
    address: { street: "100 Example Way, Suite 200", city: "Tampa", state: "FL", zip: "33602" },
    details: {
      ...empty,
      cell: "813-555-0142",
      officePhone: "813-555-0100",
      linkedin: "https://linkedin.com/in/jsample",
      teamName: "The Sample Team",
      applyNow: "https://apply.example.com/jsample",
      vanity: "www.revolutionmortgage.com/jsample",
      states: "FL, OH",
    },
    showPhoto: false,
  },
  {
    id: "lo3",
    label: "Morgan Blank: licensed, in Yext, nothing set in Yext",
    inYext: true,
    name: "Morgan Blank",
    email: "mblank@revolutionmortgage.com",
    title: "Loan Officer",
    nmls: "777001",
    address: { street: "10 Demo Lane", city: "Tampa", state: "FL", zip: "33602" },
    details: { ...empty },
    showPhoto: false,
  },
  {
    id: "newhire",
    label: "Taylor Newhire: new hire, nothing filled in",
    inYext: false,
    name: "Taylor Newhire",
    email: "tnewhire@revolutionmortgage.com",
    title: "Loan Officer",
    nmls: "777002",
    address: { street: "250 Sample Blvd", city: "Columbus", state: "OH", zip: "43215" },
    details: { ...empty },
    showPhoto: false,
  },
  {
    id: "branch",
    label: "Avery Branch: no personal NMLS, no address yet",
    inYext: false,
    name: "Avery Branch",
    email: "abranch@revolutionmortgage.com",
    title: "Branch Office Coordinator",
    nmls: CORP_NMLS,
    address: { street: "", city: "", state: "", zip: "" },
    details: { ...empty, cell: "919-555-0123" },
    showPhoto: false,
  },
  {
    id: "lo2",
    label: "Riley Example: licensed, no Yext profile",
    inYext: false,
    name: "Riley Example",
    email: "rexample@revolutionmortgage.com",
    title: "Mortgage Advisor",
    nmls: "654321",
    address: { street: "250 Sample Blvd", city: "Columbus", state: "OH", zip: "43215" },
    details: { ...empty, cell: "614-555-0177" },
    showPhoto: false,
  },
  {
    id: "noNmlsYext",
    label: "Sam Support: no personal NMLS, has a Yext profile",
    inYext: true,
    name: "Sam Support",
    email: "ssupport@revolutionmortgage.com",
    title: "Loan Officer Assistant",
    nmls: CORP_NMLS,
    address: { street: "250 Sample Blvd", city: "Columbus", state: "OH", zip: "43215" },
    details: {
      ...empty,
      cell: "614-555-0188",
      applyNow: "https://apply.example.com/ssupport",
      vanity: "www.revolutionmortgage.com/ssupport",
      states: "OH",
    },
    showPhoto: false,
  },
  {
    id: "corp",
    label: "Casey Demo: unlicensed corporate",
    inYext: false,
    name: "Casey Demo",
    email: "cdemo@revolutionmortgage.com",
    title: "Operations Analyst",
    nmls: CORP_NMLS,
    address: { street: "1 Corporate Plaza", city: "Example City", state: "FL", zip: "33000" },
    details: { ...empty, officePhone: "813-555-0199" },
    showPhoto: false,
  },
];

export const isLicensed = (p: Person) => p.nmls !== CORP_NMLS;
