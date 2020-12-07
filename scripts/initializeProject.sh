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
    $subst package.json

    # rename files
    mv api.paw ${name}.paw
}

function install_deps {
    echo "Installing npm dependencies"
    npm install
}

function init_db {
    echo "Creating postgres DB"
    # create pg db
    createdb -e $name || return 0
}

function init_git {
    git add .
    git commit -am "Project initialized"
}


function finish {
    set +x
    echo ""
    echo "Project $name ready!"
    echo ""
    echo "Next steps:"
    echo "  $ poetry shell"
    echo "  $ make run"
    echo "  Open http://127.0.0.1:5000/api/swagger in browser"
    echo ""
    echo "To deploy:"
    echo "  $ sls deploy"
    echo ""
}

rename
install_deps
init_git
finish