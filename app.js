const SUPABASE_URL = "https://pflxlrtyqrzxnexwnyzf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_ayUPsCKYEtnbU1iK5JukPw_3nzo3KrD";

const songContainer = document.getElementById("song");
const loading = document.getElementById("loading");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");


// --------------------------------
// FETCH SONG
// --------------------------------

async function getSong(songNumber) {

    loading.style.display = "block";
    songContainer.innerHTML = "";

    try {

        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/songs?select=*&song_no=eq.${encodeURIComponent(songNumber)}&limit=1`,
            {
                headers: {
                    "apikey": SUPABASE_ANON_KEY,
                    "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
                }
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch song");
        }

        const data = await response.json();

        if (data.length === 0) {

            songContainer.innerHTML = `
                <p>Song ${songNumber} was not found.</p>
            `;

            return;
        }

        const song = data[0];

        songContainer.innerHTML = `
            <h1 class="song-title">
                Song ${song.song_no}
            </h1>

            <div class="lyrics">
                ${escapeHTML(song.lyrics)}
            </div>
        `;

    } catch (error) {

        console.error(error);

        songContainer.innerHTML = `
            <p>Unable to load the song.</p>
        `;

    } finally {

        loading.style.display = "none";
    }
}


// --------------------------------
// PREVENT HTML INJECTION
// --------------------------------

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// --------------------------------
// SEARCH BUTTON
// --------------------------------

searchBtn.addEventListener("click", () => {

    const number = searchInput.value.trim();

    if (!number) return;

    window.location.href = `?song=${number}`;

});


// --------------------------------
// ENTER KEY
// --------------------------------

searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        searchBtn.click();

    }

});


// --------------------------------
// HAMBURGER MENU
// --------------------------------

const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const sideMenu = document.getElementById("sideMenu");

menuBtn.addEventListener("click", () => {

    sideMenu.classList.add("open");

});

closeBtn.addEventListener("click", () => {

    sideMenu.classList.remove("open");

});


// --------------------------------
// LOAD SONG FROM URL
// --------------------------------

const params = new URLSearchParams(window.location.search);

const songNumber = params.get("song");

if (songNumber) {

    searchInput.value = songNumber;

    getSong(songNumber);

} else {

    loading.style.display = "none";

    songContainer.innerHTML = `
        <h2>Project Cecilia</h2>
        <p>Enter a song number to begin.</p>
    `;

}
