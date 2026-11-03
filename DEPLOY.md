# Deploying the Vistaaram store

**Where things run**

| Piece | Host | Address |
|---|---|---|
| Storefront (Next.js) | Vercel | `store.vistaaram.in` while testing, `vistaaram.in` after cutover |
| Medusa backend + admin, Postgres, Redis | New Oracle Cloud VM (Docker) | `api.vistaaram.in` (admin at `/app`) |
| Product images | Oracle Object Storage, public bucket | `vistaaram-media` |
| Database backups | Oracle Object Storage, **private** bucket | `vistaaram-backups` |

> **Your WordPress site keeps running untouched.** Everything below creates *new* resources in a
> *separate* compartment and network, and only *adds* DNS records. Never edit or delete the existing
> WordPress instance, its VCN/security lists, or the `@`/`www` DNS records until you decide to switch.

Commands in grey boxes run on the new VM over SSH unless they say otherwise.

---

## Which setup? (read first)

- **Shared server (what Vistaaram uses):** the store backend runs in Docker on the *existing*
  CyberPanel/WordPress VM, because that VM already uses the whole Always Free ARM allowance and
  190 GB of the 200 GB free disk. Follow **"Shared CyberPanel server"** just below, then Parts 5, 8,
  9 and 10. Skip Parts 1–4, 6 and 7.
- **Dedicated server:** a new VM with Caddy for HTTPS — Parts 1–10 as written.

## Shared CyberPanel server

Nothing here restarts the VM or touches the WordPress site's files, database or domains.
The store's containers listen on `127.0.0.1` only and have memory limits (about 5 GB in total).

**1. Docker (on the VM, over SSH or CyberPanel → Terminal)**

```bash
docker --version || (curl -fsSL https://get.docker.com | sudo sh)
sudo usermod -aG docker $USER   # then log out and back in
df -h /                         # need ~15 GB free for images and the database
```

**2. Code and settings**

```bash
cd ~ && git clone https://github.com/Kjeez/vistaaram.git
cd vistaaram/backend/deploy && cp env.example .env && chmod 600 .env
nano .env    # fill in as described in Part 7 (API_DOMAIN=api.vistaaram.in etc.)
docker compose up -d --build          # no "--profile standalone": Caddy is not used here
curl -s http://127.0.0.1:9000/health  # prints OK when the backend is up
```

**3. api.vistaaram.in in Cloudflare** (DNS for vistaaram.in is managed there)

- DNS → Add record: **A**, name `api`, IPv4 = the VM's public IP, Proxy status **Proxied**.
- SSL/TLS → Overview: mode **Full (strict)** works once step 4 issues a certificate; use **Full**
  until then. Don't change any existing record.

**4. api.vistaaram.in in CyberPanel** (web UI, usually `https://<server-ip>:8090`)

1. **Websites → Create Website**: domain `api.vistaaram.in`, any package/owner, any PHP version.
2. **SSL → Manage SSL** → select `api.vistaaram.in` → **Issue SSL**.
3. **Websites → List Websites → api.vistaaram.in → Manage → vHost Conf**, add at the end:

   ```
   extprocessor medusa {
     type                    proxy
     address                 127.0.0.1:9000
     maxConns                200
     initTimeout             60
     retryTimeout            0
     respBuffer              0
   }
   ```
4. Same page → **Rewrite Rules**, set:

   ```
   REWRITERULE ^(.*)$ HTTP://medusa/$1 [P,L,E=PROXY-HOST:api.vistaaram.in]
   ```
5. Check: `https://api.vistaaram.in/health` shows `OK`, and `https://api.vistaaram.in/app` shows
   the admin login. If the admin login page loads but logging in fails, tell your developer — the
   proxy may need to pass `X-Forwarded-Proto: https`.

Then continue with **Part 8** (load store data, using `docker compose exec` exactly as written),
**Part 9** (Vercel) and **Part 10**. Backups: Part 8's backup script works as-is.

## Part 1 — Check free capacity (5 min)

Oracle's Always Free tier includes a fixed amount of Ampere (ARM) capacity, shared by all VMs in the
account: historically **4 OCPUs and 24 GB RAM in total**.

1. Oracle console → ☰ → **Compute → Instances**. Select the compartment your WordPress VM is in.
2. Open the WordPress instance and note its **Shape** and its **OCPU / memory**.
   - If it is `VM.Standard.A1.Flex` using, say, 1 OCPU / 6 GB, you have 3 OCPU / 18 GB left.
   - If it is `VM.Standard.E2.1.Micro` (AMD), it does not use the ARM allowance.
3. The store VM needs **2 OCPUs / 12 GB** (minimum 1 OCPU / 6 GB with swap). If there is not
   enough free ARM capacity left, stop here and tell me. Do **not** resize the WordPress VM.

## Part 2 — Separate compartment (2 min)

☰ → **Identity & Security → Compartments → Create Compartment**
- Name: `vistaaram-store`, description: "Medusa store backend". Parent: root.

Create everything below inside `vistaaram-store`.

## Part 3 — Network (5 min)

☰ → **Networking → Virtual Cloud Networks** → compartment `vistaaram-store` → **Start VCN Wizard**
→ **Create VCN with Internet Connectivity**.
- Name: `vistaaram-store-vcn`. Keep the default CIDR blocks. Create.

Open the web ports on this new VCN only:
1. Open `vistaaram-store-vcn` → **Security Lists** → **Default Security List for vistaaram-store-vcn**.
2. **Add Ingress Rules** twice:
   - Source CIDR `0.0.0.0/0`, IP Protocol TCP, Destination port `80`
   - Source CIDR `0.0.0.0/0`, IP Protocol TCP, Destination port `443`
   (Port 22 for SSH is already open by default.)

## Part 4 — Create the VM (10 min)

☰ → **Compute → Instances → Create instance**, compartment `vistaaram-store`:
- Name: `vistaaram-api`
- Image: **Canonical Ubuntu 24.04** (or 22.04)
- Shape: **Ampere → VM.Standard.A1.Flex**, **2 OCPUs, 12 GB** memory
- Networking: `vistaaram-store-vcn`, **public subnet**, *Assign a public IPv4 address* ✔
- SSH keys: **Generate a key pair for me** → **Save private key** (keep this file safe; it is the
  only way to log in)
- Boot volume: 50 GB is plenty. (The free tier's 200 GB total is shared with WordPress's disk.)
- Create. If you see **"Out of capacity"**, try again later or pick another availability domain.

When it is running, copy its **Public IP address**.

> Recommended: make the IP permanent. ☰ → Networking → **Reserved Public IPs** → Reserve, then on
> the instance → Attached VNICs → IPv4 Addresses → edit → switch to the reserved IP. Otherwise the
> IP can change if the VM is stopped.

## Part 5 — Object Storage buckets and keys (10 min)

1. ☰ → **Governance & Administration → Tenancy details** → copy the **Object storage namespace**
   (a short random string). Note your region identifier, e.g. `ap-mumbai-1` or `ap-hyderabad-1`.
2. ☰ → **Storage → Buckets** → compartment `vistaaram-store`:
   - **Create Bucket** `vistaaram-media`. Then open it → **Edit Visibility → Public** (✔ allow
     listing: *off*). Product images must be public.
   - **Create Bucket** `vistaaram-backups`. Leave it **Private**.
3. Profile icon (top right) → **My profile → Customer secret keys → Generate secret key**,
   name `vistaaram-store`. Copy the **secret** immediately (shown once) and the **Access key**.

## Part 6 — DNS (5 min, at wherever `vistaaram.in` DNS is managed)

**Add** one record, do not change any existing ones:

| Type | Name | Value |
|---|---|---|
| A | `api` | the VM's public IP |

The storefront record (`store`) is added in Part 9, when Vercel tells you the value.

## Part 7 — Set up the VM (20 min)

From your PC (PowerShell), log in with the private key you saved:

```bash
ssh -i path\to\ssh-key.key ubuntu@<VM-PUBLIC-IP>
```

On the VM:

```bash
# 1. Updates, Docker, firewall ports (Oracle's Ubuntu images block 80/443 in iptables by default)
sudo apt-get update && sudo apt-get -y upgrade
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker ubuntu
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
sudo netfilter-persistent save

# 2. 4 GB swap (helps the first build on a small VM)
sudo fallocate -l 4G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

exit
```

Log in again (so the `docker` group applies), then get the code and configure it:

```bash
git clone https://github.com/Kjeez/vistaaram.git
cd vistaaram/backend/deploy
cp env.example .env
openssl rand -hex 32   # run 3 times: POSTGRES_PASSWORD, JWT_SECRET, COOKIE_SECRET
nano .env              # fill in every value (see notes below), Ctrl+O to save, Ctrl+X to exit
chmod 600 .env
```

`.env` notes:
- `S3_ENDPOINT` = `https://<namespace>.compat.objectstorage.<region>.oraclecloud.com`
- `S3_FILE_URL` = `https://objectstorage.<region>.oraclecloud.com/n/<namespace>/b/vistaaram-media/o`
- `S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` = the customer secret key from Part 5
- `S3_REGION` = your region identifier, e.g. `ap-mumbai-1`
- Copy `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` and the four `PHONEPE_*` values from your local
  `backend/apps/backend/.env`. For `PHONEPE_WEBHOOK_USERNAME` / `PHONEPE_WEBHOOK_PASSWORD`, make up a
  username and a long random password (`openssl rand -hex 16`); you enter the same pair at PhonePe in Part 10.

Start everything (the first build takes 5–15 minutes):

```bash
docker compose up -d --build
docker compose logs -f medusa      # wait for "Server is ready on port: 9000", then Ctrl+C
curl https://api.vistaaram.in/health   # should print OK
```

If `curl` fails, check `docker compose logs caddy` — usually DNS has not reached the server yet
(wait 10–30 minutes) or ports 80/443 are not open (Parts 3 and 7).

## Part 8 — Load store data (10 min)

```bash
cd ~/vistaaram/backend/deploy
run() { docker compose exec "$@"; }

# Remove the Medusa template's demo products and Europe region (dry run first, then for real)
run medusa npx medusa exec ./src/scripts/remove-demo-data.js
run -e CONFIRM=yes medusa npx medusa exec ./src/scripts/remove-demo-data.js

# Create the Sambrani product, India region, then COD/shipping/returns setup
run medusa npx medusa exec ./src/scripts/seed-vistaaram.js
run medusa npx medusa exec ./src/scripts/setup-checkout.js

# Your admin login for https://api.vistaaram.in/app (use a strong password)
run medusa npx medusa user -e you@vistaaram.in -p '<strong-password>'

# Values the storefront needs; keep this output for Part 9
run medusa npx medusa exec ./src/scripts/print-storefront-env.js
```

Turn on nightly backups:

```bash
chmod +x backup.sh && mkdir -p backups && ./backup.sh     # test once
(crontab -l 2>/dev/null; echo "30 2 * * * cd $(pwd) && ./backup.sh >> backups/backup.log 2>&1") | crontab -
```

Check the dump appears in the `vistaaram-backups` bucket in the Oracle console.

## Part 9 — Storefront on Vercel (15 min)

1. vercel.com → **Add New → Project** → import `Kjeez/vistaaram`. Framework: Next.js, root
   directory: `./` (the default).
2. **Environment Variables** (Production):

   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | `https://api.vistaaram.in` |
   | `NEXT_PUBLIC_SITE_URL` | `https://store.vistaaram.in` |
   | `NEXT_PUBLIC_STAGING` | `true` (hides the store from Google while WordPress is live) |
   | `NEXT_PUBLIC_GOOGLE_LOGIN_ENABLED` | `true` |
   | the 5 lines printed by `print-storefront-env` | as printed |

3. Deploy. Then **Settings → Domains → Add** `store.vistaaram.in`; Vercel shows a DNS record
   (usually a `CNAME` for `store`). Add exactly that record at your DNS provider.
4. Google Cloud → your OAuth client → **Authorized redirect URIs** → add
   `https://store.vistaaram.in/auth/google/callback` (keep the localhost one for development).

## Part 10 — Product images and final checks (10 min)

Move product images to Object Storage (needs the storefront from Part 9 to be live):

```bash
cd ~/vistaaram/backend/deploy
docker compose exec -e IMAGE_SOURCE_URL=https://store.vistaaram.in medusa \
  npx medusa exec ./src/scripts/migrate-product-images.js
```

### Store emails (Google Workspace)

Order confirmations, shipped emails, password resets and new-order alerts are sent as
`sales@vistaaram.in` through the Gmail API. This needs a Google Cloud "service account" that your
Workspace admin authorises once — no mailbox password is stored anywhere. Do this logged in as the
**Workspace admin** for vistaaram.in.

1. console.cloud.google.com → create (or pick) a project, e.g. `vistaaram-store`.
2. **APIs & Services → Library** → search **Gmail API** → **Enable**.
3. **IAM & Admin → Service Accounts → Create service account**: name `vistaaram-mailer`, no roles
   needed → Done. Open it → **Keys → Add key → Create new key → JSON** → a `.json` file downloads.
   Keep this file private (it lets the store send email as you).
   - If Google says key creation is disabled by an organisation policy, the admin must allow it:
     **IAM & Admin → Organization policies → "Disable service account key creation"** → override
     for this project.
4. On the service account's **Details** tab, copy the **Unique ID** (a long number).
5. admin.google.com → **Security → Access and data control → API controls → Manage Domain Wide
   Delegation → Add new**: Client ID = that Unique ID, OAuth scope
   `https://www.googleapis.com/auth/gmail.send` → **Authorise**. (Can take a few minutes to apply.)
6. Turn the JSON file into one line for `.env`. On your PC (PowerShell, in the download folder):
   `[Convert]::ToBase64String([IO.File]::ReadAllBytes("the-key-file.json")) | Set-Clipboard`
   Paste it as `GMAIL_SERVICE_ACCOUNT_KEY_BASE64=` in the VM's `.env` (and your local
   `backend/apps/backend/.env` to test locally), then `docker compose up -d`.
7. Recommended for inbox delivery: admin.google.com → **Apps → Google Workspace → Gmail →
   Authenticate email** → generate the DKIM record, add it at your DNS provider, **Start authentication**.
8. Test: place a COD order — the customer address and `sales@vistaaram.in` should both get an email.
   If not, `docker compose logs medusa | grep -i gmail` shows Google's error.

### PhonePe payment notifications (webhook)

So orders still get confirmed when a shopper pays but closes the browser before returning:

1. Log in at business.phonepe.com with **Test Mode OFF** (live).
2. **Developer Settings → Webhook → Create Webhook**:
   - URL: `https://api.vistaaram.in/hooks/payment/phonepe_phonepe`
   - Username / Password: the `PHONEPE_WEBHOOK_USERNAME` / `PHONEPE_WEBHOOK_PASSWORD` from the VM `.env`
   - Events: `checkout.order.completed`, `checkout.order.failed`
3. On the VM: `docker compose up -d` (reloads `.env`) if you changed it after starting.

### Live payment test (real money, refunded afterwards)

PhonePe credentials are live, so the only full test is a real purchase:

1. On `https://store.vistaaram.in`, buy a 1-box pack and pay with **PhonePe** (UPI is quickest).
2. You should land on the order confirmation page; the order shows as paid in the admin.
3. Admin → the order → **Refund** the full amount. PhonePe processes it back to the same UPI/card
   (refund timelines are PhonePe's/your bank's).
4. Check `docker compose logs medusa | grep -i phonepe` for errors if anything looks off.

Then test on your phone at `https://store.vistaaram.in`:
- [ ] Add a pack to the cart, check out with **Cash on Delivery**, see the confirmation page
- [ ] Start a **PhonePe** payment, cancel it on PhonePe's page: you return to "Payment not confirmed"
  and can retry; no order is created
- [ ] The order appears at `https://api.vistaaram.in/app` → Orders
- [ ] Sign up, log in with Google, add an address, heart a product
- [ ] Order confirmation reaches the customer and the new-order alert reaches `sales@vistaaram.in`
- [ ] Forgot password sends an email

## Cutover — when you are ready to replace WordPress

1. Vercel → Domains → add `vistaaram.in` and `www.vistaaram.in`; update those DNS records to
   what Vercel shows. (This is the moment WordPress stops being served; take a WordPress backup first.)
2. Vercel env: `NEXT_PUBLIC_SITE_URL=https://vistaaram.in`, delete `NEXT_PUBLIC_STAGING`, redeploy.
3. VM `.env`: `STOREFRONT_URL=https://vistaaram.in`, add `https://vistaaram.in` to `STORE_CORS` and
   `AUTH_CORS`, then `docker compose up -d`.
4. Google Cloud: add `https://vistaaram.in/auth/google/callback`.

## Everyday operations

```bash
cd ~/vistaaram/backend/deploy
docker compose ps                          # what is running
docker compose logs --tail 100 medusa      # recent backend logs
git -C ~/vistaaram pull && docker compose up -d --build medusa   # deploy new backend code
```

- **Restore a backup:** see the comments at the top of `backend/deploy/backup.sh`.
- **Security:** keep the SSH private key and `.env` private; never commit `.env`. Run
  `sudo apt-get update && sudo apt-get -y upgrade` monthly.
