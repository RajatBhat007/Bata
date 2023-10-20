# # Extract versionName and versionCode from the Android build.gradle file
# versionName=$(grep "versionName" android/app/build.gradle | grep -o '".*"' | tr -d '"')
# versionCode=$(grep "versionCode" android/app/build.gradle | grep -o '[0-9]\+')

# # Set the environment variables
# export APP_VERSION_NAME=$versionName