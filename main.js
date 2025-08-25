import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
            import {
                getAuth,
                createUserWithEmailAndPassword,
                signInWithEmailAndPassword,
                signOut,
                onAuthStateChanged
            } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
            import {
                getFirestore,
                doc,
                setDoc,
                getDoc,
                addDoc,
                updateDoc,
                getDocs,
                deleteDoc
            } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
            import { collection } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

            const firebaseConfig = {
                apiKey: "AIzaSyD4PXjjde3JDhGZlz0kgxRV5shpXlOzr-4",
                authDomain: "test-6dbab.firebaseapp.com",
                projectId: "test-6dbab",
                storageBucket: "test-6dbab.firebasestorage.app",
                messagingSenderId: "406622333622",
                appId: "1:406622333622:web:d05642da141d52f1cf5417",
                measurementId: "G-P7HJKPQJK3"
            };

            const app = initializeApp(firebaseConfig);
            const db = getFirestore(app);
            const auth = getAuth(app);
            let currentUser = null;
            let currentpass = null;
            let currentnote = null;
            let currentnotename = null;
            let currentnotecontent = null;
            let currentbookname = null;
            let currentbooknameref = null;

            //shownotification

            function note(value) {
                document.getElementById("notification").textContent = value;
                document.getElementById("notification").classList.add("shownotification");
                setTimeout(() => {
                    document.getElementById("notification").classList.remove("shownotification");
                }, 3000);
            }

            //authremove


            function authremove() {
                document.getElementById("changepass").style.display = "block";
                document.getElementById("deletebook").style.display = "block";
                document.getElementById("auth").classList.add("authremove");
                setTimeout(() => {
                    document.getElementById("addnote").classList.add("shownamediv");
                    document.getElementById("changepass").classList.add("showchangepass");
                    document.getElementById("deletebook").classList.add("showdeletebook");
                });
                setTimeout(() => {
                    document.getElementById("notetitle").style.display = "block";
                    document.getElementById("auth").style.display = "none";
                }, 500)
                shownotes();
            }

            async function shownotes() {
                load();
                const notetitleDiv = document.getElementById("notetitle");
                notetitleDiv.innerHTML = `<h3 style="color: rgba(255,255,255,0.633);text-align: center;">All notes(Click to open)</h3>`;
                const saveref = collection(db, "notebooks", currentpass, "notes");
                const snap = await getDocs(saveref);

                if (snap.empty) {
                    note("No notes found, add one first");
                    load();
                    return;
                }

                snap.forEach(docSnap => {
                    const noteData = docSnap.data();

                    // Create clickable note title
                    const noteButton = document.createElement("button");
                    noteButton.textContent = noteData.name || "Untitled";
                    noteButton.classList.add("note-button");
                    noteButton.onmouseover = () => { noteButton.style.background = "red"; };
                    noteButton.onmouseout = () => { noteButton.style.background = "black"; };

                    // Click event to show note content
                    noteButton.addEventListener("click", () => {
                        currentnotename = noteData.name;
                        currentnote = docSnap.id;
                        document.getElementById("deletebook").style.display="none";
                        document.getElementById("changepass").style.display = "none";
                        document.getElementById("addnote").style.display = "none";
                        document.getElementById("backnote").style.display = "block";
                        document.getElementById("deletenote").style.display = "block";
                        document.getElementById("notetitle").style.display = "none";
                        document.getElementById("notetext").style.display = "block";
                        setTimeout(() => {
                            document.getElementById("changepass").classList.remove("showchangepass");
                            document.getElementById("backnote").classList.add("showbacknote");
                            document.getElementById("deletenote").classList.add("showdeletenote");
                            document.getElementById("notetext").classList.add("shownotetext");
                            document.getElementById("notetext").value = noteData.content;
                            document.getElementById("addnote").classList.remove("shownamediv");
                            document.getElementById("deletebook").classList.remove("showdeletebook");
                        });
                    });

                    notetitleDiv.appendChild(noteButton);
                });

                load();
            }

            //backnote
            document.getElementById("backnote").addEventListener("click", () => {
                document.getElementById("deletebook").style.display="block";
                document.getElementById("changepass").style.display = "block";
                document.getElementById("backnote").style.display = "none";
                document.getElementById("deletenote").style.display = "none";
                document.getElementById("addnote").style.display = "block";
                document.getElementById("notetitle").style.display = "block";
                document.getElementById("notetext").style.display = "none";
                setTimeout(() => {
                    document.getElementById("changepass").classList.add("showchangepass");
                    document.getElementById("backnote").classList.remove("showbacknote");
                    document.getElementById("notetext").value = "";
                    document.getElementById("addnote").classList.add("shownamediv");
                    document.getElementById("notetext").classList.remove("shownotetext");
                    document.getElementById("deletenote").classList.remove("showdeletenote");
                    document.getElementById("deletebook").classList.add("showdeletebook");
                })
            });

            //deletenote

            document.getElementById("deletenote").addEventListener("click", async () => {
                const notedel = doc(db, "notebooks", currentpass, "notes", currentnote);
                await deleteDoc(notedel);
                shownotes();
                note("note deleted! now you can go back");
            });


            //loadchangenote

            document.getElementById("notetext").addEventListener("input", async () => {
                note("please save your changes before leaving");
                currentnotecontent = document.getElementById("notetext").value;
                document.getElementById("savechange").style.display = "block";
                document.getElementById("backnote").style.pointerEvents = "none";
                document.getElementById("deletenote").style.pointerEvents = "none";
                setTimeout(() => {
                    document.getElementById("savechange").classList.add("showsavechange");
                });
            });

            //updatenote

            document.getElementById("savechange").addEventListener("click", async () => {
                const changenotref = doc(db, "notebooks", currentpass, "notes", currentnote);
                await updateDoc(changenotref, {
                    name: currentnotename,
                    content: currentnotecontent
                })
                note("note is saved!");
                shownotes();
                document.getElementById("savechange").style.display = "none";
                document.getElementById("backnote").style.pointerEvents = "auto";
                document.getElementById("deletenote").style.pointerEvents = "auto";
                setTimeout(() => {
                    document.getElementById("savechange").classList.remove("showsavechange");
                });
            });

            //changenotebookpass
            document.getElementById("changepass").addEventListener("click", () => {
                document.getElementById("notetitle").style.display = "none";
                document.getElementById("addnote").style.pointerEvents = "none";
                document.getElementById("deletebook").style.pointerEvents = "none";
                document.getElementById("changepassword").style.display = "block";
                setTimeout(() => {
                    document.getElementById("changepassword").classList.add("showchangepassword");
                })
            })

            //closechangenotebookpass

            document.getElementById("closenchangepassword").addEventListener("click", () => {
                document.getElementById("notetitle").style.display = "block";
                document.getElementById("changepassword").style.display = "none";
                document.getElementById("addnote").style.pointerEvents = "auto";
                document.getElementById("deletebook").style.pointerEvents = "auto";
                setTimeout(() => {
                    document.getElementById("changepassword").classList.remove("showchangepassword");
                })
            })

            //savechangedpassword
            document.getElementById("savepass").addEventListener("click", async () => {
                const op = document.getElementById("oldpassword").value;
                const np = document.getElementById("newpassword").value;
                const rnp = document.getElementById("renewpassword").value;
                if (!op || !np || !rnp) {
                    note("please fill all the information");
                    return;
                }
                const passref = collection(db, "notebooks", currentpass, "password")
                const passdoc = await getDocs(passref);
                let savedpass = null;
                let savedpassref = null;
                passdoc.forEach(doc => {
                    savedpass = doc.data().password;
                    savedpassref = doc;
                });
                if (op == savedpass && np == rnp) {
                    await updateDoc(savedpassref.ref, {
                        password: np
                    });
                    note("password changed");
                    document.getElementById("addnote").style.pointerEvents = "auto";
                    document.getElementById("deletebook").style.pointerEvents = "auto";
                    document.getElementById("notetitle").style.display = "block";
                    document.getElementById("changepassword").style.display = "none";
                    setTimeout(() => {
                        document.getElementById("changepassword").classList.remove("showchangepassword");
                    });
                    document.getElementById("oldpassword").value = "";
                    document.getElementById("newpassword").value = "";
                    document.getElementById("renewpassword").value = "";
                }
                else {
                    note("Please enter the correct old password, and make sure new password and re-entered password are the same");
                    return;
                }
            });

            //deletebook

            document.getElementById("deletebook").addEventListener("click", async () => {
                let dbookname = null;
                dbookname = prompt("if you want to delete this book then please write the name of this book");
                if (!dbookname) {
                    note("please enter name there if you want to delete");
                    return;
                }
                dbookname = dbookname.trim();
                if (currentbookname == dbookname) {
                    async function deleteAllDocsInCollection(colRef) {
                        const snap = await getDocs(colRef);
                        if (snap.empty) return;

                        for (const document of snap.docs) {
                            await deleteDoc(document.ref);
                        }
                    }
                    await deleteAllDocsInCollection(collection(db, "notebooks", currentpass, "notes"));
                    await deleteAllDocsInCollection(collection(db, "notebooks", currentpass, "password"));
                    await deleteDoc(doc(db, "notebooks", currentpass));
                    note("notebook and its subcollections deleted — reloading page...");
                    setTimeout(() => location.reload(), 2000);
                }
                else
                {
                    note("incorrect");
                }
            })


            //showaddnotediv
            document.getElementById("addnote").addEventListener("click", async () => {
                document.getElementById("addnotediv").style.display = "block";
                document.getElementById("changepass").style.pointerEvents = "none";
                document.getElementById("deletebook").style.pointerEvents = "none";
                document.getElementById("notetitle").style.display = "none";
                setTimeout(() => {
                    document.getElementById("addnotediv").classList.add("shownamediv");
                });
            });
            document.getElementById("closeaddnotediv").addEventListener("click", () => {
                document.getElementById("addnotediv").classList.remove("shownamediv");
                document.getElementById("changepass").style.pointerEvents = "auto";
                document.getElementById("deletebook").style.pointerEvents = "auto";
                setTimeout(() => {
                    document.getElementById("addnotediv").style.display = "none";
                    document.getElementById("notetitle").style.display = "block";
                }, 500)
            })

            //loading

            function load() {
                const load = document.getElementById("loading");
                if (load.style.display == "none") {
                    load.style.display = "block";
                }
                else {
                    load.style.display = "none";
                }
            }

            //namenotebookdiv

            document.getElementById("opennotes").addEventListener("click", () => {
                document.getElementById("notebookname").style.display = "block";
                document.getElementById("gotonotebook").style.display = "block";
                document.getElementById("notebookpass").style.display = "none";
                document.getElementById("gotonotebook1").style.display = "none";
                document.getElementById("namediv").style.display = "block";
                document.getElementById("main").style.display = "none";
                setTimeout(() => {
                    document.getElementById("namediv").classList.add("shownamediv");
                })
            });
            document.getElementById("closenamenotebook").addEventListener("click", () => {
                document.getElementById("namediv").classList.remove("shownamediv");
                setTimeout(() => {
                    document.getElementById("main").style.display = "flex";
                    document.getElementById("namediv").style.display = "none";
                }, 500);
            });

            //addnotesname
            document.getElementById("gotonotebook").addEventListener("click", async () => {
                let found = 0;
                let notedocref = null;
                load();
                const name = document.getElementById("notebookname").value.trim();
                if (!name) {
                    note("please enter the name of your notebook");
                    load();
                    return;
                }
                else {
                    const notebookref = collection(db, "notebooks");
                    const snap = await getDocs(notebookref);
                    snap.forEach(doc => {
                        if (doc.data().name == name) {
                            notedocref = doc.id;
                            currentbooknameref = doc;
                            found = 1;
                            return;
                        }
                    });

                }
                if (found == 1) {
                    currentbookname = name;
                    document.getElementById("notebookname").style.display = "none";
                    document.getElementById("gotonotebook").style.display = "none";
                    document.getElementById("notebookpass").style.display = "block";
                    document.getElementById("gotonotebook1").style.display = "block";
                    document.getElementById("gotonotebook1").addEventListener("click", async () => {
                        let pass = document.getElementById("notebookpass").value;
                        if (!pass) {
                            note("enter password");

                            return;
                        }
                        currentpass = notedocref;
                        const passref = collection(db, "notebooks", notedocref, "password")
                        const passdoc = await getDocs(passref);
                        let savedpass = null;
                        passdoc.forEach(doc => {
                            savedpass = doc.data().password;
                        });
                        if (savedpass == pass) {
                            note("correct");
                            authremove();
                        }
                        else {
                            note("wrong pass");
                        }
                    })

                }
                else {
                    document.getElementById("namediv").classList.remove("shownamediv");
                    setTimeout(() => {
                        document.getElementById("namediv").style.display = "none";
                        document.getElementById("namediv2").classList.add("shownamediv");
                    }, 500);
                }
                load();
            });

            //create notebook
            document.getElementById("create").addEventListener("click", async () => {
                load();
                const name = document.getElementById("createname").value.trim();
                const pass = document.getElementById("createpass").value;
                if (!name || !pass) {
                    note("Please enter all information");
                    return;
                }
                const notebookref = collection(db, "notebooks");
                const notedocref = await addDoc(notebookref, {
                    name: name,
                    createdAt: new Date()
                });
                currentpass = notedocref.id;
                const passref = collection(db, "notebooks", notedocref.id, "password");
                await addDoc(passref, {
                    password: pass
                });
                currentbookname = name;
                note("notebook created");
                load();
                authremove();
            });


            //savenotes

            document.getElementById("savenote").addEventListener("click", async () => {
                load();
                const name = document.getElementById("notename").value;
                const content = document.getElementById("notecontent").value;
                const saveref = collection(db, "notebooks", currentpass, "notes");
                await addDoc(saveref, {
                    name: name,
                    content: content
                });
                note("note saved");
                document.getElementById("notename").value = "";
                document.getElementById("notecontent").value = "";
                document.getElementById("changepass").style.pointerEvents = "auto";
                document.getElementById("deletebook").style.pointerEvents = "auto";
                document.getElementById("addnotediv").classList.remove("shownamediv");
                setTimeout(() => {
                    document.getElementById("notetitle").style.display = "block";
                    document.getElementById("addnotediv").style.display = "none";
                }, 500)
                document.getElementById("addnote").classList.add("shownamediv");
                load();
                shownotes();
            })