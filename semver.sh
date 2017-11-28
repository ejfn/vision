#!/bin/bash
Major=`gitversion /showvariable Major`
Minor=`gitversion /showvariable Minor`
Patch=`gitversion /showvariable Patch`
PreReleaseLabel=`gitversion /showvariable PreReleaseLabel`
PreReleaseNumber=`gitversion /showvariable PreReleaseNumber`

export MajorMinorPatch=`gitversion /showvariable MajorMinorPatch`
export CFBundleVersion=$MajorMinorPatch${PreReleaseLabel:0:1}$PreReleaseNumber

Candidate=99
if [[ ! -z $PreReleaseNumber ]]
then
  Candidate=$PreReleaseNumber
fi
export AndroidBuildNumber=$(($Major * 1000000 + $Minor * 10000 + $Patch * 100 + $Candidate))

jq '.expo.version = env.MajorMinorPatch' app.json > tmp.json && mv tmp.json app.json
jq '.expo.ios.buildNumber = env.CFBundleVersion' app.json > tmp.json && mv tmp.json app.json
jq '.expo.android.versionCode = (env.AndroidBuildNumber | tonumber)' app.json > tmp.json && mv tmp.json app.json

