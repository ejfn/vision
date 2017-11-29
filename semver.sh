#!/bin/bash

Major=`gitversion /showvariable Major`
Minor=`gitversion /showvariable Minor`
Patch=`gitversion /showvariable Patch`
PreReleaseNumber=`gitversion /showvariable PreReleaseNumber`

export MajorMinorPatch=`gitversion /showvariable MajorMinorPatch`

Candidate=99
if [[ ! -z $PreReleaseNumber ]]
then
  Candidate=$PreReleaseNumber
fi
export BuildNumber=$(($Major * 1000000 + $Minor * 10000 + $Patch * 100 + $Candidate))

jq '.expo.version = env.MajorMinorPatch' app.json > tmp.json && mv tmp.json app.json
jq '.expo.ios.buildNumber = env.BuildNumber' app.json > tmp.json && mv tmp.json app.json
jq '.expo.android.versionCode = (env.BuildNumber | tonumber)' app.json > tmp.json && mv tmp.json app.json
