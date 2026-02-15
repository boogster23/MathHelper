# GitHub Secrets and Variables Setup

Use this when configuring **Settings → Secrets and variables → Actions** for this repo.

---

## Quick start: Manual infra + GitHub deploy (recommended for you)

Create everything in Azure by hand, then use **only** the **multiplication-azure-deploy** workflow to deploy the app.

1. **In Azure Portal (one-time)**  
   - Create a **resource group** (e.g. `mathhelper-rg`, region e.g. `eastus`).  
   - Create an **App Service** (Web App): same RG, name = e.g. `mathhelper-mult-prod`, Runtime = **Node 25**, create a new Free F1 plan if prompted.

2. **In GitHub repo**  
   - **Variables:** `MULT_APP_NAME` = exact Web App name you created (e.g. `mathhelper-mult-prod`).  
   - **Secrets:** `AZURE_PUBLISH_PROFILE` = full contents of the publish profile from the Web App (**Get publish profile** in the portal).

3. **Deploy**  
   - Actions → **Multiplication - Deploy to Azure Web App** → **Run workflow**.

You do **not** need to run the Bicep or Terraform workflows or set any other secrets for this path.

---

## Quick start: Static Web App (no publish profile)

Use **Azure Static Web Apps** for the Multiplication app. You use a **deployment token**, not a publish profile.

1. **Create the Static Web App (one-time)**  
   The portal wizard often requires a GitHub `repositoryUrl` and can fail with "template parameter 'repositoryUrl' is not provided". Create the resource with **Azure CLI** instead (no repo needed):

   **Option A – Azure Cloud Shell** (Portal → open **Cloud Shell** in the top bar, then run):

   ```bash
   az staticwebapp create \
     --name boogie-mathhelper \
     --resource-group boogie-sandbox-rg \
     --location "East US 2" \
     --sku Free
   ```

   Use your own `--name`, `--resource-group`, and `--location` if different. After it succeeds, go to the Static Web App in the portal → **Overview** → **Manage deployment token** → copy the token.

   **Option B – Portal**  
   If the portal create works for you (e.g. you connect GitHub in the wizard), you can create it there. If you see the `repositoryUrl` template error, use Option A instead.

2. **In GitHub repo**  
   - **Secrets:** New secret `MULT_STATIC_WEB_APPS_API_TOKEN` = the deployment token you copied.  
   - **No** publish profile and **no** `MULT_APP_NAME` variable needed for this workflow.

3. **Deploy**  
   - Actions → **Multiplication - Deploy to Static Web App** → **Run workflow**.

Your site will be at the Static Web App’s default URL (e.g. `https://<name>.<region>.azurestaticapps.net`).

---

## Variables (non-sensitive)

Add these under the **Variables** tab.

| Variable | Example | Used by |
|----------|---------|---------|
| `RESOURCE_GROUP` | `mathhelper-rg` | Bicep deploy, Terraform deploy |
| `LOCATION` | `eastus` | Bicep deploy, Terraform deploy |
| `MULT_APP_NAME` | `mathhelper-multiplication` | Bicep deploy, Terraform deploy, Azure Web App deploy (multiplication) |

**Suggested value for `MULT_APP_NAME`:**
- Must be **globally unique** across all of Azure, 2–60 characters, letters/numbers/hyphens only.
- Examples: `mathhelper-mult-prod`, `mathhelper-mult-boogie`, `mathhelper-mult-vspro`.

**Notes:**
- Prefer a single Azure region (e.g. `eastus`) to stay within your $50 credit.

---

## Two ways to get your app running

| Path | When to use | What you need |
|------|------------------|----------------|
| **A: Manual infra** | You can’t use Entra ID / App registrations (e.g. no access in your tenant). | Create resource group + Web App **manually** in Azure Portal. Only **one secret**: `AZURE_PUBLISH_PROFILE`. |
| **B: Bicep or Terraform** | You can create an App registration (service principal) in Entra ID. | Infra is created by GitHub Actions. You need **AZURE_CREDENTIALS** (Bicep) or **ARM_*** secrets (Terraform) **and** later **AZURE_PUBLISH_PROFILE** to deploy the app. |

If you don’t have access to Entra ID (e.g. it’s your company’s directory), use **Path A** below.

---

## Secrets (sensitive)

Add these under the **Secrets** tab.

### Option A: Use Bicep to create infrastructure

| Secret | Where to get it |
|--------|------------------|
| `AZURE_CREDENTIALS` | JSON for a **service principal**. See [Where to get AZURE_CREDENTIALS](#where-to-get-azure_credentials) below. |

### Option B: Use Terraform to create infrastructure

| Secret | Where to get it |
|--------|------------------|
| `ARM_CLIENT_ID` | Application (client) ID of the service principal. |
| `ARM_CLIENT_SECRET` | Client secret value of the service principal. |
| `ARM_TENANT_ID` | Directory (tenant) ID of your Azure AD. |
| `ARM_SUBSCRIPTION_ID` | Subscription ID (the one with your $50 credit). |

All four come from the same **service principal** and subscription. See [Where to get service principal (ARM_*)](#where-to-get-service-principal-arm_) below.

### Deploy to Static Web App (no publish profile)

| Secret | Where to get it |
|--------|------------------|
| `MULT_STATIC_WEB_APPS_API_TOKEN` | From the Static Web App in Azure Portal: **Overview** → **Manage deployment token** → copy. See [Where to get the deployment token](#where-to-get-the-static-web-app-deployment-token) below. |

### Deploy app to the Web App (App Service, after infra exists)

| Secret | Where to get it |
|--------|------------------|
| `AZURE_PUBLISH_PROFILE` | From the Web App in Azure Portal. See [Where to get AZURE_PUBLISH_PROFILE](#where-to-get-azure_publish_profile) below. |

---

## Where to get the secrets (VS subscription / $50 credit)

### 1. Azure subscription

1. Go to [https://azure.microsoft.com](https://azure.microsoft.com) and sign in with the **same Microsoft account** that has your Visual Studio Professional subscription.
2. Activate the **Azure benefit** (e.g. $50 monthly credit) in the VS subscription / benefits page if you haven’t already.
3. You’ll have a subscription (e.g. “Visual Studio Professional”). Note the **Subscription ID** (needed for Terraform; also used when creating the service principal).

### 2. Where to get AZURE_CREDENTIALS

Used by the **Bicep** workflow. It’s one JSON object.

1. **Create a service principal** (same steps as in section 3 below). You need: **Application (client) ID**, **Client secret value**, **Directory (tenant) ID**, **Subscription ID**.
2. Build this JSON (replace the placeholders with your values, no extra spaces):

```json
{
  "clientId": "<ARM_CLIENT_ID / Application (client) ID>",
  "clientSecret": "<ARM_CLIENT_SECRET>",
  "subscriptionId": "<ARM_SUBSCRIPTION_ID>",
  "tenantId": "<ARM_TENANT_ID>"
}
```

3. In GitHub: **Secrets → New repository secret** → Name: `AZURE_CREDENTIALS`, Value: paste the whole JSON.

### 3. Where to get service principal (ARM_*)

Used by the **Terraform** workflow (and to build `AZURE_CREDENTIALS` for Bicep).

1. **Azure Portal** → [https://portal.azure.com](https://portal.azure.com) → sign in.
2. **Microsoft Entra ID** (or “Azure Active Directory”) → **App registrations** → **New registration**.
   - Name: e.g. `github-mathhelper`.
   - Supported account types: “Accounts in this organizational directory only”.
   - Register.
3. On the app’s **Overview** page, copy:
   - **Application (client) ID** → GitHub secret `ARM_CLIENT_ID`.
   - **Directory (tenant) ID** → GitHub secret `ARM_TENANT_ID`.
4. **Certificates & secrets** → **New client secret** → Add description, expiry (e.g. 24 months) → **Add**.
   - Copy the **Value** immediately (it’s shown once) → GitHub secret `ARM_CLIENT_SECRET`.
5. **Subscriptions** in Azure Portal → select your **Visual Studio Professional** subscription → copy **Subscription ID** → GitHub secret `ARM_SUBSCRIPTION_ID`.
6. **Grant the app access to the subscription:**  
   **Subscriptions** → your subscription → **Access control (IAM)** → **Add** → **Role assignment** → Role: **Contributor** → Members: select your app (`github-mathhelper`) → Save.

You now have all four ARM_* values for Terraform and the same four for building `AZURE_CREDENTIALS` for Bicep.

### 4. Where to get the Static Web App deployment token

Used by **Multiplication - Deploy to Static Web App**. No publish profile.

1. **Azure Portal** → **Static Web Apps** → open your Multiplication Static Web App.
2. **Overview** (or **Manage deployment token** in the left menu) → **Manage deployment token** → **Copy**.
3. In GitHub: **Secrets** → **New repository secret** → Name: `MULT_STATIC_WEB_APPS_API_TOKEN`, Value: the token you copied.

### 5. Where to get AZURE_PUBLISH_PROFILE

Used by the **Azure Web App deploy** workflow. Get this **after** the Web App has been created (by Bicep or Terraform).

1. **Azure Portal** → **App Service** (or search “App Services”) → open your Multiplication app (name = `vars.MULT_APP_NAME`).
2. Top menu → **Get publish profile** (or **Download publish profile**).
3. Open the downloaded `.PublishSettings` file in a text editor, copy **all** of its contents.
4. In GitHub: **Secrets → New repository secret** → Name: `AZURE_PUBLISH_PROFILE`, Value: paste the full contents.

---

## Summary: minimum to run each workflow

| Workflow | Variables | Secrets |
|----------|-----------|---------|
| **multiplication-static-deploy** (Static Web App) | None | MULT_STATIC_WEB_APPS_API_TOKEN |
| **multiplication-bicep-deploy** | RESOURCE_GROUP, LOCATION, MULT_APP_NAME | AZURE_CREDENTIALS |
| **multiplication-terraform-deploy** | RESOURCE_GROUP, LOCATION, MULT_APP_NAME | ARM_CLIENT_ID, ARM_CLIENT_SECRET, ARM_TENANT_ID, ARM_SUBSCRIPTION_ID |
| **multiplication-azure-deploy** (App Service) | MULT_APP_NAME | AZURE_PUBLISH_PROFILE |

For **Static Web App**: create the resource in Azure, copy the deployment token, add `MULT_STATIC_WEB_APPS_API_TOKEN`, then run **multiplication-static-deploy**. No publish profile.

---

## Path A: No Entra ID – create infra manually, deploy with GitHub

If you can’t use Entra ID / App registrations (e.g. your “Entra ID” is the company tenant), you can skip Bicep/Terraform and create everything once in the portal.

1. **Create resource group (manual, one-time)**  
   Azure Portal → **Resource groups** → **Create** → Name = your `RESOURCE_GROUP` (e.g. `mathhelper-rg`), Region = your `LOCATION` (e.g. `eastus`).

2. **Create Web App (manual, one-time)**  
   Azure Portal → **App Service** → **Create** →  
   - Resource group = the one you created  
   - Name = your `MULT_APP_NAME` (e.g. `mathhelper-mult-prod`)  
   - Publish = **Code**, Runtime = **Node 25**, Region = same as RG  
   - Plan = create new (e.g. Free F1). Create the app.

3. **Set GitHub variables**  
   In the repo: **Settings → Secrets and variables → Actions → Variables**  
   - `RESOURCE_GROUP` = same name as the RG you created  
   - `LOCATION` = same region (e.g. `eastus`)  
   - `MULT_APP_NAME` = exact Web App name you used  

4. **Get publish profile and add secret**  
   Azure Portal → your **App Service** → **Get publish profile** → open the file, copy **all** content → GitHub **Secrets** → **AZURE_PUBLISH_PROFILE**.

5. **Deploy from GitHub**  
   Use only the **multiplication-azure-deploy** workflow (Run workflow). It will build and deploy your app. You do **not** run the Bicep or Terraform workflows in this path.
