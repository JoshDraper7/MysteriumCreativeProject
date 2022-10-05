const SUPABASE_URL = 'https://pljtblzlnmgdlqohcjfv.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsanRibHpsbm1nZGxxb2hjamZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ5ODYxODUsImV4cCI6MTk4MDU2MjE4NX0.GgUAEWmWNr6d2SOBg0wyzKg_yCJwtMJ6YMTAZ8Rrrug'
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
window.onload = function() {
    async function loadData() {
        const { data, error } = await _supabase
                .from('Player')
                .select('img_url, player_type');
            //     .insert([
            //     { img_url: 'THis is a freaking test', player_type: 'blue'}
            // ])
    
        console.log(data)
        console.log(error)
        let html = "";
        for (let i = 0; i < data.length; i++) {
            if (data[i].player_type === "red") {
                html += '<img style="width: 300px; height: auto;" src=' + data[i].img_url + '" />';
            }
        }
        document.getElementById("card_images").innerHTML = html;
    }
    loadData();
    
    document.getElementById("clear-button").addEventListener("click", async function(event) {
        const { data, error } = await _supabase
          .from('Player')
          .delete()
          .match({ player_type: "red" });
        
        console.log(data);  
        location.reload();
        return false;
                
    })
}