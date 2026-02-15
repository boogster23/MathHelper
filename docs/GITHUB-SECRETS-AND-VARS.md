# GitHub Secrets and Variables Setup

Use this when configuring **Settings → Secrets and variables → Actions** for this repo.

---

## Quick start: Static Web App

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
| `MULT_APP_NAME` | `mathhelper-multiplication` | Bicep deploy, Terraform deploy only |

**Notes:**
- Prefer a single Azure region (e.g. `eastus`) to stay within your $50 credit.

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



 (or search “App Services”) 
## Summary: minimum to run each workflow

| Workflow | Variables | Secrets |
|----------|-----------|---------|
| **multiplication-static-deploy** (Static Web App) | None | MULT_STATIC_WEB_APPS_API_TOKEN |
| **multiplication-bicep-deploy** | RESOURCE_GROUP, LOCATION, MULT_APP_NAME | AZURE_CREDENTIALS |
| **multiplication-terraform-deploy** | RESOURCE_GROUP, LOCATION, MULT_APP_NAME | ARM_CLIENT_ID, ARM_CLIENT_SECRET, ARM_TENANT_ID, ARM_SUBSCRIPTION_ID |
For the Multiplication app, use **multiplication-static-deploy**: create the Static Web App in Azure, copy the deployment token, add `MULT_STATIC_WEB_APPS_API_TOKEN`, then run the workflow.

---


If you can’t use Entra ID / App registrations (e.g. your “Entra ID” is the company tenant), 




