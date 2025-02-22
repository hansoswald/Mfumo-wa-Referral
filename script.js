// Function ya kujisajili kama wakala
function jiungeWakala() {
    const jina = document.getElementById("jinaWakala").value;
    const simu = document.getElementById("simuWakala").value;
    const email = document.getElementById("emailWakala").value;

    if (jina && simu && email) {
        const wakalaID = generateWakalaID();
        document.getElementById("wakalaID").innerText = "Referral ID yako ni: " + wakalaID;

        // Hifadhi majina ya wakala na ID kwenye localStorage
        const wakalaData = { jina: jina, simu: simu, email: email, id: wakalaID };
        
        // Check kama ID ya wakala ipo tayari katika localStorage
        let allWakalas = JSON.parse(localStorage.getItem("wakalas")) || [];
        const existingWakala = allWakalas.find(wakala => wakala.id === wakalaID);

        // Kama ID ya wakala ipo, usiruhusu kujisajili tena
        if (!existingWakala) {
            allWakalas.push(wakalaData);
            localStorage.setItem("wakalas", JSON.stringify(allWakalas));
            alert("Umejisajili kwa mafanikio!");
            onyeshaWakalas(); // Onyesha orodha mpya ya wakala
        } else {
            alert("Umejisajili tayari.");
        }
    } else {
        alert("Tafadhali jaza fomu kwa usahihi.");
    }
}

// Kizazi cha Wakala ID
function generateWakalaID() {
    return 'ID' + Math.floor(Math.random() * 10000);  // Hapa unaweza kuboresha kwa kutumia algorithm maalum
}

// Function ya kuonyesha orodha ya vijana waliojisajili baada ya kuingiza neno la siri sahihi
function onyeshaWakalas() {
    const passwordInput = document.getElementById("adminPassword").value; // Chukua neno la siri
    const correctPassword = "kolman"; // Neno la siri la admin

    // Angalia kama password ni sahihi
    if (passwordInput === correctPassword) {
        const allWakalas = JSON.parse(localStorage.getItem("wakalas")) || [];
        
        let output = "<ul>";
        allWakalas.forEach(wakala => {
            output += `<li>${wakala.jina} - ${wakala.id}</li>`;
        });
        output += "</ul>";

        document.getElementById("wakalasList").innerHTML = output;
        document.getElementById("wakalasList").style.display = "block"; // Onyesha orodha
    } else {
        // Ujumbe wa kosa ikiwa password ni mbaya
        alert("Neno la siri si sahihi. Tafadhali jaribu tena.");
    }
}

// Function ya kuzuia kurudi kwenye orodha baada ya mtumiaji kusajili
function addWakala() {
    const jina = document.getElementById("jinaWakala").value;
    const simu = document.getElementById("simuWakala").value;
    const email = document.getElementById("emailWakala").value;

    // Hakikisha jina lipo ili kujaza ID
    if (jina && simu && email) {
        const wakalas = JSON.parse(localStorage.getItem("wakalas")) || [];
        const newWakala = {
            jina: jina,
            id: "WAKALA" + (wakalas.length + 1) // Ongeza ID ya kipekee
        };

        wakalas.push(newWakala); // Ongeza wakala kwenye orodha
        localStorage.setItem("wakalas", JSON.stringify(wakalas)); // Hifadhi orodha

        alert("Umejiunga kama wakala. Tafadhali tumia neno la siri kuona orodha.");
    } else {
        alert("Tafadhali jaza maelezo yote.");

    }
}

// Ongeza hii kwa kufanya orodha ionekane moja kwa moja na neno la siri sahihi
document.getElementById("adminPassword").addEventListener("change", onyeshaWakalas);


function tumaWhatsApp() {
    // Kuchukua maelezo ya mteja kutoka kwenye fomu
    const jinaMteja = document.getElementById("jinaMteja").value;
    const simuMteja = document.getElementById("simuMteja").value;
    const hudumaMteja = document.getElementById("hudumaMteja").value;
    const wakalaID = document.getElementById("wakala").value;
    
    // Hakikisha kwamba maelezo yote yamejaa
    if (jinaMteja && simuMteja && hudumaMteja && wakalaID) {
        // Ujumbe utakaotumwa
        const message = `Habari, jina langu ni ${jinaMteja}, namba yangu ni ${simuMteja}, na ninahitaji huduma ya ${hudumaMteja}. Nimeletwa na wakala mwenye ID: ${wakalaID}.`;

        // URL ya WhatsApp
        const phoneNumber = "255765752918"; // Hapa weka namba yako ya WhatsApp
        const encodedMessage = encodeURIComponent(message); // Hakikisha ujumbe umefungwa kwa format sahihi
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // Fungua WhatsApp na ujumbe tayari
        window.open(whatsappURL, "_blank");
    } else {
        alert("Tafadhali jaza maelezo yote.");
    }
}


