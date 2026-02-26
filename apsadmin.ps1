param(
    [string]$Project = "aps-australia",
    [string]$Region = "us-central1",
    [string]$Service = "aps-admin-frontend"
)

# Read env vars from .env.dev
$envFile = ".env.dev"
if (-not (Test-Path $envFile)) {
    Write-Host "Error: $envFile not found!" -ForegroundColor Red
    exit 1
}

$envVars = @{}
Get-Content $envFile | ForEach-Object {
    $line = $_.Trim()
    # Skip empty lines and comments
    if ([string]::IsNullOrWhiteSpace($line) -or $line.StartsWith('#')) {
        return
    }

    if ($line -match '^([^=]+)=(.*)$') {
        $key = $matches[1].Trim()
        $value = $matches[2].Trim()
        # Remove quotes (both single and double)
        $value = $value -replace '^["\x27]|["\x27]$', ''
        $envVars[$key] = $value
    }
}

$baseApiUrl = $envVars['NEXT_PUBLIC_BASE_API_URL']
$redirectUrl = $envVars['NEXT_PUBLIC_REDIRECT_URL']
$stripeSecretKey = $envVars['NEXT_PUBLIC_STRIPE_SECRET_KEY']
$stripePublicKey = $envVars['NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY']

if (-not $baseApiUrl -or -not $redirectUrl -or -not $stripeSecretKey -or -not $stripePublicKey) {
    Write-Host "Error: Missing env vars in $envFile" -ForegroundColor Red
    exit 1
}

$gcsPath = "gs://run-sources-$Project-$Region/services/$Service"
Write-Host "Building Docker image..." -ForegroundColor Green
gcloud builds submit `
    --config=cloudbuild.yaml `
    --gcs-source-staging-dir=$gcsPath `
    --substitutions "_NEXT_PUBLIC_BASE_API_URL=$baseApiUrl,_NEXT_PUBLIC_REDIRECT_URL=$redirectUrl,_NEXT_PUBLIC_STRIPE_SECRET_KEY=$stripeSecretKey,_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$stripePublicKey" `
    --project $Project

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Deploying to Cloud Run..." -ForegroundColor Green
gcloud run deploy aps-admin-frontend `
    --image "gcr.io/$Project/aps-admin-frontend:latest" `
    --region $Region `
    --allow-unauthenticated `
    --memory 2Gi `
    --cpu 2 `
    --timeout 3600 `
    --max-instances 10 `
    --cpu-boost `
    --service-account="aps-frontend@$Project.iam.gserviceaccount.com" `
    --project $Project

Write-Host "Deployment complete!" -ForegroundColor Green