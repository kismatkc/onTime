
#!/bin/bash
# Universal Unsigned IPA Builder for any Expo project

# Initialize variables
PROJECT_DIR=$(pwd)
BUILD_DIR="$PROJECT_DIR/build"

# Get project name from package.json
if [ -f "$PROJECT_DIR/package.json" ]; then
  PROJECT_NAME=$(node -e "console.log(require('./package.json').name)" 2>/dev/null)
  if [ -z "$PROJECT_NAME" ]; then
    echo "WARNING: Could not extract name from package.json, using directory name instead"
    PROJECT_NAME=$(basename "$PROJECT_DIR")
  fi
else
  echo "WARNING: No package.json found, using directory name as project name"
  PROJECT_NAME=$(basename "$PROJECT_DIR")
fi

echo "Detected project: $PROJECT_NAME"

# Initialize build directory
mkdir -p "$BUILD_DIR"
echo "Building unsigned IPA for $PROJECT_NAME..."

# Check dependencies
xcode-select -p || { echo "ERROR: Xcode tools missing"; exit 1; }

# Clean previous builds
rm -rf "$BUILD_DIR"/*.xcarchive "$BUILD_DIR"/Payload "$BUILD_DIR"/*.ipa "$BUILD_DIR"/xcodebuild.log

# Generate iOS project files
echo "Generating iOS files..."
npx expo prebuild --clean || { echo "ERROR: iOS project generation failed"; exit 1; }

# Detect workspace and scheme
WORKSPACE=$(find "$PROJECT_DIR/ios" -name "*.xcworkspace" | head -n 1)
SCHEME=${WORKSPACE##*/}
SCHEME=${SCHEME%.xcworkspace}
echo "Using workspace: $WORKSPACE"
echo "Using scheme: $SCHEME"

# Archive project
echo "Archiving project..."
xcodebuild archive \
  -workspace "$WORKSPACE" \
  -scheme "$SCHEME" \
  -configuration Release \
  -archivePath "$BUILD_DIR/$PROJECT_NAME.xcarchive" \
  CODE_SIGN_IDENTITY="" \
  CODE_SIGNING_REQUIRED=NO 2>&1 | tee "$BUILD_DIR/xcodebuild.log" || \
  { echo "ERROR: Archive failed. See $BUILD_DIR/xcodebuild.log"; exit 1; }

# Create IPA structure
echo "Creating IPA structure..."
mkdir -p "$BUILD_DIR/Payload" || { echo "ERROR: Failed to create Payload directory"; exit 1; }
APP_FILE=$(find "$BUILD_DIR/$PROJECT_NAME.xcarchive/Products/Applications" -name "*.app" | head -n 1)
cp -R "$APP_FILE" "$BUILD_DIR/Payload/" || { echo "ERROR: Failed to copy app bundle"; exit 1; }

# Package IPA
echo "Packaging IPA..."
(cd "$BUILD_DIR" && zip -r "$PROJECT_NAME.ipa" Payload) || { echo "ERROR: Failed to zip Payload"; exit 1; }

# Validate IPA
[ -s "$BUILD_DIR/$PROJECT_NAME.ipa" ] || { echo "ERROR: IPA file is empty or missing"; exit 1; }
echo "SUCCESS: Unsigned IPA created at $BUILD_DIR/$PROJECT_NAME.ipa ($(du -h "$BUILD_DIR/$PROJECT_NAME.ipa" | cut -f1))"