import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
    initializeAppCheck,
    ReCaptchaV3Provider
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app-check.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInAnonymously
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
import { collection, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBj72SFCM2wSHEP5IEqOCFNMP_FiL0gw28",
    authDomain: "test-489a1.firebaseapp.com",
    databaseURL: "https://test-489a1-default-rtdb.firebaseio.com",
    projectId: "test-489a1",
    storageBucket: "test-489a1.firebasestorage.app",
    messagingSenderId: "978892656529",
    appId: "1:978892656529:web:ea00af8b6e3768abba1430",
    measurementId: "G-N1382Z67VH"
};

const app = initializeApp(firebaseConfig);
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider("6LdRBSEsAAAAAGN7N84E9XvyNcSpJpmMgaEkOe7t"),
    isTokenAutoRefreshEnabled: true
});
const db = getFirestore(app);
const auth = getAuth(app);
let currentUser = null;
let currentpass = null;
let currentnote = null;
let currentnotename = null;
let currentnotecontent = null;
let currentbookname = null;
let currentbooknameref = null;
let themeindex = 0;

//changetheme




document.getElementById("moon").addEventListener("click", () => {
    document.getElementById("moon").style.display = "none";
    document.getElementById("sun").style.display = "block";
    setTimeout(() => {
        document.getElementById("moon").classList.add("showthememoon");
        document.getElementById("sun").classList.add("showthemesun");
    });
    day();
});

document.getElementById("sun").addEventListener("click", () => {
    document.getElementById("sun").style.display = "none";
    document.getElementById("moon").style.display = "block";
    setTimeout(() => {
        document.getElementById("moon").classList.remove("showthememoon");
        document.getElementById("sun").classList.remove("showthemesun");
    })
    night();
})

//makeday

function day() {
    themeindex = 1;
    document.getElementById("themehead").classList.add("themehead");
    document.getElementById("body").classList.add("themebody");
    document.getElementById("closenamenotebook").style.color = "black";
    document.getElementById("namediv").style.boxShadow = "2px 2px 8px black";
    document.getElementById("namedivh4").style.color = "rgba(0, 0, 0, 0.505)";
    document.getElementById("namedivh5").style.color = "rgba(0, 0, 0, 0.505)";
    document.getElementById("notebookname").style.borderBottom = "thin solid rgb(0, 0, 0)";
    document.getElementById("notebookpass").style.borderBottom = "thin solid rgb(0, 0, 0)";
    document.getElementById("notebookname").style.color = "black";
    document.getElementById("notebookpass").style.color = "black";
    document.getElementById("namediv2").style.boxShadow = "2px 2px 8px rgb(0, 0, 0)";
    document.getElementById("createname").style.borderBottom = "thin solid rgb(0, 0, 0)";
    document.getElementById("createpass").style.borderBottom = "thin solid rgb(0, 0, 0)";
    document.getElementById("createname").style.color = "black";
    document.getElementById("createpass").style.color = "black";
    document.getElementById("namediv2h5").style.color = "rgba(0, 0, 0, 0.505)";
    document.getElementById("addnote").classList.add("themetitlebtn");
    document.getElementById("backnote").classList.add("themetitlebtn");
    document.getElementById("deletenote").classList.add("themetitlebtn");
    document.getElementById("savechange").classList.add("themetitlebtn");
    document.getElementById("changepass").classList.add("themetitlebtn");
    document.getElementById("deletebook").classList.add("themetitlebtn");
    document.getElementById("notetitleh3").style.color = "black";
    document.querySelectorAll(".note-button").forEach(btn => {
        btn.classList.add("themenote-button");
    });
    document.getElementById("changepassword").classList.add("themechangepassword");
    document.getElementById("changepasswordh4").style.color = "rgba(0, 0, 0, 0.505)";
    document.getElementById("oldpassword").classList.add("changepasswordinput");
    document.getElementById("newpassword").classList.add("changepasswordinput");
    document.getElementById("renewpassword").classList.add("changepasswordinput");
    document.getElementById("closenchangepassword").style.color = "black";
    document.getElementById("addnotediv").classList.add("themeaddnotediv");
    document.getElementById("closeaddnotediv").style.color = "black";
    document.getElementById("addnotedivh3").style.color = "rgba(0, 0, 0, 0.677)";
    document.getElementById("notename").classList.add("changepasswordinput");
    document.getElementById("notecontent").style.color = "black";
    document.getElementById("notecontent").style.background = "white";
    document.getElementById("notecontent").style.border = "1px solid black";
    document.getElementById("notetext").classList.add("themenotetext");
    document.getElementById("notification").classList.add("themenotification");
}

//makenight

function night() {
    themeindex = 0;
    document.getElementById("themehead").classList.remove("themehead");
    document.getElementById("body").classList.remove("themebody");
    document.getElementById("closenamenotebook").style.color = "white";
    document.getElementById("namediv").style.boxShadow = "2px 2px 8px white";
    document.getElementById("namedivh4").style.color = "rgba(255, 255, 255, 0.505)";
    document.getElementById("namedivh5").style.color = "rgba(255, 255, 255, 0.505)";
    document.getElementById("notebookname").style.borderBottom = "thin solid white";
    document.getElementById("notebookpass").style.borderBottom = "thin solid white";
    document.getElementById("notebookname").style.color = "white";
    document.getElementById("notebookpass").style.color = "white";
    document.getElementById("namediv2").style.boxShadow = "2px 2px 8px white";
    document.getElementById("createname").style.borderBottom = "thin solid white";
    document.getElementById("createpass").style.borderBottom = "thin solid white";
    document.getElementById("createname").style.color = "white";
    document.getElementById("createpass").style.color = "white";
    document.getElementById("namediv2h5").style.color = "rgba(255, 255, 255, 0.505)";
    document.getElementById("addnote").classList.remove("themetitlebtn");
    document.getElementById("backnote").classList.remove("themetitlebtn");
    document.getElementById("deletenote").classList.remove("themetitlebtn");
    document.getElementById("savechange").classList.remove("themetitlebtn");
    document.getElementById("changepass").classList.remove("themetitlebtn");
    document.getElementById("deletebook").classList.remove("themetitlebtn");
    document.getElementById("notetitleh3").style.color = "rgba(255,255,255,0.633)";
    document.querySelectorAll(".note-button").forEach(btn => {
        btn.classList.remove("themenote-button");
    });
    document.getElementById("changepassword").classList.remove("themechangepassword");
    document.getElementById("changepasswordh4").style.color = "rgba(255, 255, 255, 0.505)";
    document.getElementById("oldpassword").classList.remove("changepasswordinput");
    document.getElementById("newpassword").classList.remove("changepasswordinput");
    document.getElementById("renewpassword").classList.remove("changepasswordinput");
    document.getElementById("closenchangepassword").style.color = "white";
    document.getElementById("addnotediv").classList.remove("themeaddnotediv");
    document.getElementById("closeaddnotediv").style.color = "white";
    document.getElementById("addnotedivh3").style.color = "rgba(255, 255, 255, 0.677)";
    document.getElementById("notename").classList.remove("changepasswordinput");
    document.getElementById("notecontent").style.color = "white";
    document.getElementById("notecontent").style.background = "black";
    document.getElementById("notecontent").style.border = "1px solid white";
    document.getElementById("notetext").classList.remove("themenotetext");
    document.getElementById("notification").classList.remove("themenotification");
}


//shownotification

function note(value) {
    document.getElementById("notification").textContent = value;
    document.getElementById("notification").classList.add("shownotification");
    if (themeindex == 1) {
        document.getElementById("notification").classList.add("themenotification");
    }
    else {
        document.getElementById("notification").classList.remove("themenotification");
    }
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
    notetitleDiv.innerHTML = `<h3 id="notetitleh3" style="color: rgba(255,255,255,0.633);text-align: center;">All notes(Click to open)</h3>`;
    const saveref = collection(db, "notebooks", currentpass, "notes");
    const q = query(saveref, orderBy("createdAt", "desc"));
    load();
    const snap = await getDocs(q);
    load();
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
        if (themeindex == 1) {
            noteButton.classList.add("themenote-button");
        }
        else {
            noteButton.classList.remove("themenote-button");
        }

        // Click event to show note content
        noteButton.addEventListener("click", () => {
            currentnotename = noteData.name;
            currentnote = docSnap.id;
            document.getElementById("deletebook").style.display = "none";
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
                if (themeindex == 1) {
                    document.getElementById("notetext").classList.add("themenotetext");
                }
                else {
                    document.getElementById("notetext").classList.remove("themenotetext");
                }
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
    document.getElementById("deletebook").style.display = "block";
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
    load();
    let a = prompt("really you want to delete this note(y,n) : ");
    a = a.trim();
    if (a == "y") {
        const notedel = doc(db, "notebooks", currentpass, "notes", currentnote);
        await deleteDoc(notedel);
        shownotes();
        note("note deleted! now you can go back");
    }
    load();
    return;

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
    load();
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
    load();
});

//changenotebookpass
document.getElementById("changepass").addEventListener("click", () => {
    if (themeindex == 1) {
        document.getElementById("changepassword").classList.add("themechangepassword");
        document.getElementById("changepasswordh4").style.color = "rgba(0, 0, 0, 0.505)";
        document.getElementById("closenchangepassword").style.color = "black";
        document.getElementById("oldpassword").classList.add("changepasswordinput");
        document.getElementById("newpassword").classList.add("changepasswordinput");
        document.getElementById("renewpassword").classList.add("changepasswordinput");
    }
    else {
        document.getElementById("changepassword").classList.remove("themechangepassword");
        document.getElementById("changepasswordh4").style.color = "rgba(255, 255, 255, 0.505)";
        document.getElementById("closenchangepassword").style.color = "white";
        document.getElementById("oldpassword").classList.remove("changepasswordinput");
        document.getElementById("newpassword").classList.remove("changepasswordinput");
        document.getElementById("renewpassword").classList.remove("changepasswordinput");
    }
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
    load();
    const op = document.getElementById("oldpassword").value;
    const np = document.getElementById("newpassword").value;
    const rnp = document.getElementById("renewpassword").value;
    if (!op || !np || !rnp) {
        note("please fill all the information");
        load();
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
        load();
        return;
    }
    load();
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
            load();
            const snap = await getDocs(colRef);
            load();
            if (snap.empty) return;

            for (const document of snap.docs) {
                await deleteDoc(document.ref);
            }
        }
        load();
        await deleteAllDocsInCollection(collection(db, "notebooks", currentpass, "notes"));
        await deleteAllDocsInCollection(collection(db, "notebooks", currentpass, "password"));
        await deleteDoc(doc(db, "notebooks", currentpass));
        load();
        note("notebook and its subcollections deleted — reloading page...");
        setTimeout(() => location.reload(), 2000);
    }
    else {
        note("incorrect");
    }
})


//showaddnotediv
document.getElementById("addnote").addEventListener("click", async () => {
    if (themeindex == 1) {
        document.getElementById("addnotediv").classList.add("themeaddnotediv");
        document.getElementById("closeaddnotediv").style.color = "black";
        document.getElementById("addnotedivh3").style.color = "rgba(0, 0, 0, 0.677)";
        document.getElementById("notename").classList.add("changepasswordinput");
        document.getElementById("notecontent").style.color = "black";
        document.getElementById("notecontent").style.background = "white";
        document.getElementById("notecontent").style.border = "1px solid black";
    }
    else {
        document.getElementById("addnotediv").classList.remove("themeaddnotediv");
        document.getElementById("closeaddnotediv").style.color = "white";
        document.getElementById("addnotedivh3").style.color = "rgba(255, 255, 255, 0.677)";
        document.getElementById("notename").classList.remove("changepasswordinput");
        document.getElementById("notecontent").style.color = "white";
        document.getElementById("notecontent").style.background = "black";
        document.getElementById("notecontent").style.border = "1px solid white";
    }
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
        load.style.display = "flex";
    }
    else {
        load.style.display = "none";
    }
    if (themeindex == 1) {
        load.style.color = "flex";
    }
    else {
        load.style.color = "white";
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
        load();
        const snap = await getDocs(notebookref);
        load();
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
            load();
            const passdoc = await getDocs(passref);
            load();
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
    load();
    const notedocref = await addDoc(notebookref, {
        name: name,
        createdAt: new Date()
    });
    load();
    currentpass = notedocref.id;
    const passref = collection(db, "notebooks", notedocref.id, "password");
    load();
    await addDoc(passref, {
        password: pass
    });
    load();
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
    if (!name || !content) {
        note("please enter all imformation");
        load();
        return;
    }
    const saveref = collection(db, "notebooks", currentpass, "notes");
    load();
    await addDoc(saveref, {
        name: name,
        content: content,
        createdAt: serverTimestamp()
    });
    load();
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