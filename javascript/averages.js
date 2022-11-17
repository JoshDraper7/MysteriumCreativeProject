const SUPABASE_URL = 'https://cacavrzzzevgkadmvfgl.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhY2F2cnp6emV2Z2thZG12ZmdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg2MzQ5MDYsImV4cCI6MTk4NDIxMDkwNn0.qcLdgZTEXypmeRVQRXd8n_zOPVrZcqK7cAY-VU3Uqv4'
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
//var playerType = "";
window.onload = async function() {
    async function loadData() {
        const { data, error } = await _supabase
                .from('Set')
                .select('tot_attempts, tot_made, tot_percentage, distance');
        console.log(data)
        console.log(error)
        const distancesMap = new Map();
        const last5 = new Map();
        let setsHtml = "";
        for (let i = 0; i < data.length; i++) {
            let attempts;
            let made;
            let count;
            if (distancesMap.has(data.at(i).distance)) {
                attempts = parseInt(distancesMap.get(data[i].distance).attempts) + parseInt(data[i].tot_attempts);
                made = parseInt(distancesMap.get(data[i].distance).made) + parseInt(data[i].tot_made);
                count = parseInt(distancesMap.get(data[i].distance).count) + 1;
                distancesMap.set(data[i].distance, {attempts: attempts, made: made, count: count});
                if (count < 5) {
                    last5.set(data[i].distance, {attempts: attempts, made: made});
                }
            } else {
                attempts = parseInt(data[i].tot_attempts);
                made = parseInt(data[i].tot_made);
                distancesMap.set(data[i].distance, {attempts: attempts, made: made, count: 0});
                last5.set(data[i].distance, {attempts: attempts, made: made});
            }
            // if (i < 5) {
            //     setsHtml += "<tr><td>" + data[i].distance + "</td><td>" + attempts + "</td><td>" + made + "</td><td>" + (made/attempts).toFixed(2) + "</td></tr>";
            // }
        }
        let totalHtml = "";
        var mapAsc = new Map([...distancesMap.entries()].sort());
        for (let [key, value] of  mapAsc.entries()) {
        	console.log(key + " = " + value);
        	totalHtml += "<tr><td>" + key + "</td><td>" + value.made + "</td><td>" + value.attempts + "</td><td>" + (value.made/value.attempts).toFixed(2) + "</td></tr>";
        }
        var mapAsc1 = new Map([...last5.entries()].sort());
        for (let [key, value] of  mapAsc1.entries()) {
        	setsHtml += "<tr><td>" + key + "</td><td>" + value.made + "</td><td>" + value.attempts + "</td><td>" + (value.made/value.attempts).toFixed(2) + "</td></tr>";
        }
        document.getElementById("data_table").innerHTML += totalHtml;
        document.getElementById("data_table2").innerHTML += setsHtml;
    }
    await loadData();
    
}