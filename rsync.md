
# Setup
- Install `rclone` according to the instructions applicable to your
  opperating system. See [https://rclone.org/install/].

These instructions are written for a Backblaze b2 bucket. If you
want to use a different cloud storage system, you'll need to adapt
the settings.

Log into your Backblaze account and create a new bucket with a name
of your choice. Create a new application key with read/write
privaledges. Note the application key ID and the application key.

```bash
cd <the path to your `LOCAL_LIBRARY_FILES` folder>
rclone config
# Select 'n' for New Remote
# Enter a name: "library-b2"
# Choose 5 (Backblaze b2)
# Enter the application key ID and application key
# set hard_delete = false
# Edit advanced config = n
# Keep the remote = y
```

Create a second remote for encryption. Note that the passwords
supplied below are obfuscated and stored in the `rsync.config`
file. You shouldn't choose re-used passwords and if the config
file could be exposed, you should ecrypt the configuration itself.

```bash
rclone config
# 'n' for new remote
# Enter name: library-crypt
# Choose 14 (crypt)
# Enter library-b2:<bucket-name>
# Standard filename encryption
# directory name encryption
# create a password (Enter a random password of your choice. Note this.)
# create password2 (Enter a random password of your choice. Note this.)
# Enter advanced config = n
# Keep the remote = y
# quit config
```

rclone bisync --interactive  ./ test1-crypt:/

Encrypt the configuration file (optional)

```bash
rclone config
# s - set configuration password
# a - add a password
# enter your password (choose a password of your choice)
# quit
```

Now, you will need to enter this password each time you use rclone.

# Reference
[https://cetteup.com/28/how-to-set-up-an-encrypted-sync-backup-to-backblaze-b2-on-linux-ubuntu-16-04-18-04/]