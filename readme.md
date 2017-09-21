


# Android Setup
Install termux

Install hackers keyboard (optional)

Install go, then git-lfs (which isn't availabel directly for termux, but can be built from source):

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
cd bin
git lfs install
```

