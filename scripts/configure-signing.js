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

// 1. Remove any pre-existing signingConfigs { ... } block cleanly
content = content.replace(/\n\s*signingConfigs\s*\{[\s\S]*?\n    \}/g, '');

const signingConfigsBlock = `    signingConfigs {
        release {
            storeFile file("release.keystore")
            storePassword "${keystorePassword}"
            keyAlias "${keyAlias}"
            keyPassword "${keyPassword}"
        }
    }`;

// 2. Insert signingConfigs right before buildTypes inside android { }
if (content.includes('buildTypes {')) {
  content = content.replace('buildTypes {', signingConfigsBlock + '\n    buildTypes {');
}

// 3. Update buildTypes { release { ... } } cleanly without affecting other blocks
content = content.replace(/(buildTypes\s*\{[\s\S]*?release\s*\{)([\s\S]*?)(\n        \})/, (match, prefix, inner, suffix) => {
  const updatedInner = `
            signingConfig signingConfigs.release
            minifyEnabled false
            shrinkResources false
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"`;
  return `${prefix}${updatedInner}${suffix}`;
});

fs.writeFileSync(gradleFile, content, 'utf8');
console.log('Successfully configured release signing inside android { } in android/app/build.gradle');
