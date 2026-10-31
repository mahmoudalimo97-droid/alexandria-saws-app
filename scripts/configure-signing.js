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

let content = fs.readFileSync(gradleFile, 'utf8');

const signingBlock = `    signingConfigs {
        release {
            storeFile file("release.keystore")
            storePassword "${keystorePassword}"
            keyAlias "${keyAlias}"
            keyPassword "${keyPassword}"
        }
    }`;

if (content.includes('signingConfigs {')) {
  content = content.replace(/signingConfigs\s*\{[\s\S]*?\n    \}/, signingBlock);
} else {
  content = content.replace('buildTypes {', signingBlock + '\n\n    buildTypes {');
}

const releaseBuildType = `        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            shrinkResources false
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }`;

content = content.replace(/buildTypes\s*\{[\s\S]*?release\s*\{[\s\S]*?\n        \}/, (match) => {
  return match.replace(/release\s*\{[\s\S]*?\n        \}/, releaseBuildType.trim());
});

fs.writeFileSync(gradleFile, content, 'utf8');
console.log('Successfully configured release signing in android/app/build.gradle');
