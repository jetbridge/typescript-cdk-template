#!/usr/bin/env bash
set -exuo pipefail

rm -rf .git
git init

DEFAULT_NAME=`basename $PWD`
read -p "What is the name of your app? [$DEFAULT_NAME]: " name
name=${name:-$DEFAULT_NAME}

if [[ -z "$name" ]]; then exit 1; fi

function rename {
    subst="perl -i -pe s/jkv2/$name/g"

    # replace TEMPLATE string in files with $name
    find . -type f -exec $subst {} \;

    # rename files
    mv api.paw ${name}.paw
}

function install_deps_and_build {
    echo "Installing npm dependencies"
    npm i

    echo "Installing core package dependencies"
    cd packages/core && npm i

    echo "Building core"
    npm run build
}

function init_db {
    echo "Initializing DB"
    npm run db:init:local
}

function init_git {
    git add -A
    git commit -am "Project initialized"
}

function finish {
    set +x
    echo ""
    echo "Project $name ready!"
    echo ""
    echo "To deploy:"
    echo "  $ cd packages/backend && sls deploy"
    echo ""
}

rename
install_deps_and_build
init_db
init_git
finish