bib-git is a bibliography management system. It stores references, optionally with attachments (such as the article itself) and allows you to access your list of references in your web browser. All data is storred locally on your computer. 
It's expected that you would store the reference database (which is just a JSON file) and any attached files in a git repository (likly using git-lfs for the binary files) to allow syncing between your various devices. bib-git has been tested on Windows, Linux (Ubuntu) and Android.

# Motivation
Tools like Zotero are great, but are currently (late 2017) lacking in terms of good Android clients that work offline. I personally like the idea of minimizing the number of services that I rely upon. I already have a paid GitHub account, so I can keep private repositories; for only a few extra dollars per month (on a service I already pay for), I was able to add a data pack, that allows me to add many GB of storage. To me, using this existing service (and increasing the price of this service slightly) was more attractive than signing up for another service.

# Technology Stack
bib-git is made up of a front-end, written with react. The backend is a bottle application that would normally be served using WSGI. While not part of this application, per se, it is expected that you'll use git and git-lfs for the bibliography files themselves. When running on Android, it is expected that you will use Termux to run git and also to run the python/bottle backend.


# Setup
Clone the repo to your disk and update the submodules:

```
git clone https://github.com/kloppen/bib-git
cd bib-git
git submodule update --init --recursive
```

You'll need to create a sub-folder under the bib-git folder called `library`. This sub-folder must contain a file `MyLibrary.json`. Initially `MyLibrary.json` must create an empty list. You can do so as follows:

```
mkdir library
echo "[]" >> library/MyLibrary.json
```

You'll probably want to set up a git repository in the `library` folder. The `library` folder is ignored by the git repository for the application, so the two will be separate.

The following assumes that you're using a conda environment. You'll need to modify the following instructions slightly if you're using a different python distribution (and want to use a virtual env) or wish to simply instal the requirements to you system's python. The back-end has only been tested with Python 3.6.

Create a conda environment and install the requirements:

```
conda create -n bib-git pip
source activate bib-git
pip install -r requirements.txt
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
xdg-open http://127.0.0.1:5032/ &
```

Or on Windows (make sure that you replace the paths with the correct paths for your system):

```
SETLOCAL
SET PYPATH="C:\Users\MyUserName\AppData\Local\conda\conda\envs\bib-git\python.exe"
SET BROWSERPATH="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
cd bib-git
start "" %PYPATH% "main.py"
start %BROWSERPATH% http://127.0.0.1:5032/
```

Running the launch script should launch the application. From here, you can import your existing library or create a new one. More on importing an existing library later.

# Android Setup
If you wish to run bib-git on android, you'll need to install a few things. First, install termux. Make sure that you give it storage permission.

Install hackers keyboard (optional). I find that this is a fairly good keyboard for using a terminal, vim, etc.

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

This program seems to work a little bit better with Firefox on Android, compared with Chrome. Regardless of which browser you use, make sure that you go tot Settings / Apps and grant your browser permission for "Storage." Otherwise, the browser won't be able to access build/index.html or any of the files in you library.

When you're open files on Firefox for Android, you'll need to tap-and-hold
the file and select "Open with App." Just clicking the link will fail.

You may choose to add an icon to the homescreen. Open index.html and under
"..."/Page, select "Add to Home Screen."

# Setting up the Library Repo
Export your library from you current library reference system as BibLaTeX and includ the attached files (optional, but highly useful). You can import this into `bib-git` by using the "Import BibLaTeX" button. Alternatively, you could manually copy a CSL-JSON file to the location library/MyLibrary.json"

When you initialize a git repository for your library, you'll probably want to enable git-lfs for PDF files (and whatever other type of files you use). Regualar old git doesn't like large binary files very much.

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

If some of you attached files have the extension `PDF` or `Pdf` or are different types of binary files, make sure that you set git-lfs to track those extensions too.

When you update your library, use the normal commit/push workflow that you 
would with any other git repo.

# Contributing
If you would like to contribute to this repository, I'd welcome your contributiosn. Please send me a pull request along with a description of what you're trying to change and why. I don't plan on being a particularly active maintainer for this particular repository, so please allow some time for me to respond.

