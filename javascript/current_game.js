

window.onload = async function() {
    //DATABASE FUNCTIONALITY
    // FUNCTIONS FOR GETTING AND INSERTING INTO DATABASE 
    const SUPABASE_URL = 'https://cacavrzzzevgkadmvfgl.supabase.co'
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhY2F2cnp6emV2Z2thZG12ZmdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg2MzQ5MDYsImV4cCI6MTk4NDIxMDkwNn0.qcLdgZTEXypmeRVQRXd8n_zOPVrZcqK7cAY-VU3Uqv4'
    const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    async function sendData(distance, attempts, made) {
        console.log(attempts + " " + made);
        if (attempts === "" || made === "") {
            
            return -1;
        }
        let percentage = made / attempts;
        const { data, error } = await _supabase
                .from('Input')
                .insert([
                {distance: distance, attempts: attempts, made: made, percentage: percentage}
            ])
    
        console.log(data)
        console.log(error)
    }
    async function sendSet(attempts, made, distance) {
        if (attempts === 0 || made === 0) {
            return -1;
        }
        let percentage = made / attempts;
        const { data, error } = await _supabase
                .from('Set')
                .insert([
                {distance: distance, tot_attempts: attempts, tot_made: made, tot_percentage: percentage}
            ])

        console.log(data)
        console.log(error)
    }

    const distancesMap = new Map();
    let set_attempts = 0;
    let set_made = 0;
    let tot_distance = 0;
    let number_in_set = 0;
    
    document.getElementById("submit_putts").addEventListener("click", async function(event) {
        let temp_set_attempts = set_attempts;
        let temp_set_made = set_made;
        let temp_num_in_set = number_in_set;
        let temp_tot_distance = tot_distance;
        let distance = document.getElementById("select_feet").value;
        let attempts = document.getElementById("num_putts").value;
        let made = document.getElementById('putts_made').value;
        let percentage = 0;
        percentage = made/attempts;
        console.log(distance + " " + attempts + " " + made);
        document.getElementById("num_putts").value = null;
        document.getElementById('putts_made').value = null;
        let test = await sendData(distance, attempts, made);
        if (parseInt(test) === -1) {
            let set_attempts = temp_set_attempts;
            let set_made = temp_set_attempts;
            let tot_distance = tot_distance;
            let number_in_set = temp_num_in_set;
            return;
        }
        set_attempts += parseInt(attempts);
        set_made += parseInt(made);
        if (distancesMap.has(distance)) {
            distancesMap.set(distance, {attempts: parseInt(distancesMap.get(distance).attempts) + parseInt(attempts), made:  parseInt(distancesMap.get(distance).made) + parseInt(made)});
        } else {
            distancesMap.set(distance, {attempts: attempts, made: made});
        }
        tot_distance += parseInt(distance);
        number_in_set += 1;
        var table = document.getElementById("data_table");
        let innerHtml = "<tr><td>" + distance + "</td><td>" + made + "</td><td>" + attempts + "</td><td>" + percentage.toFixed(2) + "</td></tr>";
        table.innerHTML += innerHtml;
        
        var tot_table = document.getElementById("total_table");
        innerHtml = "<tr><th>Distance</th><th>Total Made</th><th>Total Attempted</th><th>Total Percentage</th></tr>";
        var mapAsc = new Map([...distancesMap.entries()].sort());
        for (let [key, value] of  mapAsc.entries()) {
        	console.log(key + " = " + value);
        	innerHtml += "<tr><td>" + key + "</td><td>" + value.made + "</td><td>" + value.attempts + "</td><td>" + (value.made/value.attempts).toFixed(2) + "</td></tr>";
        }
        tot_table.innerHTML = innerHtml;
    })
    
    document.getElementById("submit_set").addEventListener("click", async function(event) {
        console.log(set_attempts + " " + set_made)
        for (let [key, value] of  distancesMap.entries()) {
        	sendSet(value.attempts, value.made, key);
        }
        distancesMap.clear();
        document.getElementById("data_table").innerHTML = "<tr><th>Distance</th><th>Number Made</th><th>Number Attempted</th><th>Percentage</th></tr>";
        document.getElementById("total_table").innerHTML = "<tr><th>Avg Distance</th><th>Total Made</th><th>Total Attempted</th><th>Total Percentage</th></tr>";
        
    })
    
}

