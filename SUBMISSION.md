# moonlit-tarot
AI tarot readings for reflection
# Ship It: submit your product on Shipped.money

Start here: https://shipped.money/submit

Submission 1: working product + custom domain + GitHub.
Submission 2: Clarity + Google Search Console + live payment provider, on the same project.

## 1. One project per team

Choose one teammate to submit and connect the repository, using the same college email they used on Shipyard. You do not need to add teammates again on Shipped. Instructors will match your submission to your existing Shipyard team later. Do not create duplicate projects or submissions for the same team.

## 2. Open shipped.money/submit

Click Start submission and sign in with your college email. Open the sign-in link in the same browser. On your first visit, create your short profile, then continue. Choose an existing project or enter your product name and live website address.

## 3. Use your own domain

Submit an HTTPS custom domain such as myproduct.in or app.myproduct.in. A university-assigned custom domain is also fine. Default addresses ending in .lovable.app, .vercel.app or similar hosting domains do not count. You may still build with Lovable and host on Vercel; connect your domain in the host’s domain settings. Wait for DNS and HTTPS to work before submitting.

## 4. Connect the product’s GitHub repository

Paste the repository link. Click Create read-only GitHub key. GitHub opens with the name and read permissions filled in. Select Only select repositories, choose this product’s repository, and generate the token. Copy the key into the protected field on Shipped. Leave Contents, Metadata and Pull requests on Read-only. The repository owner should do this step; private repositories are supported. Organisation repositories may need owner approval.

## 5. Tell us what to test, then submit

Describe one core task and the result to expect, such as Create an invoice and download its PDF. Test it yourself in a private/incognito browser window. If login is needed, explain how the instructor can request an invitation. Do not put passwords, API keys or customer data in these notes. Submitting publishes your Shipped.money project and connected progress, including search, analytics and payment totals. Credentials and code-review findings stay private. Confirm the checkbox and click Submit working product.

## 6. Check your submission

You should see Working product · submission received and the date. Your submission time is saved before website or GitHub checks finish. Check the status of each requirement. A pending connection still needs fixing; a reachable website still needs instructor review of its core task. If your app link or repository changes, use Update or finish this submission. Your earlier submission remains on record.

## 7. Save your analytics and payment setup

Open shipped.money/app/submit using your college email. Click Continue submission on your app card and scroll to Your connections. Use Set up Clarity and Set up Search Console, then Choose payment provider. The full Clarity walkthrough is at shipped.money/submit/clarity. The full Search Console walkthrough is at shipped.money/submit/search-console and included in this download. For PhonePe, select PhonePe in the payment-provider dropdown and describe your checkout and setup status for review. Return to this same page, confirm the checkbox, and click Submit tracking setup. You should see Tracking submission received and the date. Once submitted, the page checks your connections automatically; you do not need to resubmit when a connection recovers. You do not need these connections for submission 1.

## Launch tracking notes

- Microsoft Clarity: follow shipped.money/submit/clarity. Install the tracking script on your published app, verify a visit in its dashboard, then open that same project → Settings → Data Export → Generate new API token. Only project admins can generate it. Paste the whole token in Shipped’s private Clarity field, not the project ID or script. Connecting a token alone does not install the tracker.
- PostHog is optional. If you already use it, connect your numeric project ID, matching US/EU region and a project-restricted personal API key with Query Read permission. The public phc_ capture token cannot read reports. This connection is not required for your course submission.
- Google Search Console: follow the complete walkthrough at shipped.money/submit/search-console. It explains Domain versus URL-prefix verification, the MU organization choice, read-only service-account access, the exact property value and JSON field, and the receipt. Search Console measures Google Search activity, not all website visits. Zero traffic is fine; a failed connection still needs fixing.
- Payments: connect Dodo or the supported provider you use, using the least-privileged credential offered. Use the live account, not a sandbox/test key. Successful connection is separate from a real customer payment; you do not need to make a payment to yourself.
- PhonePe: select PhonePe in the tracking submission form. Explain where checkout is on your product and what works or is pending, including merchant approval. You can submit while setup is in progress. These details go to your instructor; Shipped does not yet import PhonePe transactions or include them in verified revenue leaderboards. Do not paste PhonePe credentials into the notes.
- Paste each key only into its protected connection field. Never send keys in WhatsApp, email, GitHub commits, screenshots or submission notes.

## Google Search Console: step-by-step setup

Google Search Console (GSC) reports how people find your product through Google Search: clicks, impressions and search position. It does not count every website visit. For this submission, connect your real website; you do not need traffic, customers or sales.

Web version: https://shipped.money/submit/search-console

### 1. Open your existing Shipped project

- Open shipped.money/app/submit and sign in with the same college email used for submission 1. Choose your existing project and click Continue to submission. Do not create another project for submission 2.
- Check that your Working product receipt is present. Scroll to Submission 2 · Launch tracking, then click Connect next to Google Search Console. Keep this Shipped tab open while you complete the Google steps in another tab.

**Check before continuing:** You are connecting tracking for the same product URL you submitted earlier.

[Open my course submission](https://shipped.money/app/submit)

### 2. Add and verify your website in Google Search Console

- Open Google Search Console. Use a Google account that can verify ownership of your product website. If the website is already verified, select that property and continue to step 3.
- For a new website, open the property selector at the top left and choose Add property. Choose Domain if you can edit your domain’s DNS records. Enter only the domain, for example myproduct.in, without https:// or a slash. Add Google’s TXT verification record in your domain provider’s DNS settings, then return to Google and click Verify. Add a new record; do not remove existing DNS records.
- If you cannot edit DNS but can edit and deploy your website, choose URL prefix instead. Match the host in your Shipped project’s submitted Product URL exactly, including www or any subdomain, and use its root URL ending in /, for example https://app.myproduct.in/. Do not use a page path such as /app/ or /dashboard/. Choose HTML tag, copy Google’s verification meta tag into the homepage’s `<head>`, deploy the change, then click Verify. Keep the tag in place after verification.
- For Lovable or another AI builder, ask it: Add this Google Search Console verification meta tag to the homepage `<head>`, preserve it exactly, and deploy it on my live custom domain. Then paste Google’s verification tag into that request. This is a public website verification tag, not your service-account JSON key.
- Verify your product’s domain, not mastersunion.org. If your website uses a university-assigned subdomain and you cannot edit its DNS, use a URL-prefix property for your own live site or ask the domain administrator for help.

**Check before continuing:** Google displays Ownership verified for a property covering your live product URL. Stop here and get help if ownership verification fails.

[Open Google Search Console](https://search.google.com/search-console) · [Google’s ownership-verification instructions](https://support.google.com/webmasters/answer/9008080?hl=en)

### 3. Write down the property value Shipped needs

- For a Domain property named myproduct.in, enter sc-domain:myproduct.in in Shipped’s Search Console property field.
- For a URL-prefix property named https://app.myproduct.in/, enter that exact URL, including https://, any www or subdomain, and the trailing slash. The host must exactly match your submitted Product URL, and the prefix must cover the whole site at /. If your product redirects between www and the bare domain, a verified Domain property covers both. Use the property you actually verified; do not change its spelling to match an example.
- Do not paste the search.google.com browser address, your Google Cloud project ID, or a service-account email into this field. Those are different values.

| Property type | Example value for Shipped |
| --- | --- |
| Domain property | `sc-domain:myproduct.in` |
| URL-prefix property | `https://app.myproduct.in/` |

**Check before continuing:** You have one property value ready to paste: sc-domain:your-domain or your exact verified HTTPS URL prefix.

### 4. Create a Google Cloud project for this connection

- Open Google Cloud Console in another tab. Open the project selector in the top bar, then click New project. Project name: use your product name followed by Search Tracking, for example DeskPet Search Tracking. The Project ID is generated automatically; it is not your Search Console property.
- If your college account only offers mastersunion.org under Organization, that is expected. Organization and Parent resource can both be mastersunion.org if MU permits student projects there. If MU has assigned a folder, choose that folder as the parent. This puts the Cloud project under MU’s administration; it does not change which website you track.
- Click Create, then select the new project in the top bar. A message such as 12 projects remaining is a project-creation quota notice, not a payment request. If creation is denied, ask the course team or MU IT about project-creation permission.
- The Search Console API is free. This assignment does not ask you to start a paid Cloud trial, add a payment card, or enable unrelated paid services.

**Check before continuing:** Your new Search Tracking project is selected in Google Cloud’s top bar.

[Open Google Cloud Console](https://console.cloud.google.com/) · [Google’s project-creation instructions](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects) · [Search Console API pricing](https://developers.google.com/webmaster-tools/pricing)

### 5. Enable the Google Search Console API

- With the new Cloud project selected, open APIs & Services → Library. Search for Google Search Console API, open it and click Enable. If you see Manage instead, it is already enabled.
- Use Google Search Console API, not Google Analytics API or Indexing API. If you switch Cloud projects later, make sure the API is enabled in the project containing your service account.

**Check before continuing:** Google Search Console API is enabled in your Search Tracking Cloud project.

[Open the Search Console API library entry](https://console.cloud.google.com/apis/library/searchconsole.googleapis.com)

### 6. Create a dedicated service account

- In the same Cloud project, open IAM & Admin → Service Accounts → Create service account. If Google first asks you to enable the IAM API, enable it in this project. Name the service account shipped-search-console. Click Create and continue.
- The sections for granting the service account access to the Cloud project, and granting users access to the service account, are optional. Leave them empty and finish with Done. You do not need to give this service account the Cloud Editor or Owner role for Search Console reporting.
- Open the service account you just created. Copy its Email value. It looks like shipped-search-console@your-project-id.iam.gserviceaccount.com. This email is the client_email value that will also appear in its JSON key.

**Check before continuing:** You have copied the service-account email, not your personal or college email.

[Google’s service-account instructions](https://docs.cloud.google.com/iam/docs/service-accounts-create)

### 7. Give that service account Restricted access to your website

- Return to Google Search Console and select the verified website property from step 2. Open Settings → Users and permissions → Add user.
- Paste the service-account email from step 6, choose Restricted permission, then click Add. This is a Search Console permission, separate from Google Cloud IAM roles. Do not add the service account as an owner.
- If you cannot see Users and permissions or Add user, ask the verified property owner to do this step. Giving yourself a Cloud project role will not grant ownership of the website property.

**Check before continuing:** The exact service-account email appears in this property’s Users and permissions list with Restricted access.

[Google’s Search Console permission instructions](https://support.google.com/webmasters/answer/7687615?hl=en)

### 8. Download the service account’s JSON key

- In Google Cloud, open IAM & Admin → Service Accounts and select the same service-account email. Open Keys → Add key → Create new key. Select JSON and click Create. A .json file downloads to your computer.
- If you see Service account key creation is disabled, or an organization-policy error, stop and ask the course team or MU IT for an approved way to connect. Do not disable MU organization policies or change accounts to bypass them. Share the error text or a screenshot without keys.
- The downloaded JSON contains a private key. Keep it private. Do not send the file to a teaching assistant, paste it into an AI chat, email or WhatsApp, include it in a screenshot, or commit it to GitHub.

**Check before continuing:** You have the JSON file for the same service account that has Restricted access in step 7.

[Google’s JSON-key instructions and permission requirements](https://docs.cloud.google.com/iam/docs/keys-create-delete)

### 9. Paste the two values into Shipped and connect

- Return to the Shipped Search Console connection tab from step 1. In Search Console property, paste the exact value from step 3.
- Open the downloaded .json file in a text editor. Copy its entire contents, from the first { to the final }, and paste them only into Shipped’s protected Google service-account JSON field. Do not paste just the client_email, private_key, file name or Cloud project ID.
- Confirm the read-only access checkbox and click Connect source. Wait for the check and first sync to finish. Do not use demo_gsc or another example credential for the assignment.
- If your connection screen offers Authorize with Google, you can instead authorize the Google account with access to your verified property and choose that property. Steps 4–8 are for the service-account method; they are not needed for the Google authorization method.

**Check before continuing:** Back on Course submissions, the Google Search Console row says Live connection · first sync complete. Zero clicks or impressions are fine; a failed or pending connection is different from zero traffic.

### 10. Record your second-submission receipt

- Return to your existing project’s Course submissions page and scroll to Submission 2 · Launch tracking. Check Clarity, Google Search Console and your payment setup separately.
- Select the correct payment-provider option, confirm the checkbox, and click Submit tracking setup. Connecting Search Console alone does not submit the assignment.
- Check for Tracking submission received, the date and a Receipt ID. Keep that receipt ID. If a Google permission or MU policy block is still unresolved, you can record your current setup, but the incomplete requirement stays incomplete. Share the receipt ID and the error with your instructor; never share a credential.

**Check before continuing:** You have a dated tracking receipt and know whether each requirement passed or still needs work. Do not wait for Google traffic to appear just to submit a working connection.

[Return to my course submission](https://shipped.money/app/submit)

### Search Console troubleshooting

**I only see mastersunion.org as Organization and Parent resource**

That is a Google Cloud location choice for your college account. Use MU or its assigned student-project folder if MU permits it. Your Search Console property must still be your product’s website. If project creation or keys are blocked, ask the course team or MU IT; do not change organization security policies.

**Ownership verification failed or I cannot edit DNS**

Check that the TXT record is in the DNS provider actually serving the domain and allow it to propagate. If you can edit the website but not DNS, use a URL-prefix property with HTML-tag verification. Keep the deployed tag in the homepage `<head>`. Ask the domain owner if neither method is available.

**Service account key creation is disabled**

This can be an MU organization policy. Stop before changing policies. Send the course team the error text, your product URL and receipt ID, without a JSON file or private key. An incomplete receipt preserves your submission time; it does not pass the missing connection check.

**Access denied, property not found, or the property list is empty**

Use the exact verified property value, including sc-domain: for a Domain property or the full HTTPS URL prefix. In that exact property’s Settings → Users and permissions, check that you added the client_email from this JSON as Restricted. Confirm the Search Console API is enabled in the service account’s Cloud project. If you just created the account or key, wait a minute and retry; Google can take time to recognize it.

**Connected, but the Search Console row says Not complete yet**

Compare your property with the Product URL saved in your Shipped project. A URL-prefix property must use the exact same host, including www or any subdomain, and cover the root / rather than a page path. For example, https://www.myproduct.in/ does not complete a submission saved as https://myproduct.in. Verify and connect a Domain property such as sc-domain:myproduct.in to cover both, or a root URL-prefix property matching the submitted host. Check that the connection is live and its first sync has finished, then submit tracking setup again.

**Shipped cannot read the JSON credential**

Paste the entire downloaded service-account JSON into the protected credential field. Do not paste a Google API key, OAuth client-secret file, file name, screenshot, or only its private_key field. If a key was deleted or exposed, ask the account owner to replace it through the approved process.

**The connection works but traffic is zero or a few days behind**

A new property can have no Google Search activity yet. Shipped imports finalized Search Console data, which can lag behind today. This is not a real-time visitor counter. Check the live connection and first-sync status; use Clarity to inspect activity on your website.

**I connected GSC but have no second-submission receipt**

Go back to Course submissions → Submission 2, confirm the checkbox and click Submit tracking setup. The receipt is a separate action after connecting services. Do not create a second Shipped project.

## If you get stuck

- No login email: check spam, request a fresh link and use the same browser.
- GitHub permission pending: ask the repository or organisation owner to approve access. Save your submission, then finish setup.
- Domain not ready: check your host’s domain settings and HTTPS; a platform URL is not a substitute.
- Connection failed: your submission remains on record. Fix the connection and the page will show its current status automatically.
- Ask your instructor for help with the error shown. Never include a key.

There is no second final-product submission in Shipyard. Follow any separate instructions for the earlier idea/spec checkpoints.

GitHub permission reference: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens

