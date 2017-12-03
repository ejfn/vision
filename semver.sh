#!/bin/bash

export SemVer=`gitversion /showvariable SemVer`
export MajorMinorPatch=`gitversion /showvariable MajorMinorPatch`
export Major=`gitversion /showvariable Major`
export Minor=`gitversion /showvariable Minor`
export Patch=`gitversion /showvariable Patch`
export PreReleaseNumber=`gitversion /showvariable PreReleaseNumber`

Candidate=99
if [[ ! -z $PreReleaseNumber ]]
then
  Candidate=$PreReleaseNumber
fi
export BuildNumber=$(($Major * 1000000 + $Minor * 10000 + $Patch * 100 + $Candidate))

jq '.expo.extra.semver = env.SemVer' app.json > tmp.json && mv tmp.json app.json
jq '.expo.version = env.MajorMinorPatch' app.json > tmp.json && mv tmp.json app.json
jq '.expo.ios.buildNumber = env.BuildNumber' app.json > tmp.json && mv tmp.json app.json
jq '.expo.android.versionCode = (env.BuildNumber | tonumber)' app.json > tmp.json && mv tmp.json app.json
