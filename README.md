# Revolution Mortgage site starter

Start here to build a website in Builder.io Fusion and put it on **RevStack**, RM's own
hosting. You don't set up servers, a database or a web address. Make a copy of this
repository, connect it to Fusion, and every change you make shows up at its own web
address.

## 1. Make your own copy

1. On this page, click **Use this template** → **Create a new repository**.
2. **Owner:** `revolutionmortgage`. **Visibility:** Private.
3. **Repository name:** this becomes your site's web address, so pick it carefully. Use
   2 to 30 lowercase letters, numbers and single hyphens, starting with a letter. For
   example, `branch-scorecard` becomes `branch-scorecard.dev.revstack.run`.
4. Click **Create repository**.

Within a few minutes your copy is live on its own (see step 4).

## 2. Connect it to Builder.io Fusion

1. In Builder.io, open the **Projects** page and click **Connect Repo**.
2. Pick your new repository from the list.
3. Choose **Setup Visual Editing**, then **Start Auto Setup**.
4. Fusion asks for environment variables. **Leave them empty.** The site brings its own
   database (below).
5. Click **Finish Setup**.
6. Recommended: on the project's tile, open the settings wheel → **Advanced Settings**
   and set **Commit Mode** to **Pull Requests**. Then every change you send gets its
   own test copy of the site before it goes live.

## 3. Build and send your changes

- Prompt Fusion as usual. When you're happy, click **Send PR**. That opens a
  **pull request**: a proposed change waiting to be accepted.
- Every pull request gets a **preview**, a private test copy of your site with its own
  empty database. Its address is your site's name plus `-pr-` and the pull request
  number, for example `branch-scorecard-pr-3.dev.revstack.run`.
- **Merge** the pull request in GitHub to accept the change. The preview and its
  database are deleted, and your real site updates.

You never set up a database. Inside Fusion and on a laptop the site runs a small
Postgres database inside itself. On RevStack it uses a real one.

## 4. Find your site

| Address | What it is | Who can open it |
|---|---|---|
| `<name>-pr-<number>.dev.revstack.run` | a preview of one pull request | RM staff, after Microsoft sign-in |
| `<name>.dev.revstack.run` | the test copy of your site, updated on every merge | RM staff, after Microsoft sign-in |
| `<name>.app.revstack.run` | the live site, updated after the test copy | RM staff after sign-in, or everyone if it's public |

To see whether a deploy worked, open your repository's **Actions** tab. Each run ends by
printing the site's address. A red X means it failed; open it to see why.

## Settings you might change

All of them live in `revstack.toml` in your repository. Ask Fusion to change them, or
edit the file in GitHub.

- **Make the live site public.** Remove the `#` in front of `public = true`. Test copies
  and previews always require sign-in, whatever this says.
- **Use your own domain,** such as `www.example.com`. Add it to `domains`. After the next
  merge, the Actions run lists the DNS records to add at the domain's DNS host. The
  domain starts working a few minutes after they're in place. If you opened the domain
  before adding the records, your computer may remember "not found" for a while; check
  it from your phone instead. Own domains are for public sites only for now.
- **Know who is signed in.** Sites behind sign-in can see the person's name and email;
  the `/me` page shows how (`lib/user.ts`).

## Rules

- **No borrower information** (anything about a real loan or applicant) on test copies,
  previews or in Fusion. Use made-up data.
- A site that will handle borrower information needs Engineering's review before you
  build it.
- Deleting your repository does not delete your live site's data. Ask Engineering.

Questions: Mike Ryan or the Engineering team.

---

For developers: `pnpm dev` runs the site on your computer, with the built-in database.
`docker compose up` runs it against a real Postgres instead. How the site runs on
RevStack is in `revstack.toml` and `.github/workflows/revstack.yml`.
