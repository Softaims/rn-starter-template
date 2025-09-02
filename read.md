find splash object in app.json and give path of splash icon inside the property 
eg :  "image": "./assets/splash-icon.png",

select 3x png format from figma to download 

create prebuild format if you have created your own project for rn 
ie npx expo run:ios

restart application to see the applied changes 


# 3rd party google login no firebase . 
https://docs.expo.dev/guides/using-supabase/

https://supabase.com/docs/guides/auth/social-login/auth-google?platform=react-native&utm_source=expo&utm_medium=referral&utm_term=expo-react-native

# create new project at  https://console.cloud.google.com/apis/credentials
# configure consent as external client 
# select oauth client id 
# create ios ,android ,web clients each

# copy web client id and paste to your .env (see useGoogleAuth line 19)

# for android project you need SHA-1 
use this command on root of project (create your release )
keytool -list -v -keystore ./android/app/debug.keystore  
password : android or as you used
paste package => android/app/build.gradle  (applicationId)
copy client id : i.e 1034133353106-dai9f83u5vc279vgllvk4og6a1kjj2ef.apps.googleusercontent.com

# for ios create again
bundle id use commnd grep -r "PRODUCT_BUNDLE_IDENTIFIER" ios/
search com. in terminal and find id 
copy client id after creation 
i.e 1034133353106-b2iq7gc68nulq1ifn080igj1jr3p9296.apps.googleusercontent.com

copy all client ids and paste into supabase google and apple sigin 
web secret to the side nav fields as well 

inside ios oauth copy scheme and paste as follows


# add new property named plugin in app.json
# in that add 
 [
      [
        "@react-native-google-signin/google-signin",
        {
          "iosUrlScheme": "com.googleusercontent.apps._some_id_here_"
        }
      ]
]