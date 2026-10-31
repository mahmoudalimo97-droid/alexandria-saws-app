import fs from 'node:fs';
import path from 'node:path';

const gradleFile = path.resolve(process.cwd(), 'android/app/build.gradle');

if (!fs.existsSync(gradleFile)) {
  console.error(`Error: File not found at ${gradleFile}`);
  process.exit(1);
}

const keystorePassword = process.env.KEYSTORE_PASSWORD || 'android123';
const keyAlias = process.env.KEY_ALIAS || 'appkey';
const keyPassword = process.env.KEY_PASSWORD || 'android123';
const buildNumber = parseInt(process.env.BUILD_NUMBER || '1', 10) || 1;

let content = fs.readFileSync(gradleFile, 'utf8');

// 1. Update versionCode and versionName dynamically for incremental app updates
content = content.replace(/versionCode\s+\d+/g, `versionCode ${buildNumber}`);
content = content.replace(/versionName\s+"[^"]+"/g, `versionName "1.0.${buildNumber}"`);

// 2. Remove any pre-existing signingConfigs, lint, or legacy lintOptions blocks to avoid duplicate insertion
content = content.replace(/\n\s*signingConfigs\s*\{[\s\S]*?\n    \}/g, '');
content = content.replace(/\n\s*lintOptions\s*\{[\s\S]*?\n    \}/g, '');
content = content.replace(/\n\s*lint\s*\{[\s\S]*?\n    \}/g, '');

const signingAndLintBlocks = `    signingConfigs {
        release {
            storeFile = file('release.keystore')
            storePassword = "${keystorePassword}"
            keyAlias = "${keyAlias}"
            keyPassword = "${keyPassword}"
        }
    }

    lint {
        checkReleaseBuilds = false
        abortOnError = false
    }`;

// 3. Insert signingConfigs and modern lint blocks right before buildTypes inside android { }
if (content.includes('buildTypes {')) {
  content = content.replace('buildTypes {', signingAndLintBlocks + '\n\n    buildTypes {');
}

// 4. Update buildTypes { release { ... } } with assignment syntax (=)
content = content.replace(/(buildTypes\s*\{[\s\S]*?release\s*\{)([\s\S]*?)(\n        \})/, (match, prefix, inner, suffix) => {
  const updatedInner = `
            signingConfig = signingConfigs.release
            minifyEnabled = false
            shrinkResources = false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'`;
  return `${prefix}${updatedInner}${suffix}`;
});

fs.writeFileSync(gradleFile, content, 'utf8');
console.log('Successfully configured release signing, modern lint block, and versioning in android/app/build.gradle');
