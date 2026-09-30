const SUPABASE_URL = "https://pflxlrtyqrzxnexwnyzf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_ayUPsCKYEtnbU1iK5JukPw_3nzo3KrD";


const songNumber = document.getElementById("songNumber");
const lyrics = document.getElementById("lyrics");
const submitBtn = document.getElementById("submitBtn");
const status = document.getElementById("status");


submitBtn.addEventListener("click", addSong);


async function addSong() {

    const number = songNumber.value.trim();
    const text = lyrics.value.trim();


    // VALIDATION

    if (!number) {

        status.textContent = "Please enter a song number.";

        return;
    }


    if (!text) {

        status.textContent = "Please enter the song.";

        return;
    }


    submitBtn.disabled = true;
    status.textContent = "Adding song...";


    try {

        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/songs`,
            {
                method: "POST",

                headers: {

                    "apikey": SUPABASE_ANON_KEY,

                    "Authorization":
                        `Bearer ${SUPABASE_ANON_KEY}`,

                    "Content-Type":
                        "application/json",

                    "Prefer":
                        "return=minimal"
                },

                body: JSON.stringify({

                    song_no: Number(number),

                    lyrics: text

                })
            }
        );


        if (!response.ok) {

            const error = await response.text();

            throw new Error(error);

        }


        status.textContent =
            `Song ${number} added successfully.`;


        songNumber.value = "";
        lyrics.value = "";


    } catch (error) {

        console.error(error);

        status.textContent =
            "Failed to add song. The song number may already exist.";

    } finally {

        submitBtn.disabled = false;

    }

}
