# Setup
Clone the repo to your disk

```
git clone https://github.com/kloppen/bib-git
cd bib-git
git submodule update --init --recursive
```

You may want to write a launch script. Create a file in your directory of choice with the following content. Modify paths as required.

```
#/bin/bash
cd bib-git
if pgrep -f "python main.py" > /dev/null
then
	echo "beck end already running"
else
	source activate bib-git	
	python main.py &
fi
xdg-open build/index.html &
```


# Android Setup
Install termux. Make sure that you give it storage permission.

Install hackers keyboard (optional)

Install go, then git-lfs (which isn't available directly for termux, but
can be built from source):

```
apt install git
apt install coreutils
apt install golang
git clone https://github.com/github/git-lfs.git
cd git-lfs/
termus-fix-shebang script/bootstrap
termus-fix-shebang script/fmt
termus-fix-shebang script/lint
./script/bootstrap
cp bin/git-lfs /data/data/com.termux/files/usr/bin/
cd
git lfs install
```

This program currently only works on Firefox as Chrome prevents access to
local files. For Firefox to access local files, you'll need to give it disk
access by going to Settings / Apps and granting it permission for "Storage."

When you're open files on Firefox for Android, you'll need to tap-and-hold
the file and select "Open with App." Just clicking the link will fail.

You may choose to add an icon to the homescreen. Open index.html and under
"..."/Page, select "Add to Home Screen."

# Setting up the Library Repo
Export your library from your current library reference system as BibLaTeX and 
include the attached files. The .bib file must be named "MyLibrary.bib" and
must be located in the folder `library` under the root installation path of this
program. The attached files would normally be located in a sub-folder called
`files`, but this is not necessary (though they do need to either be in the
`library` folder or a sub-folder of it). You'll need to import the .bib file
using the "Import BibLaTeX" function in the bib-git program. This will convert
to CSL and you can save the resulting file (using the "Save Library") button
in the `library` folder using the name `MyLibrary.json`. You can then delete
the .bib file if you wish (recommended).

Initialize a git repository, enable git-lfs for PDF files (and whatever other 
type of files you use).

```
cd library
git init
git lfs tack "*.pdf"
git add .gitattributes
git add MyLibrary.bib
git add files # or whatever you called it
git commit -m "Impored library"
git remote add origin #... whatever your URL for a new GitHub repo is
git push -u origin master
```

When you update your library, use the normal commit/push workflow that you 
would with any other git repo.


# References
http://redux.js.org/docs/basics/ExampleTodoList.html
https://survivejs.com/react/getting-started/editing-notes/
https://github.com/Juris-M/citeproc-js
http://citationstyles.org/
https://www.npmjs.com/package/react-citeproc
https://www.w3schools.com/html/html_responsive.asp
https://www.npmjs.com/package/biblatex-csl-converter


# To-do's

- value checking for CSL Type field
- Sort reference list (optional)
- Create reference from DOI (functionality available from citation.js)
- Delete reference
- Implement local storage for citation style, etc.
- Show report number if present in collapsed view
- date parts
- fix CORS for update

