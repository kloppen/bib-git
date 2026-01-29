`bib-git` is a bibliography management system. It stores references, optionally with attachments (such as the article itself) and allows you to access your list of references in your web browser. All data is storred locally on your computer. 
It's expected that you would store the reference database (which is just a JSON file) and any attached files in a git repository (likly using git-lfs for the binary files) to allow syncing between your various devices. bib-git has been tested on Windows, Linux (Ubuntu) and Android (though not recently -- Android may no longer work).

While the name contains `git`, this project no longer uses `git` in its functionality. It may be renamed in the future.

# Motivation
Tools like Zotero are great, but are currently (late 2017) lacking in terms of good Android clients that work offline. I personally like the idea of minimizing the number of services that I rely upon. I already have cloud
storage services and I'd rather use one of those, rather than add yet another service.

# Technology Stack
bib-git is made up of a front-end, written with react. The backend is a bottle application that would normally be served using `bottle`. While not part of this application, per se, it is expected that you'll use a cloud
service and `rclone` for the files themselves. When running on Android, it is expected that you will use Termux to run git and also to run the python/bottle backend (note this may no longer work).


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

You'll want to set up a cloud share (OneDrive, Dropbox, etc.) for a "remote" version of the `MyLibrary.json` file to allow you to sync between devices. Note that this "remote" file
will be a separate file from the "local" file that you just created. See the "Config File" section below for specifying file locations.

You'll also want to sync the files (PDFs, etc.) to a cloud host, such as Backblaze B2, Amazon S3, or another service of your choosing. There are instructions for doing so in the
[rclone.md] file.

Next, create a conda environment and install the requirements:

```
conda create -n bib-git pip
source activate bib-git
pip install -r requirements.txt
```

# Config File
The file paths can be changed by using a configuraiton file. Create a text file with the
filename `config.ini` with the following contents. Change the filenames/file pahts
as appropriate.

```
[DEFAULT]
LOCAL_LIBRARY_FILES = "./library/files"
LOCAL_JSON = "./library/MyLibrary.json"
LOCAL_ARCHIVE = "./library/archive"
REMOTE_JSON = "./remote/remote.json"
REMOTE_ARCHIVE = "./remote/remote_archive"
```

# Launch Script

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
SET CONDAACTIVATE="C:\ProgramData\Miniconda3\Scripts\activate.bat"
SET BROWSERPATH="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"

CALL %CONDAACTIVATE% bib-git
cd bib-git
start %BROWSERPATH% http://127.0.0.1:5032/
CALL "python" "main.py"
```

Running the launch script should launch the application. From here, you can import your existing library or create a new one. More on importing an existing library later.

# Android Setup
**This section was last tested circa 2018 and may not work. Use at your own risk.**

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


# Merging Changes
To merge changes from a remote library file, use the "Diff with Remote"
feature, choose the fields to update, then press "Save."

When saving the merged librarie(s), a copy is made prior to saving and stored
in the specified archive folder as a compressed ZIP file.

# Ignoring Dead Links
In some cases, it may be useful to ignore certain dead links on some computers.
For example, if certain files are not synced to all computers, but you don't
want those to show up when you click the "Check for Dead" button.
To ignore certain files, create a text file called `deadlinkignore.local`.
Each line should contain a pattern matching one or more file to ignore.
Pattern matching uses Unix shell-style wildcards.
See [Python fnmatch](https://docs.python.org/3/library/fnmatch.html) for
more information.

# Contributing
If you would like to contribute to this repository, I'd welcome your contributiosn. Please send me a pull request along with a description of what you're trying to change and why. I don't plan on being a particularly active maintainer for this particular repository, so please allow some time for me to respond.

