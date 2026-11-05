import "server-only";
import { headers } from "next/headers";

// The person viewing the site, when it runs behind RevStack sign-in.
//
// RevStack's sign-in step checks every request before it reaches the app and passes the
// person's identity along in request headers, removing any a visitor tried to send
// themselves. RevStack sets REVSTACK_SIGN_IN only when that step is in front of the app,
// so on a public site, in Builder.io Fusion or on a laptop this returns null instead of
// trusting headers anyone could send.

export type User = {
  email: string;
  // The person's Microsoft sign-in name, usually the same as their email.
  username: string;
  // Their Microsoft Entra user ID, which never changes even if their email does.
  id: string;
  // A token for Microsoft Graph that reads their own profile (User.Read). Keep it on the
  // server; never send it to the browser.
  graphToken: string | null;
};

export async function currentUser(): Promise<User | null> {
  if (process.env.REVSTACK_SIGN_IN !== "true") return null;
  const h = await headers();
  const email = h.get("x-forwarded-email");
  if (!email) return null;
  return {
    email,
    username: h.get("x-forwarded-preferred-username") ?? email,
    id: h.get("x-forwarded-user") ?? "",
    graphToken: h.get("x-forwarded-access-token"),
  };
}
