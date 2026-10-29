import {
  FIELDS,
  PEOPLE,
  type DetailKey,
  type Details,
  type Person,
} from "@/lib/profile-data";

export type Profile = Person & { show: Record<DetailKey, boolean> };
export type Session = { personId: string; email: string };
export type DemoPerson = { id: string; label: string };
export type ProfileUpdate = {
  details: Details;
  show: Record<DetailKey, boolean>;
  showPhoto: boolean;
};

const allShown = () =>
  Object.fromEntries(FIELDS.map((f) => [f.key, true])) as Record<DetailKey, boolean>;

const store = new Map<string, Profile>(
  PEOPLE.map((p) => [p.id, { ...p, details: { ...p.details }, show: allShown() }])
);
let session: Session | null = null;

const delay = () => new Promise((r) => setTimeout(r, 150));
const copy = (p: Profile): Profile => ({ ...p, details: { ...p.details }, show: { ...p.show } });

function requireProfile(personId: string): Profile {
  const p = store.get(personId);
  if (!p) throw new Error(`Unknown profile: ${personId}`);
  return p;
}

export async function listDemoPeople(): Promise<DemoPerson[]> {
  return PEOPLE.map(({ id, label }) => ({ id, label }));
}

export async function getSession(): Promise<Session | null> {
  return session;
}

export async function signIn(personId: string): Promise<Session> {
  await delay();
  session = { personId, email: requireProfile(personId).email };
  return session;
}

export async function signOut(): Promise<void> {
  session = null;
}

export async function getProfile(personId: string): Promise<Profile> {
  await delay();
  return copy(requireProfile(personId));
}

export async function saveProfile(personId: string, update: ProfileUpdate): Promise<Profile> {
  await delay();
  const current = requireProfile(personId);
  const next: Profile = {
    ...current,
    details: { ...update.details },
    show: { ...update.show },
    showPhoto: update.showPhoto,
  };
  store.set(personId, next);
  return copy(next);
}
