#!/usr/bin/env bash
npm run build
git push origin `git subtree split --prefix public master`:master --force
git subtree push --prefix public origin master
