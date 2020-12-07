#!/usr/bin/env bash
set -exuo pipefail

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

function install_deps {
    echo "Installing npm dependencies"
    npm i

    echo "Installing core package dependencies"
    cd packages/core && npm i
}

function init_db {
    echo "Creating postgres DB"
    # create pg db
    createdb -e $name || return 0
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
install_deps
finish