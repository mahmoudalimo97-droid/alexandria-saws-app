import fs from 'node:fs';
import path from 'node:path';

const appDir = path.resolve(process.cwd(), 'android/app');
const gradleFile = path.join(appDir, 'build.gradle');
const signingGradleFile = path.join(appDir, 'signing.gradle');

if (!fs.existsSync(gradleFile)) {
  console.error(`Error: File not found at ${gradleFile}`);
  process.exit(1);
}

// 1. Create android/app/signing.gradle with isolated signing and lint configuration
const signingContent = `android {
    signingConfigs {
        release {
            storeFile file("release.keystore")
            storePassword System.getenv("KEYSTORE_PASSWORD")
            keyAlias System.getenv("KEY_ALIAS")
            keyPassword System.getenv("KEY_PASSWORD")
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            shrinkResources false
        }
    }
    lint {
        checkReleaseBuilds false
        abortOnError false
    }
}
`;

fs.writeFileSync(signingGradleFile, signingContent, 'utf8');
console.log('Successfully wrote android/app/signing.gradle');

// 2. Clean android/app/build.gradle of any previously injected regex blocks
let content = fs.readFileSync(gradleFile, 'utf8');

// Remove previously injected signingConfigs, lint, or lintOptions blocks inside build.gradle
content = content.replace(/\n\s*signingConfigs\s*\{[\s\S]*?\n    \}/g, '');
content = content.replace(/\n\s*lintOptions\s*\{[\s\S]*?\n    \}/g, '');
content = content.replace(/\n\s*lint\s*\{[\s\S]*?\n    \}/g, '');

// Restore clean standard release buildType inside build.gradle
const standardReleaseBlock = `release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }`;
content = content.replace(/release\s*\{[\s\S]*?proguardFiles[\s\S]*?\n        \}/, standardReleaseBlock);

// Update versionCode and versionName for incremental installs if BUILD_NUMBER is present
const buildNumber = parseInt(process.env.BUILD_NUMBER || '1', 10) || 1;
content = content.replace(/versionCode\s+\d+/g, `versionCode ${buildNumber}`);
content = content.replace(/versionName\s+"[^"]+"/g, `versionName "1.0.${buildNumber}"`);

// 3. Append apply from: 'signing.gradle' at the end of build.gradle if not already present
const applyLine = "apply from: 'signing.gradle'";
if (!content.includes(applyLine)) {
  content = content.trimEnd() + '\n\n' + applyLine + '\n';
}

fs.writeFileSync(gradleFile, content, 'utf8');
console.log("Successfully ensured apply from: 'signing.gradle' in android/app/build.gradle");
