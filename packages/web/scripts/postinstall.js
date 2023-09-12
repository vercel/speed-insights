/* eslint-disable -- We want to log here */
import fs from 'fs';
import path from 'path';

const customPath = process.argv[2];

// Check .env.local for the presence of the analyticsId key
function checkAnalyticsIdInEnv() {
  const files = ['.env.local', '.env.development.local', '.env'];
  const projectDir = customPath || path.resolve(process.cwd());

  const envFile = files.find((file) => {
    const envPath = path.join(projectDir, file);
    if (!fs.existsSync(envPath)) {
      return false;
    }

    const envContent = fs.readFileSync(envPath, 'utf-8');

    return envContent.includes('VERCEL_ANALYTICS_ID');
  });

  return envFile;
}

function isAnalyticsIdInNextConfig() {
  const projectDir = customPath || path.resolve(process.cwd());
  const jsConfigPath = path.join(projectDir, 'next.config.js');
  const mjsConfigPath = path.join(projectDir, 'next.config.mjs');
  const packageJsonPath = path.join(projectDir, 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    console.error('Error: package.json not found in the current directory.');
    return;
  }

  const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
  const packageJson = JSON.parse(packageJsonContent);

  if (!packageJson.dependencies) {
    return;
  }

  const hasSpeedInsightsInstalled =
    packageJson.dependencies['@vercel/speed-insights'];

  if (!hasSpeedInsightsInstalled) {
    // Has no speed-insights installed, so no need to check for analyticsId
    return;
  }

  let configFile;

  if (fs.existsSync(jsConfigPath)) {
    configFile = jsConfigPath;
  } else if (fs.existsSync(mjsConfigPath)) {
    configFile = mjsConfigPath;
  } else {
    return;
  }

  const configContent = fs.readFileSync(configFile, 'utf-8');

  return configContent.includes('analyticsId');
}

const isInConfig = isAnalyticsIdInNextConfig();
const envFile = checkAnalyticsIdInEnv();

if (isInConfig) {
  console.warn(
    '\x1b[31m',
    `Please remove 'analyticsId' from your next.config.js file.`,
  );
}
if (envFile) {
  console.log(
    '\x1b[31m',
    `Please remove 'VERCEL_ANALYTICS_ID' from your ${envFile} file.`,
  );
}
